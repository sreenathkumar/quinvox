import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createAuthMiddleware } from "better-auth/api";
import prisma from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: 'mongodb' }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        },
        linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID || '',
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
        }
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === '/error') {
                const query = ctx.query;
                throw ctx.redirect('/error' + (query ? `?error=${query.error}&error_description=${query.error_description}` : ''));
            }
        })
    },
    user: {
        additionalFields: {
            role: { type: 'string', defaultValue: 'user', input: false },
            plan: { type: 'string', defaultValue: 'free', input: false },
            planExpires: { type: 'date', defaultValue: null, input: false },
            trialUsed: { type: 'boolean', defaultValue: false, input: false },
        },
    }
});

export type User = typeof auth.$Infer.Session.user;