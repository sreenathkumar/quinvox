'use client';

import AdditonalInfo from '@/components/AdditonalInfo';
import BillerInfo from '@/components/BillerInfo';
import CustomerInfo from '@/components/CustomerInfo';
import Header from '@/components/Header';
import ItemsInfo from '@/components/ItemsInfo';
import MetaInfo from '@/components/MetaInfo';
import Preview from '@/components/Preview';
import RecentInvoices from '@/components/RecentInvoices';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useInvoiceStore } from '@/contexts/InvoiceProvider';
import { useToast } from '@/hooks/use-toast';
import authClient from '@/lib/auth-client';
import { InvoiceData, invoiceSchema } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Save } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

const defaultValues: InvoiceData = {
  invoiceNumber: `INV-${new Date().getTime().toString().slice(-6)}`,
  billerName: '',
  billerAddress: '',
  billerEmail: '',
  billerPhone: '',
  clientType: 'Individual',
  clientName: '',
  clientAddress: '',
  clientEmail: '',
  date: new Date(),
  dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  items: [{ id: crypto.randomUUID(), description: '', quantity: 1, unit_price: 12 }],
  tax: 0,
  notes: '',
  saveClient: false,
};

export default function Home() {
  const form = useForm<InvoiceData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { toast } = useToast();
  const { invoices, addInvoice, removeInvoice, updateInvoice } =
    useInvoiceStore();
  const [activeInvoiceId, setActiveInvoiceId] = useState<string | null>(null);

  const watchedItems = useWatch({
    control: form.control,
    name: 'items',
  });
  const watchedTax = useWatch({
    control: form.control,
    name: 'tax',
  });

  const { subtotal, taxAmount, total } = useMemo(() => {

    const subtotal = watchedItems.reduce(
      (acc, item) => {
        return acc + (item.quantity || 0) * (item.unit_price || 0)
      },
      0
    );
    const taxAmount = subtotal * ((watchedTax || 0) / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }, [watchedItems, watchedTax]);

  const onSave: SubmitHandler<InvoiceData> = (data) => {
    const existingInvoice = invoices.find(inv => inv.invoiceNumber === data.invoiceNumber);

    if (existingInvoice) {
      if (!window.confirm('An invoice with this number already exists. Do you want to update it?')) return;

      updateInvoice(data.invoiceNumber!, data);
    } else {
      addInvoice(data)
    }
  }

  const handleCreateNew = () => {
    form.reset(defaultValues);
    setActiveInvoiceId(null);
  };

  const handleLoadInvoice = (invoice: InvoiceData) => {
    const { id, ...rest } = invoice;
    form.reset({
      ...rest,
      date: new Date(invoice.date),
      dueDate: new Date(invoice.dueDate),
    });
    setActiveInvoiceId(invoice.invoiceNumber!);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    removeInvoice(invoiceId);
    if (activeInvoiceId === invoiceId) {
      handleCreateNew();
    }
    toast({
      title: 'Invoice Deleted',
      variant: 'destructive',
    });
  };

  return (<>
    <Header />
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <Form {...form} >
            <form
              id="invoice-form"
              className="space-y-8"
              onSubmit={form.handleSubmit(onSave)}
            >
              <MetaInfo form={form} />
              <ItemsInfo form={form} />
              <CustomerInfo form={form} user={user} />
              <BillerInfo form={form} user={user} />
              <div className="p-6 mt-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-6">
                <AdditonalInfo form={form} />
                <div className='flex items-center gap-4'>
                  <Button type="submit" form="invoice-form" className="bg-accent text-accent-foreground hover:bg-accent/90 grow">
                    <Save className="mr-2 h-4 w-4" /> {activeInvoiceId ? 'Update' : 'Save'} Invoice
                  </Button>
                  <Button className='grow' type="button" variant="outline" onClick={handleCreateNew}>
                    <Plus className="mr-2 h-4 w-4" /> Create New
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <RecentInvoices onLoadInvoice={handleLoadInvoice} onDeleteInvoice={handleDeleteInvoice} />
        </div>

        <div className="lg:col-span-3">
          <div className="sticky top-8 space-y-4">
            <Preview form={form} subtotal={subtotal} taxAmount={taxAmount} total={total} watchedItems={watchedItems} watchedTax={watchedTax} />
          </div>
        </div>
      </div>
    </main>
  </>

  );
}
