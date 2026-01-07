'use server';

import isServerAuthenticated from "@/lib/check-server-auth";
import { InvoiceData, ServerResponse } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

//function to get all invoices for the authenticated user
export async function getInvoices() {
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


//function to add a new invoice
export async function addInvoice(data: InvoiceData): Promise<ServerResponse> {
    try {
        //check user is authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }
        //check need to save client
        const { saveClient, userId, clientId, ...rawData } = data;
        let invoiceData: Prisma.InvoiceCreateInput;

        if (saveClient) {
            invoiceData = {
                ...rawData,
                user: { connect: { id: user.id } },
                client: {
                    create: {
                        user: { connect: { id: user.id } },
                        name: data.clientName,
                        email: data.clientEmail,
                        address: data.clientAddress,
                        country: data.clientCountry || undefined,
                        phone: data.billerPhone || undefined,
                        type: data.clientType,
                    }
                }
            }
        } else {
            invoiceData = {
                ...rawData,
                client: clientId ? { connect: { id: clientId } } : undefined,
                user: { connect: { id: user.id } },
            }
        }

        //save the invoice data
        const newInvoice = await prisma.invoice.create({
            data: invoiceData
        });

        if (!newInvoice) {
            throw new Error("Failed to add invoice");
        }

        return {
            success: true,
            data: newInvoice,
            message: "Invoice added successfully"
        }

        //save the client data
    } catch (error: any) {
        console.error("Error adding invoice:", error?.message);
        return {
            success: false,
            message: "Error adding invoice: " + error?.message
        }
    }
}

//function to delete invoices
export async function deleteInvoices(invoiceNumbers: string[]): Promise<ServerResponse> {
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
            message: `${response.count} invoices deleted successfully`
        }

    } catch (error: any) {
        console.error("Error deleting invoices:", error?.message);

        if (error?.code === 'P2025') {
            return {
                success: false,
                code: 'RESOURCE_NOT_FOUND',
                message: "No invoices found to delete"
            }
        }

        return {
            success: false,
            code: 'UNKNOWN_ERROR',
            message: "Error deleting invoices: " + error?.message
        };
    }
}

//function to get recent invoices
export async function getRecentInvoices(length: number = 5): Promise<ServerResponse<InvoiceData[]>> {
    try {
        //confirm user is authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        const recentInvoices = await prisma.invoice.findMany({
            where: { userId: user.id },
            orderBy: { updatedAt: 'desc' },
            take: length
        });

        if (!recentInvoices) {
            throw new Error("No recent invoices found");
        }

        return {
            success: true,
            message: "Recent invoices fetched successfully",
            data: recentInvoices
        }
    } catch (error: any) {
        console.log("Error fetching recent invoices:", error?.message);

        return {
            success: false,
            message: "Error fetching recent invoices: " + error?.message,
            data: []
        }
    }
}
