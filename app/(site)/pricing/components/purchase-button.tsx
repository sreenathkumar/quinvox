'use client'
import { getPriceId, subscribeToFree } from '@/actions/subscription';
import { Button } from '@/components/ui/button';
import { usePlan } from '@/contexts/PlanProvider';
import { toast } from '@/hooks/use-toast';
import authClient from '@/lib/auth-client';
import { redirect } from 'next/navigation';

function BuyPlanBtn({ name }: { name?: string }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { isAnnual, paddle } = usePlan();

    const handleSelectPlan = async (planName: string) => {
        if (!user) {
            redirect('/login')
        } else {
            if (planName === 'pro') {
                const { priceId, error } = await getPriceId(user.id, isAnnual);

                if (error || !priceId) {
                    toast({
                        title: 'Error',
                        description: error,
                        variant: 'destructive',
                    });
                    return;
                }

                paddle?.Checkout.open({
                    customer: {
                        email: user.email,
                    },
                    items: [
                        {
                            priceId,
                            quantity: 1,
                        }
                    ],
                    customData: {
                        "app_user_id": user.id,
                    }
                })
            } else {
                const confirmed = window.confirm('Are you sure you want to switch to the free plan? This will cancel your current subscription and you will lose access to pro features.');

                if (!confirmed) {
                    return;
                }

                // Call the subscribeToFree action to update the user's subscription
                const res = await subscribeToFree();

                if (res && res.success) {
                    toast({
                        title: 'Subscription Updated',
                        description: res.message,
                    })
                } else {
                    toast({
                        title: 'Subscription Update Failed',
                        description: 'An error occurred while updating your subscription. Please try again later.',
                        variant: 'destructive',
                    })
                }
            }
        }
    }

    //generate button based on user plan
    function generateButtonText() {
        if (!user) {
            return name === 'pro' ? 'Start Free Trial' : 'Current Plan';
        }

        // FREE PLAN USER
        if (user.plan === 'free') {
            if (name === 'free') {
                return 'Current Plan';
            }
            if (name === 'pro') {
                return (user.trialUsed ? 'Upgrade to Pro' : 'Start Free Trial');
            }
        }

        // PRO PLAN USER
        if (user.plan === 'pro') {
            if (user.status === 'trialing') {
                return (name === 'free' ? 'Downgrade' : 'Active Trial');

            }

            if (user.status === 'active') {
                return (name === 'free' ? 'Downgrade' : 'Current Plan');

            }

            if (user.status === 'past_due') {
                return (name === 'free' ? 'Downgrade' : 'Update Payment');
            }

            if (user.status === 'paused') {
                return (name === 'free' ? 'Downgrade' : 'Resume Plan');

            }
        }
    }
    return (
        <Button
            variant="secondary"
            className='w-full bg-accent text-foreground'
            onClick={() => handleSelectPlan(name || 'free')}
            disabled={user?.plan === 'free' && name === 'free'}
        >
            {generateButtonText()}
        </Button>
    )
}

export default BuyPlanBtn