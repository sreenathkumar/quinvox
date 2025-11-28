'use client'

import { Switch } from "@/components/ui/switch"
import { usePlan } from "@/contexts/PlanProvider"

function SwitchPlan() {
    const { isAnnual, setIsAnnual } = usePlan()
    return (
        <div className="flex items-center gap-4 mx-auto">
            <span className={isAnnual ? "opacity-50" : "font-bold"}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-accent" />
            <span className={isAnnual ? "font-bold" : "opacity-50"}>Annually (Save 20%)</span>
        </div>
    )
}

export default SwitchPlan