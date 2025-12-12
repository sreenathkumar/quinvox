'use client'

import { addClient } from "@/actions/Clients";
import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ClientData, clientSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react"
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
        resolver: zodResolver(clientSchema)
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
                <Form {...form}>
                    <form id="client-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Client Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="client@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="+1 234 567 8901"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Client Address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 justify-between items-center">
                            <FormField
                                control={form.control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Client Type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Client type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Individual">Individual</SelectItem>
                                                    <SelectItem value="Business">Business</SelectItem>
                                                    <SelectItem value="Company">Company</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Client Country"
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddClientForm