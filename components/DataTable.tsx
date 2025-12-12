'use client'

import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import DataTableContent from "./DataTableContent";
import DataTableFooter from "./DataTableFooter";
import DataTableHeader from "./DataTableHeader";

interface DataTableProps<DataT, RowT> {
    data: DataT[],
    columns: ColumnDef<DataT, RowT>[],
    onDeleteRows?: (selectedRows: DataT[]) => Promise<void>
    actionBtn?: React.ReactNode
}

function DataTable<DataT, RowT>({ data, columns, onDeleteRows, actionBtn }: DataTableProps<DataT, RowT>) {
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    //react-table instance
    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            pagination,
        },
        getRowId: (row: any, index) => {
            if (row.id) return row.id;

            return `row-${index}`
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="flex flex-col gap-4 flex-1">
            {/* Table Top Bar */}
            <DataTableHeader table={table} onDeleteRows={onDeleteRows} actionBtn={actionBtn} />
            {/* Table */}
            <DataTableContent table={table} />
            {/* Table Bottom Bar */}
            <DataTableFooter table={table} />
        </div>
    )
}


export default DataTable