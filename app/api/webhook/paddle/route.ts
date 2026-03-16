import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import prisma from "@/lib/prisma";
import { eventHandlers } from "@/lib/paddle/event-handlers";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    try {
        // 1. Get Paddle-Signature header
        const headers = request.headers;
        const paddleSignature = headers.get("paddle-signature");
        const secretKey = process.env.PADDLE_WEBHOOK_SECRET_KEY;

        // (Optional) Check if header and secret key are present and return error if not
        if (!paddleSignature) {
            console.error("Paddle-Signature not present in request headers");
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        if (!secretKey) {
            console.error("Secret key not defined");
            return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
        }

        // 2. Extract timestamp and signature from header
        if (!paddleSignature.includes(";")) {
            console.error("Invalid Paddle-Signature format");
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const parts = paddleSignature.split(";");

        if (parts.length !== 2) {
            console.error("Invalid Paddle-Signature format");
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const [timestampPart, signaturePart] = parts.map(part => part.split("=")[1]);

        if (!timestampPart || !signaturePart) {
            console.error("Unable to extract timestamp or signature from Paddle-Signature header");
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const timestamp = timestampPart;
        const signature = signaturePart;

        //Check timestamp against current time and reject if it's over 5 seconds old
        const timestampInt = parseInt(timestamp) * 1000; // Convert seconds to milliseconds

        if (isNaN(timestampInt)) {
            console.error("Invalid timestamp format");
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const currentTime = Date.now();

        if (currentTime - timestampInt > 5000) {
            console.error("Webhook event expired (timestamp is over 5 seconds old):", timestampInt, currentTime);
            return NextResponse.json({ message: "Event expired" }, { status: 408 });
        }

        // 3. Build signed payload
        const bodyRaw = await request.text();
        const signedPayload = `${timestamp}:${bodyRaw}`;

        // 4. Hash signed payload using HMAC SHA256 and the secret key
        const hashedPayload = createHmac("sha256", secretKey)
            .update(signedPayload, "utf8")
            .digest("hex");

        // 5. Compare signatures
        if (!timingSafeEqual(Buffer.from(hashedPayload), Buffer.from(signature))) {
            console.error("Computed signature does not match Paddle signature");
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }

        // 6. Process the webhook event
        const bodyJson = JSON.parse(bodyRaw);
        const eventType = bodyJson.event_type;
        const eventId = bodyJson.event_id;
        const occurredAt = bodyJson.occurred_at;

        // check if the event has already been processed
        const isProcessed = await prisma.webhookEvent.findUnique({
            where: {
                eventId,
                eventType,
                occurredAt
            }
        });

        if (isProcessed) {
            console.warn(`Event ${eventId} of type ${eventType} at ${occurredAt} has already been processed`);
            return NextResponse.json({ message: "Event already processed" }, { status: 200 });
        }

        // call the appropriate handler based on event type
        const handler = eventHandlers[eventType];

        if (handler) {
            await handler(bodyJson);

            // mark the event as processed
            await prisma.webhookEvent.create({
                data: {
                    eventId,
                    eventType,
                    occurredAt
                }
            })
        }

        revalidatePath('/pricing');

        return NextResponse.json({ message: "Webhook verified and processed successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error in processing the webhook: ", error?.message);
        return NextResponse.json({ message: "Failed to verify and process Paddle webhook" }, { status: 500 });
    }
}