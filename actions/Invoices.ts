'use server';

import isServerAuthenticated from "@/lib/check-server-auth";
import { InvoiceData, ServerResponse } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { addClient } from "./Clients";

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

async function addInvoice(data: InvoiceData): Promise<ServerResponse> {
    try {
        //check user is authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }
        //check need to save client
        const { saveClient, ...cleanData } = data;

        //prepare invoice data
        const invoiceData = {
            ...cleanData,
            userId: user.id,
        };

        //save the invoice data
        const newInvoice = await prisma.invoice.create({
            data: invoiceData
        });

        if (!newInvoice) {
            throw new Error("Failed to add invoice");
        }

        if (saveClient) {
            //extract client data
            const clientData = {
                userId: user.id,
                name: data.clientName,
                email: data.clientEmail,
                address: data.clientAddress,
                country: data.clientCountry || undefined,
                phone: data.billerPhone || undefined,
                type: data.clientType,
            }

            //add client data
            const res = await addClient(clientData);

            //invoice is saved but client save failed
            if (!res?.success) {
                return {
                    success: true,
                    data: newInvoice,
                    message: "Invoice added successfully, but failed to save client"
                }
            }

            //invoice and client are both saved
            return {
                success: true,
                data: newInvoice,
                message: "Invoice and client saved successfully"
            }
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

async function deleteInvoices(invoiceNumbers: string[]): Promise<ServerResponse> {
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

export { getInvoices, deleteInvoices, addInvoice };
