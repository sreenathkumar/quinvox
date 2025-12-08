'use client'
import { updateUserQueryStatus } from "@/actions/userQuery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const statusOptins = ['pending', 'handled'];

function StatusTooltip({ id, value }: { id: string, value: string }) {
    const [initialStatus, setInitialStatus] = useState(value || 'pending');
    const { toast } = useToast()

    //function to handle status change
    const handleStatusChange = async (status: string) => {
        if (status === initialStatus) return; //no change

        //set initial status optimistically
        setInitialStatus(status);

        //call server action to update status
        const res = await updateUserQueryStatus(id, status as 'pending' | 'handled');

        if (!res.success) {
            setInitialStatus(value); //revert back on failure
            toast({
                title: "Error",
                description: `Failed to update status: ${res.error}`,
                variant: "destructive",
            })
        } else {
            toast({
                title: "Status Updated",
                description: `Query status updated to ${status}`,
            })
        }

    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Badge variant={initialStatus !== 'handled' ? 'secondary' : 'default'}>
                    {initialStatus}
                </Badge>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-2 p-0">
                {
                    statusOptins.map((status) => (
                        <Button key={status} onClick={() => handleStatusChange(status)} variant={'default'} size='sm' className={`w-full rounded-0 hover:p-0 ${status === initialStatus ? 'bg-muted' : 'bg-transparent'} hover:bg-muted`}>
                            <Badge variant={status !== 'handled' ? 'secondary' : 'default'}>{status}</Badge>
                        </Button>))
                }
            </TooltipContent>
        </Tooltip>
    )
}

export default StatusTooltip