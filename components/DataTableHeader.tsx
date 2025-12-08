'use client';

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { ChevronDown, Columns3, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface DataTableHeaderProps<DataT> {
    table: Table<DataT>;
    onDeleteRows?: (selectedRows: DataT[]) => Promise<void>
}

function DataTableHeader<DataT>({ table, onDeleteRows }: DataTableHeaderProps<DataT>) {
    //function to delete selected rows
    // const deleteSelectedRows = async () => {
    //     const selectedRows = table.getSelectedRowModel().rows;
    //     const selectedInvoices = selectedRows.flatMap(row => {
    //         const inv = row.original.invoiceNumber;
    //         return inv ? [inv] : [];
    //     }); // the number of the invoices to be deleted

    //     //optimistic update to the local state
    //     setData((prevData) => prevData.filter((invoice) => !selectedInvoices.includes(invoice.invoiceNumber)));
    //     table.resetRowSelection();

    //     //delete inovices from the server
    //     const result = await deleteInvoices(selectedInvoices);

    //     if (!result.success) {
    //         //if deletion failed, revert the local state
    //         setData(initialData);
    //         toast({
    //             title: "Error",
    //             description: result.message,
    //             variant: "destructive"
    //         })
    //     } else {
    //         toast({
    //             title: "Success",
    //             description: result.message,
    //         });
    //     }

    // };
    // //function to delete selected rows
    // const deleteSelectedRows = async () => {
    //     const selectedRows = table.getSelectedRowModel().rows;
    //     const selectedInvoices = selectedRows.flatMap(row => {
    //         const inv = row.original.invoiceNumber;
    //         return inv ? [inv] : [];
    //     }); // the number of the invoices to be deleted

    //     //optimistic update to the local state
    //     setData((prevData) => prevData.filter((invoice) => !selectedInvoices.includes(invoice.invoiceNumber)));
    //     table.resetRowSelection();

    //     //delete inovices from the server
    //     const result = await deleteInvoices(selectedInvoices);

    //     if (!result.success) {
    //         //if deletion failed, revert the local state
    //         setData(initialData);
    //         toast({
    //             title: "Error",
    //             description: result.message,
    //             variant: "destructive"
    //         })
    //     } else {
    //         toast({
    //             title: "Success",
    //             description: result.message,
    //         });
    //     }

    // };
    const handleDeleteRows = () => {
        if (!onDeleteRows) return;
        const selectedRows = table.getSelectedRowModel().rows;
        const selectedData = selectedRows.map(row => row.original);

        //call the onDeleteRows prop function
        onDeleteRows(selectedData);

        //clear the selection
        table.resetRowSelection();
    }
    return (
        <div className="flex justify-between">
            {
                (table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()) && (
                    <div>
                        <Button
                            variant={'destructive'}
                            size={'sm'}
                            onClick={handleDeleteRows}
                        >
                            <span className="sr-only">Delete selected rows</span>
                            <Trash />
                        </Button>
                    </div>
                )
            }

            <div className="flex items-center gap-4 ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} size={'sm'}>
                            <Columns3 />
                            <span className="hidden lg:inline">Customize Columns</span>
                            <span className="lg:hidden">Columns</span>
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        {
                            table.getAllColumns().filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide()).map(column => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.columnDef.header as string}
                                    </DropdownMenuCheckboxItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant={'outline'} size={'sm'}>
                    <Link href='/' className="flex items-center gap-2">
                        Add Invoice
                        <Plus />
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default DataTableHeader