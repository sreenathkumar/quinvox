'use server';

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

async function getInvoices() {
    try {
        //get the logging in user
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        const user = session?.user;

        if (!user) {
            throw new Error("User not authenticated");
        }
        const response = await prisma.invoice.findMany({
            where: { userId: user.id }
        });

        if (!response) {
            throw new Error("No invoices found");
        }

        return response;
    } catch (error: any) {
        console.error("Error fetching invoices:", error?.message);
        return [];
    }
}

export default getInvoices;