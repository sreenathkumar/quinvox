'use client'

import { getRevenueBarData } from "@/actions/Analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { endOfMonth, endOfWeek, getDate, startOfMonth, startOfWeek, subMonths } from 'date-fns'
import { useEffect, useState } from 'react'
import { type DateRange } from 'react-day-picker'
import BarGraph from "./bar-chart"
import RevenueTimeframe from "./select-revenue-timeframe"

interface GraphDataType {
    label: string,
    billed: number,
    invoices: number
}

function RevenueCard() {
    const [graphData, setGraphData] = useState<GraphDataType[]>([])

    const getInitialRange = () => {
        const now = new Date();
        const dayOfMonth = getDate(now);

        if (dayOfMonth <= 7 && dayOfMonth >= 1) {
            //last month last week
            const lastMonth = subMonths(now, 1);
            const lastDayOfLastMonth = endOfMonth(lastMonth);

            return {
                from: startOfWeek(lastDayOfLastMonth),
                to: endOfWeek(lastDayOfLastMonth)
            }
        }

        return {
            from: startOfMonth(now),
            to: endOfMonth(now),
        }
    }

    //store in state
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(getInitialRange());

    //handle the seleting date and applying date
    const handleApply = async () => {
        // check if the from and to exists
        if (!selectedRange?.from || !selectedRange?.to) return;

        const from = selectedRange.from.toISOString();
        const to = selectedRange.to.toISOString();
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        //calling the data
        const data = await getRevenueBarData({ from, to, timezone: userTz });

        if (data.length > 0) {
            setGraphData(data);
        }

    }

    //get graph data
    const getGraphData = async ({ from, to, timezone }: { from: string, to: string, timezone: string }) => {
        const res = await getRevenueBarData({ from, to, timezone });

        if (res && res?.length > 0) {
            setGraphData(res);
        }
    }

    //handle the clear button
    const handleClear = () => {
        setSelectedRange(getInitialRange()); //reset the selection to default
    }

    //add the start date and end date after load
    useEffect(() => {
        const from = getInitialRange()?.from.toISOString();
        const to = getInitialRange()?.to.toISOString();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (from && to) {
            getGraphData({ from, to, timezone })
        }

    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-row flex-wrap justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl">
                        Revenue Overview
                    </CardTitle>
                    <CardDescription>
                        Monthly revenue and invoice count
                    </CardDescription>
                </div>
                <RevenueTimeframe
                    selectedRange={selectedRange}
                    setSelectedRange={setSelectedRange}
                    applyAction={handleApply}
                    clearAction={handleClear}
                />
            </CardHeader>
            <CardContent>
                {
                    graphData.length > 0 ? <BarGraph data={graphData} /> :
                        <span >There is no statistical data</span>
                }
            </CardContent>
        </Card>
    )
}

export default RevenueCard