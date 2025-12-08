'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTableHeaderProps<DataT> {
    table: Table<DataT>;
}

function DataTableFooter<DataT>({ table }: DataTableHeaderProps<DataT>) {
    return (
        <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm whitespace-nowrap md:flex">
                {`${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`}
            </div>
            <div className="flex w-full items-center justify-end gap-8 lg:w-fit">
                <div className="hidden items-center gap-2 md:flex">
                    <Label htmlFor="rows-per-page" className="whitespace-nowrap">Rows per page</Label>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(Value) => {
                            table.setPageSize(Number(Value));
                        }}
                    >
                        <SelectTrigger id='rows-per-page'>
                            <SelectValue
                                placeholder={`${table.getState().pagination.pageSize}`}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-fit items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className=" flex items-center gap-2 md:ml-0">
                    <Button
                        variant="outline"
                        size={'icon'}
                        className="hidden size-8 p-0 md:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size={'icon'}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size={'icon'}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-8 p-0 md:flex"
                        size={'icon'}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DataTableFooter