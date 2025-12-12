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

        return {
            authenticated: true,
            user
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
