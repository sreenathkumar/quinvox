'use client'
import { Button } from '@/components/ui/button'
import authClient from '@/lib/auth-client';
import { redirect } from 'next/navigation';

function BuyPlanBtn({ name, btnText }: { name?: string; btnText: string }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSelectPlan = (planName: string) => {
        if (!user) {
            redirect('/login')
        } else {
            if (planName === 'free') {
                redirect('/')
            } else {
                redirect('/contact')
            }
        }
    }

    return (
        <Button variant="secondary" className='w-full bg-accent text-foreground' onClick={() => handleSelectPlan(name || 'free')}>
            {btnText || 'Select Plan'}
        </Button>
    )
}

export default BuyPlanBtn