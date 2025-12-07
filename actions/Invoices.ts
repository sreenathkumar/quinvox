'use server';

import { auth, isServerAuthenticated } from "@/lib/auth";
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

async function deteleInvoices(invoiceNumbers: string[]) {
    try {
        //confirm user is authenticated
        const isAuthenticated = await isServerAuthenticated();

        if (!isAuthenticated) {
            throw new Error("User not authenticated");
        }

        const response = await prisma.invoice.deleteMany({
            where: { invoiceNumber: { in: invoiceNumbers } }
        });

        if (!response.count || response.count === 0) {
            throw new Error("Failed to delete invoices");
        }

        return {
            success: true,
            deletedCount: response.count,
            message: `${response.count} invoices deleted successfully`
        }


    } catch (error: any) {
        console.error("Error deleting invoices:", error?.message);
        return {
            success: false,
            deletedCount: 0,
            message: "Error deleting invoices: " + error?.message
        };
    }
}

export { getInvoices };