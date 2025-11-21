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
            } catch (error) {
                console.error('Error creating invoice:', error);
                return { success: false, message: 'Failed to create invoice' };
            }


        case 'update':
            // Logic to update the record in the database
            return { success: true, message: 'Invoice updated successfully' };
        case 'delete':
            // Logic to delete the record from the database
            console.log('Deleting record with ID:', task.payload.id);
            return { success: true, message: `Invoice(#${task.payload.id}) deleted successfully` };
        default:
            return { success: false, message: 'Unknown task type' };
    }
}

export default syncDatabase;