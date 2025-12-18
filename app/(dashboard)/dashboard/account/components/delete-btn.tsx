'use client';
import UserConfirmation from "@/components/UserConfirmation";
import { deleteBiller } from "@/actions/Billers";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

function DeleteBtn({ id }: { id: string }) {
    //function to handle biller deletion
    const handleDelete = async () => {
        if (!id) return;

        const res = await deleteBiller(id);

        if (!res.success) {
            toast({
                title: "Error",
                description: res.message,
                variant: "destructive"
            });

            return;
        } else {
            toast({
                title: "Success",
                description: "Biller deleted successfully",
            });
        }
    }
    return (
        <UserConfirmation
            title="Delete Biller"
            description="Are you sure you want to delete this biller? This action cannot be undone."
            trigger={
                <Button variant={'link'} className="text-red-600 p-0 text-xs h-auto">Delete</Button>}
            onConfirm={handleDelete}
        />
    )
}

export default DeleteBtn