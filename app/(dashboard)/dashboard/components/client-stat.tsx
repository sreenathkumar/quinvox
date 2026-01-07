import { getClients } from "@/actions/Clients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

async function ClientStat() {
    //fetch client data from server
    const { data: clients } = await getClients();
    const avatarText = (name: string) => {
        const initials = name.split(' ').map((n, i) => {
            return i <= 1 ? n[0] : ''
        }).join('').toUpperCase();

        return initials;
    }
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <CardTitle className="text-xl">
                        Clients
                    </CardTitle>
                    <CardDescription>
                        Active clients and invoices
                    </CardDescription>
                </div>
                <Button variant={'outline'} className="size-8 rounded-full" asChild>
                    <Link href='/dashboard/clients'>
                        <Plus />
                        <span className="sr-only">Add client</span>
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {
                    clients.length > 0 ? clients.map((client) => (
                        <div className="flex gap-4" key={client.name}>
                            <div className="size-10 border border-muted-foreground rounded-full flex items-center justify-center text-muted-foreground font-bold">{avatarText(client.name)}</div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg">{client.name}</span>
                                <span className="text-sm text-muted-foreground">Invoices: {client._count.invoices}</span>
                            </div>
                        </div>
                    )) :
                        <span>No clients to show. Please add some.</span>
                }
            </CardContent>
        </Card>
    )
}

export default ClientStat