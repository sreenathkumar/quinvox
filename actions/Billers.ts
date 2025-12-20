'use server'

import isServerAuthenticated from "@/lib/check-server-auth";
import { BillerData } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//function to get billers
//if no billerId is passed, return all billers
export async function getBillers(billerId?: string) {
    try {
        //check if authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated) {
            throw new Error("Not authenticated");
        }

        if (billerId) {
            //fetch single biller from database
            const res = await prisma.biller.findUnique({
                where: { id: billerId, userId: user?.id }
            });
            if (res) {
                return {
                    success: true,
                    data: [res],
                    message: "Biller(s) fetched successfully"
                }
            } else {
                throw new Error("No biller found with the given ID: " + billerId);
            }
        } else {
            //fetch all billers from database
            const res = await prisma.biller.findMany({
                where: { userId: user?.id }
            });

            if (res.length > 0) {
                return {
                    success: true,
                    data: res,
                    message: "Biller(s) fetched successfully"
                }
            } else {
                throw new Error("No billers found");
            }
        }
    }
    catch (error: any) {
        console.log("Error fetching billers: ", error.message);
        return {
            success: false,
            data: [],
            message: error.message
        }
    }
}

//function to add a biller
export async function addBiller(data: BillerData) {
    try {
        //check if authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        //check if biller already exists
        const existingClient = await prisma.biller.findFirst({
            where: {
                name: data.name,
                email: data.email,
                userId: user.id,
            }
        });

        //if no, save the biller data
        if (existingClient) {
            throw new Error("Biller with the same name and email already exists");
        }

        const res = await prisma.biller.create({
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

        if (!res) {
            throw new Error("Failed to add biller");
        }

        return {
            success: true,
            message: "Biller added successfully",
            data: res
        }

    } catch (error: any) {
        console.error("Error in addBiller:", error.message);
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}

//function to update a biller
export async function updateBiller(billerId: string, data: BillerData) {
    try {
        //check if authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        //update the biller data
        const res = await prisma.biller.updateMany({
            where: {
                id: billerId,
                userId: user.id,
            },
            data: {
                name: data.name,
                email: data.email,
                address: data.address,
                country: data.country,
                phone: data.phone,
                type: data.type,
            }
        });

        if (res.count === 0) {
            throw new Error("No biller found to update");
        }

        //revalidate the path to reflect changes
        revalidatePath('/dashboard/account');

        return {
            success: true,
            message: "Biller updated successfully",
            data: res
        }

    } catch (error: any) {
        console.error("Error in updateBiller:", error.message);
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}

//function to delete a biller
export async function deleteBiller(billerId: string) {
    try {
        //check if authenticated
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error("User not authenticated");
        }

        //delete the biller
        const res = await prisma.biller.deleteMany({
            where: {
                id: billerId,
                userId: user.id,
            }
        });

        if (res.count === 0) {
            throw new Error("No biller found to delete");
        }

        //revalidate the path to reflect changes
        revalidatePath('/dashboard/account');

        return {
            success: true,
            message: "Biller deleted successfully",
            data: res
        }

    } catch (error: any) {
        console.error("Error in deleteBiller:", error.message);
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}

export async function searchBillers(query: string) {

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

        //search billers from the database
        const result = await prisma.biller.findMany({
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
                message: "No billers found",
                data: []
            }
        }

        return {
            success: true,
            message: "Billers fetched successfully",
            data: result
        }

    } catch (error: any) {
        console.error("Error in searchBillers:", error.message);
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}