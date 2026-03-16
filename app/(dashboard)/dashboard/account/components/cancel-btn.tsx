'use client'

import { Button } from "@/components/ui/button"
import { usePlan } from "@/contexts/PlanProvider"
import { toast } from "@/hooks/use-toast"
import { User } from "@prisma/client";

function CancelSubscription({ user }: { user: User }) {
    const { paddle } = usePlan();

    const handleCancel = async () => {

        if (!user.currentSubscription) {
            toast({
                title: 'No Active Subscription',
                description: 'You do not have an active subscription to cancel.',
                variant: 'destructive',
            })
        }

        try {
            paddle?.Retain.demo({
                feature: 'cancellationFlow'
            })
        } catch (err) {
            console.error('Error initiating cancellation flow:', err);
            toast({
                title: 'Error',
                description: 'An error occurred while canceling your subscription. Please try again later.',
                variant: 'destructive',
            })
        }

    }
    return (
        <Button
            onClick={handleCancel}
            variant={'link'}
            size={'sm'}
            className="text-xs p-0 text-muted-foreground hover:text-destructive "

        >
            Cancel
        </Button>
    )
}

export default CancelSubscription