import { getInvoices } from "@/actions/Invoices";
import InvoiceTable from "./invoice-table";

async function InvoicesPage() {
    const invoices = await getInvoices();

    return (
        <div className="px-5 py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-balance">
                    Billing Invoices
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage and view your billing invoices
                </p>
            </div>
            <InvoiceTable data={invoices} />
        </div>
    )
}

export default InvoicesPage