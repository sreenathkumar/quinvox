'use client'
import { subscribeToPlan } from '@/actions/subscription';
import { Button } from '@/components/ui/button'
import { usePlan } from '@/contexts/PlanProvider';
import { toast } from '@/hooks/use-toast';
import authClient from '@/lib/auth-client';
import { getUserPlan } from '@/lib/check-plan';
import { redirect } from 'next/navigation';

function BuyPlanBtn({ name }: { name?: string }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userPlan = getUserPlan(user);
    const { isAnnual } = usePlan();

    const handleSelectPlan = async (planName: string) => {
        if (!user) {
            redirect('/login')
        } else {
            const res = await subscribeToPlan({ name: planName, playType: isAnnual ? 'annual' : 'monthly' });

            if (res?.success) {
                toast({
                    title: res.success ? 'Success' : 'Error',
                    description: res.message,
                    variant: res.success ? 'default' : 'destructive',
                })
            } else {
                toast({
                    title: 'Error',
                    description: 'Something went wrong. Please try again.',
                    variant: 'destructive',
                })
            }
        }
    }

    //generate button based on user plan
    const generateBtnText = () => {
        //Logged out state (Same as before)
        if (!user) {
            return name === 'free' ? 'Start for free' : 'Start free trial';
        }

        if (userPlan?.plan === 'pro' || userPlan?.plan === 'trial') {
            if (userPlan.plan === 'pro') {
                if (userPlan.status === 'active') {
                    return name === 'free' ? 'Downgrade' : 'Current Plan';
                } else {
                    return name === 'free' ? 'Downgrade' : 'Renew Plan';
                }
            } else {
                if (userPlan.status === 'active') {
                    return name === 'free' ? 'Downgrade' : 'Switch from Trial to Pro';
                } else {
                    return name === 'free' ? 'Downgrade' : 'Upgrade to Pro';
                }
            }
        }

        // user on free plan and trial is ended
        if (userPlan?.plan === 'free' && user.trialUsed) {
            return name === 'free' ? 'Start for free' : 'Upgrade to Pro';
        }

        return name === 'free' ? 'Start for free' : 'Start free trial';
    }

    return (
        <Button
            variant="secondary"
            className='w-full bg-accent text-foreground'
            onClick={() => handleSelectPlan(name || 'free')}
            disabled={userPlan?.plan === 'free' && name === 'free'}
        >
            {generateBtnText()}
        </Button>
    )
}

export default BuyPlanBtn