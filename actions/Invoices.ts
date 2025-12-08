'use server';

import isServerAuthenticated from "@/lib/check-server-auth";
import prisma from "@/lib/prisma";

async function getInvoices() {
    try {
        const { authenticated, user } = await isServerAuthenticated()

        if (!authenticated || !user) {
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

async function deleteInvoices(invoiceNumbers: string[]) {
    try {
        //confirm user is authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        const response = await prisma.invoice.deleteMany({
            where: { invoiceNumber: { in: invoiceNumbers }, userId: user.id }
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

export { getInvoices, deleteInvoices };
