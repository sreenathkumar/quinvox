'use server';

import { headers } from 'next/headers';
import { auth, User } from './auth';
import prisma from './prisma';

const defaultState = {
    authenticated: false,
    user: undefined,
    isPro: false
}

async function isServerAuthenticated() {
    try {
        //confirm user is authenticated
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        const sessionUser: User | undefined = session?.user;

        if (!sessionUser) {
            return defaultState
        }

        const user = await prisma.user.findUnique({
            where: { id: sessionUser.id },
            include: {
                subscriptions: {
                    where: {
                        status: { in: ['paid', 'active', 'past_due', 'trialing'] }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });

        if (!user) {
            return defaultState;
        }

        const userSubscription = user.subscriptions?.[0];
        const isPro = userSubscription

        return {
            authenticated: true,
            user,
            isPro
        }
    } catch (error: any) {
        console.error("Error checking authentication:", error?.message);
        return defaultState
    }
}

export default isServerAuthenticated;
