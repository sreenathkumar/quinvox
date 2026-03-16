import { SubscriptionScheduledChange, SubscriptionTimePeriod, TimePeriod } from "@paddle/paddle-node-sdk";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";


type WebhookHandler = (data: any) => Promise<void>;

const billingCycleJson = (value: any): Prisma.InputJsonValue | null => {
    if (!value) return null;

    return {
        interval: value.interval,
        frequency: value.frequency,
    } as Prisma.JsonObject;
}

const scheduledChangeJson = (value: SubscriptionScheduledChange | null): Prisma.InputJsonValue | null => {
    if (!value) return null;

    return {
        action: value.action,
        effectiveAt: value.effectiveAt,
        resumeAt: value.resumeAt,
    } as Prisma.JsonObject;
}

const billingPeriodJson = (value: SubscriptionTimePeriod | null): Prisma.InputJsonValue | null => {
    if (!value) return null;

    return {
        startsAt: value.startsAt,
        endsAt: value.endsAt,
    } as Prisma.JsonObject;
}

// Helper to avoid repeating fields
function subscriptionFields(event: any) {
    return {
        subsId: event.data.id,
        status: event.data.status,
        pausedAt: event.data.paused_at,
        canceledAt: event.data.canceled_at,
        customerId: event.data.customer_id,
        billingCycle: billingCycleJson(event.data.billing_cycle),
        currencyCode: event.data.currency_code,
        nextBilledAt: event.data.next_billed_at,
        txnId: event.data.transaction_id,
        collectionMode: event.data.collection_mode,
        billingPeriod: billingPeriodJson(event.data.current_billing_period),
        scheduledChange: scheduledChangeJson(event.data.scheduled_change),
        userId: event?.data?.custom_data?.app_user_id || null,
        occurredAt: event.occurred_at,
    }
}


export const eventHandlers: Record<string, WebhookHandler> = {

    'transaction.paid': async (event) => {
        const existing = await prisma.subscription.findFirst({
            where: { txnId: event.data.id }
        });
        if (existing) return;

        await prisma.subscription.create({
            data: {
                txnId: event.data.id,
                customerId: event.data.customer_id,
                userId: event?.data?.custom_data?.app_user_id || null,
                status: event.data.status,
                occurredAt: event.occurred_at
            }
        });
    },


    'subscription.created': async (event) => {
        const missedOrder = await isOldEvent(event);
        if (missedOrder) return;

        await prisma.subscription.upsert({
            where: { txnId: event.data.transaction_id },
            update: { ...subscriptionFields(event) },
            create: { ...subscriptionFields(event) }
        });

        await prisma.user.update({
            where: { id: event?.data?.custom_data?.app_user_id || '' },
            data: {
                plan: 'pro',
                status: event.data.status,       // "trialing" or "active"
                currentSubscription: event.data.id,
                customerId: event.data.customer_id,
                trialUsed: true,
            }
        });
    },


    'subscription.updated': async (event) => {
        console.log('Handling subscription.updated for subsId:', event);
        const missedOrder = await isOldEvent(event);
        if (missedOrder) return;

        await prisma.subscription.update({
            where: { subsId: event.data.id },
            data: { ...subscriptionFields(event) }
        });

        const isExpired = event.data.status === 'canceled' &&
            new Date(event.data.current_billing_period?.ends_at) < new Date();

        await prisma.user.update({
            where: { id: event?.data?.custom_data?.app_user_id || '' },
            data: {
                status: event.data.status,
                plan: isExpired ? 'free' : 'pro',
                currentSubscription: event.data.id,
            }
        });
    },


    'transaction.payment_failed': async (event) => {
        console.log('payment failed for transaction:', event.data.id);
        await prisma.user.update({
            where: { id: event?.data?.custom_data?.app_user_id || '' },
            data: { status: 'past_due' }
        });
    },


    'subscription.canceled': async (event) => {
        console.log('canceled: ', event)
        const missedOrder = await isOldEvent(event);
        if (missedOrder) return;

        await prisma.subscription.update({
            where: { subsId: event.data.id },
            data: { ...subscriptionFields(event) }
        });

        await prisma.user.update({
            where: { id: event?.data?.custom_data?.app_user_id || '' },
            data: {
                status: 'none',
                plan: 'free',
                currentSubscription: null,
            }
        });
    },


    'subscription.paused': async (event) => {
        console.log('paused: ', event)
        const missedOrder = await isOldEvent(event);
        if (missedOrder) return;

        await prisma.subscription.update({
            where: { subsId: event.data.id },
            data: { ...subscriptionFields(event) }
        });

        await prisma.user.update({
            where: { id: event?.data?.custom_data?.app_user_id || '' },
            data: {
                status: 'paused',
                plan: 'pro',
            }
        });
    },


    'subscription.resumed': async (event) => {
        console.log('resumed: ', event)
        const missedOrder = await isOldEvent(event);
        if (missedOrder) return;

        await prisma.subscription.update({
            where: { subsId: event.data.id },
            data: { ...subscriptionFields(event) }
        });

        await prisma.user.update({
            where: { id: event?.data?.custom_data?.app_user_id || '' },
            data: {
                status: 'active',
                plan: 'pro',
            }
        });
    },


    'transaction.completed': async (event) => {
        console.log('all done for transaction.completed');
        await prisma.user.update({
            where: { id: event?.data?.custom_data?.app_user_id || '' },
            data: {
                status: 'active',
                plan: 'pro',
            }
        });
    },
}



//Check if the incoming event break the webhook sequence.
async function isOldEvent(event: any): Promise<boolean> {
    const existingSubscription = await prisma.subscription.findFirst({
        where: {
            OR: [
                { txnId: event.data.transaction_id ?? event.data.id },
                { subsId: event.data.id },
            ]
        },
        select: { occurredAt: true }
    });

    if (!existingSubscription) return false; // New event, process it

    const incomingTime = new Date(event.occurred_at).getTime();
    const existingTime = existingSubscription.occurredAt.getTime();

    return existingTime >= incomingTime; // True = old/duplicate, skip it
}