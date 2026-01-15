import { User } from "./auth";

export function getUserPlan(user: User | undefined) {
    if (!user) {
        return {
            plan: 'free',
            status: 'inactive',
        }
    }

    if (user.plan === 'pro' || user.plan === 'trial') {
        //check if trial/plan expired
        const currentDate = new Date();

        if (user.planExpires && currentDate > user?.planExpires) {
            return {
                plan: user.plan,
                status: 'expired',
                trialUsed: user.trialUsed,
            }
        } else {
            return {
                plan: user.plan,
                status: 'active',
                trialUsed: user.trialUsed,
            }
        }
    } else {
        return {
            plan: 'free',
            status: 'active',
            trialUsed: user.trialUsed,
        }
    }
}