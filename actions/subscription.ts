'use server'

import { User } from "@/lib/auth";
import isServerAuthenticated from "@/lib/check-server-auth";
import paddleServer from "@/lib/paddle/paddle-backend";
import prisma from "@/lib/prisma";
import { SubscriptionCollection } from "@paddle/paddle-node-sdk";
import { addDays } from "date-fns";
import { saveUserQuery } from "./userQuery";
import { revalidatePath } from "next/cache";

export async function getSubscriptions() {
    try {
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            return {
                success: false,
                error: "User is not authenticated",
            }
        }

        const subscriptions = await prisma.subscription.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            success: true,
            data: subscriptions || [],
        }
    } catch (error: any) {
        console.error("Error fetching subscriptions: ", error?.message)
        return {
            success: false,
            error: error?.message || "Unknown error occurred",
        }
    }
}

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
            const res = await subscribeToFree();

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
export async function subscribeToFree() {
    try {
        const { authenticated, user } = await isServerAuthenticated();

        if (!authenticated || !user) {
            return {
                success: false,
                error: "User is not authenticated",
            }
        }

        const activeSubscription = user.subscriptions.find(sub => sub.status === 'active' || sub.status === 'trialing');

        //if no active subscription, just update the user plan to free
        if (!activeSubscription) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    plan: 'free',
                    status: 'active',
                    currentSubscription: null,
                    planExpires: null,
                }
            });

            return {
                success: true,
                message: 'Successfully subscribed to free plan',
            }
        } else {
            //check if active subscription is same as the current subscription in user table, 
            const isCurrentSub = user.currentSubscription === activeSubscription.id;

            if (isCurrentSub && user.currentSubscription) {
                //update the subscription 
                const res = await paddleServer.subscriptions.cancel(user.currentSubscription, {
                    effectiveFrom: 'next_billing_period'
                })

                if (!res) {
                    throw new Error('Failed to subscribe to free plan');
                }

                return {
                    success: true,
                    message: 'Successfully subscribed to free plan',
                };
            } else {
                throw new Error('Active subscription not found for the user, please contact support for assistance');
            }
        }


    } catch (error: any) {
        console.log('Error in subscribeToFree: ', error.message);
        return {
            success: false,
            message: error.message,
        };
    }

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

//function return the price id based on the plan type
export async function getPriceId(userId: string, isAnnual: boolean) {
    const monthlyWithTrial = process.env.PADDLE_MONTHLY_TRIAL_PRICE_ID!;
    const annualWithTrial = process.env.PADDLE_YEARLY_TRIAL_PRICE_ID!;
    const monthlyWithoutTrial = process.env.PADDLE_MONTHLY_PRICE_ID!;
    const annualWithoutTrial = process.env.PADDLE_YEARLY_PRICE_ID!;

    if (!monthlyWithTrial || !annualWithTrial || !monthlyWithoutTrial || !annualWithoutTrial) {
        return {
            error: 'Paddle price IDs are not properly configured.'
        }
    }

    try {
        //fetch the price id from database based on the plan type
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                subscriptions: true,
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // if user has active or trialing subscription, throw error to prevent multiple subscriptions
        const activeSubscription = user.subscriptions.find(sub => sub.status === 'active' || sub.status === 'trialing');

        if (activeSubscription) {
            throw new Error('User already has an active subscription');
        }

        if (user.subscriptions.length > 0 && user.trialUsed) {
            return {
                priceId: isAnnual ? annualWithoutTrial : monthlyWithoutTrial,
            }
        }

        return {
            priceId: isAnnual ? annualWithTrial : monthlyWithTrial,
        }

    } catch (error: any) {
        return {
            error: error.message,
        }
    }

};

//function to pause subscription for user
export async function pauseSubscription(userId: string) {
    try {
        const activeSubscription = await prisma.subscription.findFirst({
            where: {
                userId,
                OR: [
                    { status: 'active' },
                    { status: 'trialing' },
                    { status: 'paid' },
                ]
            }
        });

        if (!activeSubscription || !activeSubscription.subsId) {
            throw new Error('No active subscription found to pause');
        }

        const result = await paddleServer.subscriptions.pause(activeSubscription.subsId, {
            effectiveFrom: 'next_billing_period'
        });

        if (!result) {
            throw new Error('Failed to pass the pause request to Paddle');
        }

        return {
            success: true,
            message: 'Subscription paused successfully, it will take effect from next billing period',
        }

    } catch (error: any) {
        console.log('Error in pauseSubscription: ', error.message);

        return {
            success: false,
            message: error.message,
        }
    }
}

//function to sync subscription with paddle, this function can be used in polling to get and update the latest subscription status for user
export async function syncSubscription(userId: string) {
    try {
        const lastSync = await prisma.setting.findFirst({
            where: { key: `last_paddle_sync` },
        });


        //fetch all subscriptions updated after last sync time for the user
        const subscriptionIds = await prisma.subscription.findMany({
            where: {
                userId,
                updatedAt: lastSync ? { gt: lastSync.value } : undefined,
            },
            select: {
                subsId: true,
            },
            orderBy: {
                updatedAt: 'desc',
            }
        });

        //if no subscription found, throw error
        if (!subscriptionIds || subscriptionIds.length === 0) {
            throw new Error('No subscription found to sync.');
        }

        const filteredSubsIds = subscriptionIds
            .map(s => s.subsId)
            .filter((id): id is string => typeof id === 'string');

        if (filteredSubsIds.length === 0) {
            throw new Error('No valid Paddle subscription IDs found');
        };

        console.log('Filtered Paddle subscription IDs: ', filteredSubsIds);

        const subsCollection: SubscriptionCollection = paddleServer.subscriptions.list({
            id: filteredSubsIds,
        });

        const updateTasks = [];

        for await (const sub of subsCollection) {
            updateTasks.push(
                prisma.subscription.update({
                    where: { subsId: sub.id },
                    data: {
                        status: sub.status,
                        billingCycle: sub.billingCycle ? {
                            interval: sub.billingCycle.interval,
                            frequency: sub.billingCycle.frequency,
                        } : null,
                        currencyCode: sub.currencyCode,
                        nextBilledAt: sub.nextBilledAt,
                        billingPeriod: sub.currentBillingPeriod ? {
                            startsAt: sub.currentBillingPeriod?.startsAt,
                            endsAt: sub.currentBillingPeriod?.endsAt,
                        } : null,
                        pausedAt: sub.pausedAt,
                        canceledAt: sub.canceledAt,
                        scheduledChange: sub.scheduledChange ? {
                            ...sub.scheduledChange,
                        } : null
                    }
                })
            )
        };

        if (updateTasks.length > 0) {
            await prisma.$transaction(updateTasks);
        }

        //update the last sync time
        await prisma.setting.upsert({
            where: { key: `last_paddle_sync` },
            update: { value: new Date().toISOString() },
            create: { key: `last_paddle_sync`, value: new Date().toISOString() },
        });

        revalidatePath('/dashboard/account');

        return {
            success: true,
            message: 'Subscription synced successfully',
            data: subsCollection,
        }

    } catch (error: any) {
        console.log('Error in syncSubscription: ', error.message);

        return {
            success: false,
            message: error.message,
        }
    }
}