import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import { Invoice } from '../definitions'

export interface InvoiceStore {
    invoices: Array<Invoice>
    addInvoice: (invoice: Invoice) => void
    removeInvoice: (invoiceId: string) => void
    clearInvoices: () => void
}

const createInvoiceStore = () => createStore<InvoiceStore>()(
    persist(
        (set, get) => ({
            invoices: [] as Array<Invoice>,
            addInvoice: (invoice: Invoice) =>
                set({ invoices: [invoice, ...get().invoices] }),
            removeInvoice: (invoiceId: string) =>
                set({
                    invoices: get().invoices.filter(
                        (invoice) => invoice.invoiceNumber !== invoiceId
                    ),
                }),
            clearInvoices: () => set({ invoices: [] }),
        }),
        {
            name: 'invoices',

        }
    )
)

export default createInvoiceStore;