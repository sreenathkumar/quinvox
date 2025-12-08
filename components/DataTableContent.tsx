'use client'

import { flexRender, Table as ReactTableInstance } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface DataTableContentProps<DataT> {
    table: ReactTableInstance<DataT>;
}

function DataTableContent<DataT>({ table }: DataTableContentProps<DataT>) {
    const columns = table.getAllColumns();
    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader className="bg-muted sticky top-0 z-10 rounded-md">
                    {
                        /** Table Header */
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                        }
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                    {
                        /** Table Body */
                        table.getRowModel().rows.length ?
                            (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTableContent