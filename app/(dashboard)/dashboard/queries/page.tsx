import { getUserQueries } from "@/actions/userQuery";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { formatCell } from "@/lib/utils";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import SuperJSON from "superjson";
import MessageTooltip from "./components/message-tooltip";
import StatusTooltip from "./components/status-tooltip";

interface QueryType {
    id: string;
    name: string;
    subject: string;
    email: string;
    message: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const tableHeaders = [
    { title: 'Name', key: 'name', col: 1 },
    { title: 'Email', key: 'email', col: 1 },
    { title: 'Subject', key: 'subject', col: 1 },
    { title: 'Message', key: 'message', col: 2 },
    { title: 'Status', key: 'status', col: 1 },
    { title: 'Created At', key: 'createdAt', col: 1 },
];

async function QueryPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    //only admin can access this page
    if (user?.role !== 'admin') {
        return notFound();
    }

    const { data } = await getUserQueries();
    const queries = data ? SuperJSON.deserialize<QueryType[]>(data) : [];

    return (
        <div className="px-5 py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-balance">Contact Submissions</h1>
                <p className="text-muted-foreground mt-2">Manage and reply to customer messages</p>
            </div>
            <QueryTable data={queries} headers={tableHeaders} />
        </div>
    )
}


interface TableHeaderType {
    title: string;
    key: string;
    col: number;
}

interface QueryTableProps {
    data?: QueryType[];
    headers: TableHeaderType[];
}

function QueryTable({ data, headers }: QueryTableProps) {
    return (
        <Table className="border">
            <TableHeader className="bg-muted sticky top-0 z-10 rounded-md">
                <TableRow>
                    {headers.map((header: TableHeaderType) => (
                        <TableHead key={header.key} colSpan={header.col}>
                            {header.title}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {data?.length ? (
                    data.map((row: QueryType) => (
                        <TableRow key={row.id}>
                            {headers.map((header: TableHeaderType) => {
                                let value = row[header.key as keyof QueryType];

                                if (header.key === 'status') {
                                    const statusValue = value || 'Pending'
                                    return <TableCell key={header.title} colSpan={header.col} >
                                        <StatusTooltip id={row.id} value={statusValue as string} />

                                    </TableCell>
                                } else if (header.key === 'message') {
                                    return <TableCell key={header.title} colSpan={header.col} >
                                        <MessageTooltip content={value as string} length={75} />
                                    </TableCell>
                                } else {
                                    return <TableCell key={header.title} colSpan={header.col} >
                                        {formatCell(row[header.key as keyof QueryType])}
                                    </TableCell>
                                }
                            }
                            )}
                        </TableRow>
                    ))

                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={tableHeaders.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}


export default QueryPage