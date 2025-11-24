'use server';

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

async function syncDatabase(task: { id: string, type: string, payload: any }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    if (!user) {
        return { success: false, message: 'User not authenticated' };
    }

    switch (task.type) {
        case 'create':
            // Logic to create the record in the database
            try {
                const result = await prisma.invoice.create({
                    data: { ...task.payload, userId: user.id },
                });

                if (result) {
                    return { success: true, message: `Invoice(#${result.id}) created successfully` };
                } else {
                    throw new Error('Invoice creation failed');
                }
            } catch (error: any) {
                console.error('Error creating invoice:', error);
                return { success: false, message: error?.message || 'Invoice creation failed' };
            }

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
                return { success: false, message: error?.message || 'Invoice update failed' };
            }

        case 'delete':
            try {
                // Logic to delete the record from the database
                const result = await prisma.invoice.delete({
                    where: { invoiceNumber: task.payload?.invoiceNumber },
                });

                if (!result) {
                    throw new Error('Invoice deletion failed');
                }

                return { success: true, message: `Invoice(#${task.payload?.invoiceNumber}) deleted successfully` };
            } catch (error: any) {
                console.error('Error deleting invoice:', error);
                return { success: false, message: error?.message || 'Invoice deletion failed' };
            }
        default:
            return { success: false, message: 'Unknown task type' };
    }
}

export default syncDatabase;