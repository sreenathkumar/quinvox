'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useInvoiceStore } from '@/contexts/InvoiceProvider';
import { InvoiceData, InvoiceItem } from '@/lib/definitions';

interface RecentInvoicesProps {
    onLoadInvoice: (invoice: InvoiceData) => void;
    onDeleteInvoice: (invoiceId: string) => void;
}

function RecentInvoices({ onDeleteInvoice, onLoadInvoice }: RecentInvoicesProps) {
    const { invoices } = useInvoiceStore();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                {/* <CardDescription>
                    {user ? "Your saved invoices." : "Invoices saved in this browser."}
                </CardDescription> */}
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-64">
                    <div className="space-y-2">
                        {invoices.length > 0 ? (
                            invoices.map((invoice) => (
                                <div key={invoice.invoiceNumber} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                                    <div>
                                        <p className="font-medium">{invoice.invoiceNumber}</p>
                                        <p className="text-sm text-muted-foreground">{invoice.clientName} - {formatCurrency(invoice.items.reduce((acc: number, i: InvoiceItem) => acc + i.quantity * i.unit_price, 0) * (1 + (invoice.tax || 0) / 100))}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => onLoadInvoice(invoice as InvoiceData)}>Load</Button>
                                        <Button variant="destructive" size="sm" onClick={() => onDeleteInvoice(invoice.invoiceNumber!)}>Delete</Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-8">No recent invoices found.</p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default RecentInvoices