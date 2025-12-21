import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import usePendingTask from './pending-task-store'
import { InvoiceData } from '../definitions'

export interface InvoiceStoreType {
    invoices: Array<InvoiceData>,
    initInvoices: (invoices: Array<InvoiceData>) => void,
    addInvoice: (invoice: InvoiceData) => void
    updateInvoice: (id: string, data: InvoiceData) => void
    removeInvoice: (invoiceId: string) => void
    clearInvoices: () => void
}

export const CreateInvoiceStore = () => createStore<InvoiceStoreType>()(
    persist(
        (set, get) => ({
            invoices: [] as Array<InvoiceData>,
            initInvoices: (invoices: Array<InvoiceData>) => set({ invoices }),

            addInvoice: (invoice: InvoiceData) => {
                const metadata = {
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }

                //adding the metadata to the invoice
                const updatedInvoice = {
                    ...invoice, ...metadata
                }

                //updating the store with the new invoice
                set({ invoices: [updatedInvoice, ...get().invoices] });

                //add to queue for syncing with cloud
                usePendingTask.getState().addTask({
                    id: invoice.invoiceNumber!,
                    type: 'create',
                    payload: updatedInvoice,
                });

            },

            updateInvoice: (invoiceNumber: string, data: InvoiceData) => {
                set((state) => {
                    const updatedAt = new Date().toISOString();

                    return {
                        invoices: state.invoices.map((inv) => inv.invoiceNumber === invoiceNumber ? { ...data, updatedAt } : inv),
                    }
                });

                // check if there's already a pending task for this invoice
                const pendingTask = usePendingTask.getState().tasks;
                const existingTask = pendingTask.find(task => task.id === invoiceNumber);

                if (existingTask) {
                    //update the existing task's payload
                    usePendingTask.getState().updateTask(existingTask.id, {
                        ...data,
                        updatedAt: new Date().toISOString(),
                    });
                } else {
                    //add task for updating invoice in database
                    usePendingTask.getState().addTask({
                        id: invoiceNumber,
                        type: 'update',
                        payload: { ...data, updatedAt: new Date().toISOString() },
                    });
                }
            },

            removeInvoice: (invoiceId: string) => {
                //check if the invoice is in pending tasks
                const pendingTask = usePendingTask.getState().tasks;
                const isPending = pendingTask.find(task => task.id === invoiceId);

                //remove from the invoice store
                set({
                    invoices: get().invoices.filter(
                        (invoice) => invoice.invoiceNumber !== invoiceId
                    ),
                });

                //if it is pending, remove it from the pending tasks
                if (isPending) {
                    usePendingTask.getState().removeTask(isPending.id);
                    return;
                }

                //add delete task to pending tasks
                usePendingTask.getState().addTask({
                    id: invoiceId,
                    type: 'delete',
                    payload: { invoiceNumber: invoiceId },
                });
            },

            clearInvoices: () => set({ invoices: [] }),
        }),
        {
            name: 'invoices',
        }
    )
)
