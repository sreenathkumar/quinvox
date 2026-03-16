import { getSubscriptions } from "@/actions/subscription";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface BillingCycle {
    interval: string;
    frequency: number;
}

async function PaymentCard() {
    const { data: subscriptions } = await getSubscriptions();
    return (
        <Card className="mt-16">
            <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <CardTitle>
                        Payment Details
                    </CardTitle>
                    <CardDescription>
                        View and manage your payment information.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center py-10 min-w-0">
                <div className="w-full overflow-x-auto">
                    <Table className="min-w-[900px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap">Status</TableHead>
                                <TableHead className="whitespace-nowrap">Plan</TableHead>
                                <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                                <TableHead className="whitespace-nowrap">Amount</TableHead>
                                <TableHead className="whitespace-nowrap">Started At</TableHead>
                                <TableHead className="whitespace-nowrap">Next Billing Date</TableHead>
                                <TableHead className="whitespace-nowrap">Canceled At</TableHead>
                                <TableHead className="whitespace-nowrap">Paused At</TableHead>
                                <TableHead className="whitespace-nowrap">Payment Method</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                subscriptions && subscriptions?.length > 0 ? (
                                    subscriptions.map((subs) => {
                                        const billingCycle: BillingCycle | null = subs.billingCycle as unknown as BillingCycle || null;

                                        return (
                                            <TableRow key={subs.id}>
                                                <TableCell className="whitespace-nowrap">
                                                    <Badge variant={`${subs.status === 'active' || subs.status === 'trialing' ? 'success' : 'destructive'}`}>{subs.status}</Badge></TableCell>
                                                <TableCell className="whitespace-nowrap">
                                                    {billingCycle ? `Pro (${billingCycle.interval}ly)` : 'Pro'}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap">{subs.txnId}</TableCell>
                                                <TableCell className="whitespace-nowrap">${'N/A'}</TableCell>
                                                <TableCell className="whitespace-nowrap">{subs.createdAt ? format(subs?.createdAt, 'PP') : 'N/A'}</TableCell>
                                                <TableCell className="whitespace-nowrap">{subs.nextBilledAt ? format(subs.nextBilledAt, 'PP') : 'N/A'}</TableCell>
                                                <TableCell className="whitespace-nowrap">{subs.canceledAt ? format(subs.canceledAt, 'PP') : 'N/A'}</TableCell>
                                                <TableCell className="whitespace-nowrap">{subs.pausedAt ? format(subs.pausedAt, 'PP') : 'N/A'}</TableCell>
                                                <TableCell className="whitespace-nowrap">{'N/A'}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                ) : 'No transactions found.'
                            }
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default PaymentCard