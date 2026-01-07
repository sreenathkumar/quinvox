'use client'

import DataTable from "@/components/DataTable"
import { InvoiceData } from "@/lib/definitions"
import { formatCurrency } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

const columns: ColumnDef<InvoiceData>[] = [
    { accessorKey: 'invoiceNumber', header: 'ID' },
    { accessorKey: 'clientName', header: 'Client Name' },
    {
        id: 'totalAmount',
        header: 'Amount',
        accessorFn: (row) => row.items?.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0)
        ,
        cell: ({ row }) => formatCurrency(row.getValue('totalAmount') as number)
    },
    { accessorKey: 'dueDate', header: 'Due Date', cell: ({ row }) => format(row.getValue('dueDate'), 'PP') },
]

function RecentInvoiceTable({ data }: { data: InvoiceData[] }) {
    return (
        <DataTable data={data} columns={columns} header={false} footer={false} />
    )
}

export default RecentInvoiceTable