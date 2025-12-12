'use client'

import { deleteInvoices } from "@/actions/Invoices";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { InvoiceData } from "@/lib/definitions";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const columns: ColumnDef<InvoiceData>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'invoiceNumber',
        header: 'Invoice ID',
    },
    {
        accessorKey: 'clientName',
        header: 'Customer',
    },
    {
        id: 'totalAmount',
        accessorFn: (row) => {
            return row.items?.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
        },
        header: 'Amount',
        cell: ({ row }) => row.getValue('totalAmount') && formatCurrency(row.getValue('totalAmount') as number)
    },
    {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: ({ row }) => format(row.getValue('dueDate'), "PP")
    },
    {
        accessorKey: 'date',
        header: 'Generated On',
        cell: ({ row }) => format(row.getValue('date'), "PP")
    },
    {
        accessorKey: 'billerName',
        header: 'Billed By',
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <EllipsisVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

function InvoiceTable({ data: initialData }: { data: InvoiceData[] }) {
    const [data, setData] = useState<InvoiceData[]>(() => initialData);

    //function to delete selected rows
    const deleteSelectedRows = async (selectedRows: InvoiceData[]) => {
        const selectedInvoices = selectedRows.flatMap(row => {
            const inv = row.invoiceNumber;
            return inv ? [inv] : [];
        }); // the number of the invoices to be deleted

        //optimistic update to the local state
        setData((prevData) => prevData.filter((invoice) => !selectedInvoices.includes(invoice.invoiceNumber)));

        //delete inovices from the server
        const result = await deleteInvoices(selectedInvoices);

        if (!result.success) {
            //if deletion failed, revert the local state
            setData(initialData);
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Success",
                description: result.message,
            });
        }
    }

    return (
        <DataTable
            data={data}
            columns={columns}
            onDeleteRows={deleteSelectedRows}
            actionBtn={
                <Button variant={'outline'} size={'sm'}>
                    <Link href='/' className="flex items-center gap-2">
                        Add Invoice
                        <Plus />
                    </Link>
                </Button>
            } />
    )
}


export default InvoiceTable