'use client'

import DataTable from "@/components/DataTable"
import { Checkbox } from "@/components/ui/checkbox"
import { ClientData } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"
import AddClientForm from "./add-clients-form"

const columns: ColumnDef<ClientData>[] = [
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
        )
    },
    { accessorKey: 'name', header: 'Name', },
    { accessorKey: 'email', header: 'Email', },
    { accessorKey: 'phone', header: 'Phone', },
    { accessorKey: 'address', header: 'Address', },
    { accessorKey: 'country', header: 'Country', },
    { accessorKey: 'type', header: 'Type', }
]

function ClientTable({ clients }: { clients: ClientData[] }) {

    return (
        <DataTable
            columns={columns}
            data={clients}
            actionBtn={
                <AddClientForm />
            }
        />
    )
}

export default ClientTable