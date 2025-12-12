'use client';

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { ChevronDown, Columns3, Trash } from "lucide-react";
import { Button } from "./ui/button";

interface DataTableHeaderProps<DataT> {
    table: Table<DataT>;
    onDeleteRows?: (selectedRows: DataT[]) => Promise<void>
    actionBtn?: React.ReactNode
}

function DataTableHeader<DataT>({ table, onDeleteRows, actionBtn: ActionBtn }: DataTableHeaderProps<DataT>) {

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
                {
                    ActionBtn ?? null
                }
                {/*  */}
            </div>
        </div>
    )
}

export default DataTableHeader