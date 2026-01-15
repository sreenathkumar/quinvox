'use server';

import isServerAuthenticated from "@/lib/check-server-auth";
import prisma from "@/lib/prisma";
import { getClientAggregation, getInvoiceAggregation } from "@/lib/statistics-aggregation";
import { formatCurrency } from "@/lib/utils";
import { differenceInCalendarDays, parseISO } from "date-fns";

interface InvoiceStatResult {
    currentMonth: {
        billed: number,
        invoices: number,
        avg_value: number
    },
    growth: {
        billed: number | null,
        invoices: number | null,
        avg_value: number | null
    }
}

interface InvoiceBarGraphData {
    label: string,
    billed: number,
    invoices: number
}

interface ClientStatResult {
    current: number, last: number, growth: number | null
}

//generate the comparative analytics for invoice and client models
export async function getAnalytics() {
    try {
        //check if the user is authenticated
        const { authenticated, user, isPro } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error('User not authenticated');
        }

        if (!isPro) {
            throw new Error('Analytics not available for free or expired plans');
        }

        const [invoiceStats, clientStats] = await Promise.all([
            generateInvoieStat(user.id),
            generateClientStat(user.id)
        ]);

        if (!invoiceStats || !clientStats) {
            throw new Error('Failed to generate statistics');
        }

        return [
            { title: 'Total Billed', value: formatCurrency(invoiceStats?.currentMonth?.billed), growth: invoiceStats?.growth?.billed },
            { title: 'Invoice Created', value: invoiceStats?.currentMonth?.invoices, growth: invoiceStats?.growth?.invoices },
            { title: 'New Clients', value: clientStats?.current, growth: clientStats?.growth },
            { title: 'Average Bill', value: formatCurrency(invoiceStats?.currentMonth?.avg_value), growth: invoiceStats?.growth?.avg_value },
        ]

    } catch (error: any) {
        console.log("Error in Comparative Analytics:", error?.message);
        return null;
    }
}

//generate the bar graph data for revenue statistics
export async function getRevenueBarData({ from, to, timezone }: { from: string, to: string, timezone: string }) {
    //console.log('Generating revenue bar data for:', { from, to, timezone });
    const start = parseISO(from);
    const end = parseISO(to);
    const diff = differenceInCalendarDays(end, start);
    const groupingUnit = getGroupingUnit(diff)//return days/week/month/year
    const weekStart = getWeekDay(timezone); //get the week start day based on timezone

    try {
        // check the user is authenticated
        const { authenticated, user, isPro } = await isServerAuthenticated();

        if (!authenticated || !user) {
            throw new Error('User not authenticated');
        }

        if (!isPro) {
            throw new Error('Analytics not available for free or expired plans');
        }


        //run the mongodb aggregation for data.
        const data = await prisma.invoice.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        createdAt: { $gte: { $date: start }, $lte: { $date: end } },
                        userId: user.id
                    }
                },

                {
                    $addFields: {
                        total: {
                            $reduce: {
                                input: '$items',
                                initialValue: 0,
                                in: {
                                    $add: [
                                        '$$value',
                                        {
                                            $multiply: [
                                                '$$this.unit_price',
                                                '$$this.quantity'
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateTrunc: {
                                date: "$createdAt",
                                unit: groupingUnit,
                                timezone: timezone,
                                startOfWeek: weekStart
                            }
                        },
                        billed: { $sum: '$total' },
                        invoices: { $sum: 1 },
                    }
                },
                { $sort: { _id: 1 } },
                {
                    $project: {
                        _id: 0,
                        label: {
                            $concat: [
                                {
                                    $dateToString: {
                                        date: { $max: ["$_id", start] },
                                        format: groupingUnit === 'day' ? '%b %d' :
                                            groupingUnit === 'week' ? '%b %d' :
                                                groupingUnit === 'month' ? '%b, %Y' :
                                                    '%Y',
                                        timezone: timezone
                                    }
                                },
                                groupingUnit === 'day' ? '' : ' - ',
                                {
                                    $dateToString: {
                                        date: {
                                            $min: [
                                                {
                                                    $dateAdd: {
                                                        startDate: '$_id',
                                                        unit: groupingUnit,
                                                        amount: 1,
                                                        timezone: timezone
                                                    }
                                                }
                                            ]
                                        },
                                        format: groupingUnit === 'day' ? '' :
                                            groupingUnit === 'week' ? '%b %d' :
                                                groupingUnit === 'month' ? '%b, %Y' :
                                                    '%Y',
                                        timezone: timezone
                                    }
                                },
                            ]
                        },
                        billed: 1,
                        invoices: 1,
                    }
                }
            ]
        }) as unknown as InvoiceBarGraphData[];
        //console.log('Generated revenue bar data:', data);
        return data;
    } catch (error: any) {
        console.log('Error in generating revenue bar data: ' + error?.message);

        return []
    }
}

//generate the statistics related to the invoice model.
async function generateInvoieStat(userId: string): Promise<InvoiceStatResult | null> {
    try {
        const result = await prisma.invoice.aggregateRaw({
            pipeline: getInvoiceAggregation(userId),
        }) as unknown as InvoiceStatResult[];

        if (!result || result.length === 0) {
            return null
        }

        return result[0];
    } catch (error: any) {
        console.log('Error in generating invoice statistics: ' + error?.message);
        return null;
    }
}

// generate statistics related to the client model
async function generateClientStat(userId: string): Promise<ClientStatResult | null> {
    try {
        const result = await prisma.client.aggregateRaw({
            pipeline: getClientAggregation(userId),
        }) as unknown as ClientStatResult[];

        if (!result || result.length === 0) {
            return null
        }

        return result[0];
    } catch (error: any) {
        console.log('Error in generating client statistics: ' + error?.message);
        return null;
    }
}

//generate the grouping unit for the bar graph. 
// like stat against days/week/month/year
function getGroupingUnit(diff: number) {
    if (diff <= 14) {
        return 'day'
    }

    if (diff > 14 && diff <= 60) {
        return 'week'
    }

    if (diff > 60 && diff <= 365) {
        return 'month'
    }

    if (diff > 365) {
        return 'year'
    }
}

function getWeekDay(timezone: string) {
    const zone = timezone.split('/')[0];

    if (zone === 'Europe' || zone === 'Australia' || zone === 'Africa') {
        return 'monday'
    }

    return 'sunday'
}



