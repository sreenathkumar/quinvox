'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface UserConfirmationProps {
    title: string;
    description: string;
    trigger: React.ReactNode;
    onConfirm: () => Promise<void>;
}

function UserConfirmation({ title, description, trigger, onConfirm }: UserConfirmationProps) {
    const [isOpen, setIsOpen] = useState(false);

    //handle the confirmation
    const handleConrmation = async () => {
        await onConfirm();
        setIsOpen(false);
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {description}
                </DialogDescription>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleConrmation}>Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserConfirmation