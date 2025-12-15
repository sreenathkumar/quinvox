'use client'

import { addClient } from "@/actions/Clients";
import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ClientData, profileSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues: ClientData = {
    type: 'Individual',
    name: '',
    address: '',
    email: '',
    country: '',
    phone: '',
};

function AddClientForm() {
    const form = useForm({
        defaultValues,
        resolver: zodResolver(profileSchema)
    });
    const [isOpen, setIsOpen] = useState(false);

    //function to handle form submission
    const handleSubmit: SubmitHandler<ClientData> = async (data) => {
        const res = await addClient(data);

        if (res.success) {
            setIsOpen(false);
            form.reset();
            toast({
                title: "Client Added",
                description: "Cleint has been added successfully.",
            })
        } else {
            toast({
                title: "Error",
                description: res.message,
                variant: "destructive",
            })
        }

    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} size={'sm'}>
                    Add Client
                    <span className="sr-only">Add client</span>
                    <Plus className="ml-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add New Client
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Add client form goes here.
                </DialogDescription>
                <ProfileForm mode='create' profile='client' onSubmit={handleSubmit} form={form} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="client-form">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddClientForm