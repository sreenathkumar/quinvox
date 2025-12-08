'use server';

import { headers } from 'next/headers';
import { auth } from './auth';
async function isServerAuthenticated() {
    try {
        //confirm user is authenticated
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        const user = session?.user;

        if (!user) {
            return {
                authenticated: false,
                user: null
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
            user: null
        };
    }

}

export default isServerAuthenticated;
