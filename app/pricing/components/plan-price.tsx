'use client'

import { usePlan } from "@/contexts/PlanProvider";

function PlanPrice({ price }: { price: string }) {
    const { isAnnual } = usePlan();
    return (
        <div className="mt-6">
            <span className="text-5xl font-extrabold text-foreground">${isAnnual ? Number(price) : Number(price) + (Number(price) * 0.2)}</span>
            <span className="text-xl font-medium text-muted-foreground">/ {isAnnual ? 'month billed annually' : 'month'}</span>
        </div>
    )
}

export default PlanPrice