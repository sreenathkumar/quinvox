import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
    title: string;
    value: number | string;
    growth: number | string | null;
}

function StatCard({ title, value, growth }: StatCardProps) {
    const signedGrowth = typeof growth === 'number' ? (growth > 0 ? '+' + growth : growth) : growth;
    return (
        <Card className="py-4 border-b-4 border-b-accent">
            <CardContent className="px-4 py-0">
                <div className="flex flex-col justify-center gap-2">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <h2 className="text-2xl font-bold">{value}</h2>
                    {growth ? <p className="text-xs text-muted-foreground">{signedGrowth}% from last month</p> : <p className="text-xs text-muted-foreground">Growth data not available</p>}
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard