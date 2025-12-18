'use client'

import { addBiller, updateBiller } from "@/actions/Billers";
import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { BillerData, profileSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues: BillerData = {
  type: 'Individual',
  name: '',
  address: '',
  email: '',
  country: '',
  phone: '',
};

interface BillerFormProps {
  trigger?: React.ReactNode;
  defaultData?: BillerData;
  mode?: 'create' | 'edit';
  billerId?: string;
}

function BillerForm({ trigger, defaultData, mode, billerId }: BillerFormProps) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(profileSchema)
  });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  //function to handle form submission
  const handleSubmit: SubmitHandler<BillerData> = async (data) => {

    if (mode === 'edit' && !billerId) {
      toast({
        title: "Error",
        description: "No biller ID found for editing.",
        variant: "destructive",
      });
      return
    };

    //Determine which function to call and the success message
    const action = mode === 'edit' ? updateBiller(billerId!, data) : addBiller(data);
    const successTitle = mode === 'edit' ? "Client Updated" : "Client Added";
    const successDesc = mode === 'edit' ? "Client has been updated successfully." : "Client has been added successfully.";

    try {
      //Execute the action
      const res = await action;

      if (res.success) {
        setIsOpen(false);
        form.reset();
        toast({
          title: successTitle,
          description: successDesc,
        });
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      //unexpected network/code crashes
      toast({
        title: "System Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    router.refresh();
  }

  useEffect(() => {
    if (defaultData && mode === 'edit') {
      form.reset(defaultData);
    }
  }, [defaultData]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {`${mode === 'edit' ? 'Edit' : 'Add New'} Biller`}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {`${mode === 'edit' ? 'Edit' : 'Add'} biller profile.`}
        </DialogDescription>
        <ProfileForm profile='biller' onSubmit={handleSubmit} form={form} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="biller-form" disabled={!form.formState.isDirty}>{`${mode === 'edit' ? 'Save Changes' : 'Add'}`}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BillerForm