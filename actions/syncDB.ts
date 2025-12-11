'use server';

import isServerAuthenticated from "@/lib/check-server-auth";
import prisma from "@/lib/prisma";
import { addInvoice, deleteInvoices } from "./Invoices";

async function syncDatabase(task: { id: string, type: string, payload: any }) {
    const { authenticated } = await isServerAuthenticated();

    if (!authenticated) {
        return { success: false, message: "User not authenticated", code: 'AUTH_ERROR' };
    }

    switch (task.type) {
        case 'create':
            const addRes = await addInvoice(task.payload);
            return addRes;

        case 'update':
            try {
                // Logic to update the record in the database
                const result = await prisma.invoice.update({
                    where: { invoiceNumber: task.payload?.invoiceNumber },
                    data: task.payload,
                });

                if (!result) {
                    throw new Error('Invoice update failed');
                }

                return { success: true, message: 'Invoice updated successfully' };

            } catch (error: any) {
                console.error('Error updating invoice:', error);
                return { success: false, message: error?.message || 'Invoice update failed', code: 'UNKNOW_ERROR' };
            }

        case 'delete':
            const delRes = await deleteInvoices([task.payload.invoiceNumber]);

            return delRes;
        default:
            return { success: false, message: 'Unknown task type', code: 'UNKNOWN_TASK' };
    }
}

export default syncDatabase;