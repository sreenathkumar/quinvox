'use server'

import { User } from "@/lib/auth";
import isServerAuthenticated from "@/lib/check-server-auth"
import prisma from "@/lib/prisma";
import { addDays, addMonths, addYears } from "date-fns";
import { saveUserQuery } from "./userQuery";

export async function subscribeToPlan({ name, playType }: { name: string, playType: 'monthly' | 'annual' }) {
    // check the user is logged in
    const { authenticated, user } = await isServerAuthenticated();

    if (!authenticated || !user) {
        throw new Error('User not authenticated');
    }

    try {
        //check which plan user is currently on
        const currentPlan = user.plan || 'free';

        //if user is already on the selected plan, do nothing
        if (currentPlan === name) {
            return {
                success: true,
                message: 'Already on the selected plan',
                data: null
            }
        }

        if (name === 'free') {
            console.log('free plan selected');
            const res = await subscribeToFree(user.id);

            if (res) {
                return {
                    success: true,
                    message: 'Successfully subscribe to free plan',
                }
            }
        }

        if (name === 'pro') {
            //check if the user is claimed trial before
            if (!user.trialUsed) {
                console.log('trial plan selected');
                const res = await subscribeToTrial({ user });

                if (res) {
                    return {
                        success: true,
                        message: 'Successfully subscribed to trial plan',
                    }
                }
            } else {
                console.log('pro plan selected');

                // const res = await subscribeToPro({ user, planType: playType });
                const res = await saveUserQuery({
                    name: user.name || 'Unknown',
                    email: user.email || 'Unknown',
                    message: `User requested to subscribe to pro plan with ${playType} payment.`,
                    subject: 'Pro Plan Subscription Request',
                })

                if (res) {
                    return {
                        success: true,
                        message: 'Admin wil contact you for pro plan subscription',
                    }
                    // return {
                    //     success: true,
                    //     message: 'Successfully subscribed to pro plan',
                    // }
                }
            }
        }

    } catch (error: any) {
        console.log('Error in subscribeToPlan: ', error.message);

        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}

//function to downgrade user to free plan
async function subscribeToFree(userId: string) {
    const res = await prisma.user.update({
        where: { id: userId },
        data: {
            plan: 'free',
            planExpires: null,
        }
    });

    return res;
}

//function to start trial for user
async function subscribeToTrial({ user }: { user: User }) {
    const planExpires = addDays(new Date(), 14); //14 days trial

    const res = await prisma.user.update({
        where: { id: user.id },
        data: {
            plan: 'trial',
            planExpires,
            trialUsed: true,
        }
    });

    return res;
}

//function to upgrade user to pro plan
async function subscribeToPro({ user, planType }: { user: User, planType: 'monthly' | 'annual' }) {
    // add the not used trial/unused period to the new plan expiry date
    const startDate = user.planExpires >= new Date() ? user.planExpires : new Date();
    let planExpires: Date;

    if (planType === 'annual') {
        planExpires = addYears(startDate, 1);

        const res = await prisma.user.update({
            where: { id: user.id },
            data: {
                plan: 'pro',
                planExpires,
                trialUsed: true,
            }
        })

        return res;
    } else {
        //monthly plan
        planExpires = addMonths(startDate, 1);
        const res = await prisma.user.update({
            where: { id: user.id },
            data: {
                plan: 'pro',
                planExpires,
                trialUsed: true,
            }
        });
        return res;
    }
}