import { getClients } from "@/actions/Clients";
import ClientTable from "./components/client-table";

async function ClientsPage() {
    const { data: clients } = await getClients();

    return (
        <div className="px-5 py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-balance">
                    Clients
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage and view your clients
                </p>
            </div>
            <div className="flex">
                <ClientTable clients={clients} />
            </div>
        </div>
    )
}

export default ClientsPage