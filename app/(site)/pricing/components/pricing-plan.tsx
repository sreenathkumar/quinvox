import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import BuyPlanBtn from './purchase-button'
import PlanPrice from './plan-price'

interface PricingPlanProps {
    name: string
    heading: string
    description: string
    price: string,
    note?: string,
    cta: string,
    bedge?: string,
    children?: React.ReactNode
}

function PricingPlan({ name, heading, description, price, note, cta, bedge, children }: PricingPlanProps) {
    return (
        <div className="relative">
            {bedge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                    {bedge}
                </div>
            )}
            <Card className={`transition-all duration-300 ${bedge ? "ring-2 ring-accent shadow-xl" : "shadow"}`}>
                <CardHeader>
                    <CardTitle>
                        {heading || "Free Starter"}
                    </CardTitle>
                    <CardDescription>
                        {description || "Perfect for freelancers and small businesses."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PlanPrice price={price} />
                    <p className="mt-2 text-sm text-muted-foreground">{note || "No credit card required."}</p>

                    <div className="mt-8 space-y-4">
                        {children}
                    </div>
                </CardContent>

                <CardFooter className='pt-6'>
                    <BuyPlanBtn name={name} btnText={cta} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default PricingPlan