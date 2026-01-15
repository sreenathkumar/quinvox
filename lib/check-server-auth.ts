'use server';

import { headers } from 'next/headers';
import { auth, User } from './auth';
async function isServerAuthenticated() {
    try {
        //confirm user is authenticated
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        const user: User | undefined = session?.user;

        if (!user) {
            return {
                authenticated: false,
                user
            }
        }

        //check user plan
        if (user.plan === 'pro' || user.plan === 'trial') {
            //verify if the pro/trial subscription is still valid
            const currentDate = new Date();
            const isValid = user.planExpires && new Date(user.planExpires) > currentDate;

            if (isValid) {
                return {
                    authenticated: true,
                    user,
                    isPro: true
                }
            }
        }

        return {
            authenticated: true,
            user,
            isPro: false
        };
    } catch (error: any) {
        console.error("Error checking authentication:", error?.message);
        return {
            authenticated: false,
            user: undefined
        };
    }

}

export default isServerAuthenticated;
