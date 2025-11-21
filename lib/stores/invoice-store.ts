import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import { Invoice } from '../definitions'
import usePendingTask from './pending-task-store'

export interface InvoiceStoreType {
    invoices: Array<Invoice>
    addInvoice: (invoice: Invoice) => void
    removeInvoice: (invoiceId: string) => void
    clearInvoices: () => void
}

const createInvoiceStore = () => createStore<InvoiceStoreType>()(
    persist(
        (set, get) => ({
            invoices: [] as Array<Invoice>,

            addInvoice: (invoice: Invoice) => {
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
                    id: crypto.randomUUID(),
                    type: 'create',
                    payload: updatedInvoice,
                });

            },

            removeInvoice: (invoiceId: string) => {
                //check if the invoice is in pending tasks
                const pendingTask = usePendingTask.getState().tasks;
                const isPending = pendingTask.find(task => task.payload.invoiceNumber === invoiceId);

                //if it is pending, remove it from the pending tasks
                if (isPending) {
                    usePendingTask.getState().removeTask(isPending.id);
                }

                //remove from the invoice store
                set({
                    invoices: get().invoices.filter(
                        (invoice) => invoice.invoiceNumber !== invoiceId
                    ),
                });
            },
            clearInvoices: () => set({ invoices: [] }),
        }),
        {
            name: 'invoices',
        }
    )
)

export default createInvoiceStore;