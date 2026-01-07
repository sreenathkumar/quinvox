import { getRecentInvoices } from "@/actions/Invoices";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecentInvoiceTable from "./recent-invoice-table";

async function RecentInvoicesCard() {
    //fetch recent invoices data here
    const { data: recentInvoices = [] } = await getRecentInvoices();
    return (
        <Card className="lg:col-span-2 h-auto">
            <CardHeader>
                <CardTitle className="text-xl">
                    Recent Invoices
                </CardTitle>
                <CardDescription>
                    List of recently created or updated invoices
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    recentInvoices?.length > 0 ? (
                        <RecentInvoiceTable data={recentInvoices} />
                    )
                        : <p>No recent invoices available.</p>
                }
            </CardContent>
        </Card>
    )
}

export default RecentInvoicesCard