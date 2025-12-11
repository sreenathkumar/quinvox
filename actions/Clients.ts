'use server'

import isServerAuthenticated from "@/lib/check-server-auth";
import { ClientData } from "@/lib/definitions";
import prisma from "@/lib/prisma";

export async function getClients() {
    try {
        //check if authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        //fetch clients from the database
        const result = await prisma.client.findMany({
            where: { userId: user.id }
        })
    } catch (error: any) {
        console.error("Error in getClients:", error.message);
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}

export async function searchClients(query: string) {
    if (!query || query.trim() === '') {
        return {
            success: true,
            message: "No query provided",
            data: []
        }
    }

    try {
        //check if authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        //search clients from the database
        const result = await prisma.client.findMany({
            where: {
                userId: user.id,
                OR: [
                    { name: { contains: query.trim(), mode: 'insensitive' } },
                    { email: { contains: query.trim(), mode: 'insensitive' } },
                ]
            }
        });

        if (!result) {
            return {
                success: true,
                message: "No clients found",
                data: []
            }
        }

        return {
            success: true,
            message: "Clients fetched successfully",
            data: result
        }

    } catch (error: any) {
        console.error("Error in searchClients:", error.message);
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}

export async function addClient(data: ClientData) {
    try {
        //check if authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        //add client to the database
        const result = await prisma.client.create({
            data: {
                userId: user.id,
                name: data.name,
                email: data.email,
                address: data.address,
                country: data.country,
                phone: data.phone,
                type: data.type,
            }
        });

        if (!result) {
            throw new Error("Failed to add client");
        }

        return {
            success: true,
            message: "Client added successfully",
            data: result
        }
    } catch (error: any) {
        console.error("Error in addClient:", error.message);
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}