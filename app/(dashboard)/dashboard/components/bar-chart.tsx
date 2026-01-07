'use client'

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from "recharts"

const chartConfig = {
    billed: {
        label: 'billed',
        color: 'hsl(var(--chart-1))'
    },
    invoices: {
        label: 'Invoices',
        color: 'hsl(var(--chart-2))'
    }
}

function BarGraph({ data }: { data: any }) {

    return (
        <ChartContainer config={chartConfig}>
            <ComposedChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" />

                <YAxis yAxisId="left" orientation="left" />

                <YAxis yAxisId="right" orientation="right" hide />

                <Tooltip content={<ChartTooltipContent />} />

                <Bar
                    yAxisId="left"
                    dataKey="billed"
                    fill="var(--color-billed)"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                />

                {/* The Invoices as a Line */}
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="invoices"
                    stroke="var(--color-invoices)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-invoices)" }}
                />
            </ComposedChart>
        </ChartContainer>
    )
}

export default BarGraph