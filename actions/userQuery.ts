'use server'

import { ContactFormData } from "@/lib/definitions"
import prisma from "@/lib/prisma"
import SuperJSON from 'superjson'

async function saveUserQuery(formData: ContactFormData) {
    try {
        const result = await prisma.userQuery.create({
            data: formData as any,
        })
        return {
            success: true,
            data: result,
        }
    } catch (error: any) {
        console.error("Error saving user query:", error?.message)
        return ({
            success: false,
            error: error?.message || "Unknown error occurred",
        })
    }
}

async function getUserQueries() {
    try {
        const queries = await prisma.userQuery.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!queries) {
            return {
                success: false,
                error: 'No queries found',
            }
        }

        const data = SuperJSON.serialize(queries)

        return {
            success: true,
            data,
            length: queries.length
        }
    } catch (error: any) {
        console.error("Error fetching user queries:", error?.message)
        return ({
            success: false,
            error: error?.message || "Unknown error occurred",
        })
    }
}

async function updateUserQueryStatus(id: string, status: 'pending' | 'handled') {
    try {
        const updatedQuery = await prisma.userQuery.update({
            where: { id },
            data: { status },
        });

        if (!updatedQuery) {
            return {
                success: false,
                error: 'Failed to update query status',
            }
        }

        return {
            success: true,
            message: 'Query status updated successfully',
        }
    } catch (error: any) {
        console.error("Error updating user query status:", error?.message)
        return ({
            success: false,
            error: error?.message || "Unknown error occurred",
        })
    }
}

export { saveUserQuery, getUserQueries, updateUserQueryStatus };