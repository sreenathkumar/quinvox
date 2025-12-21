'use client';

import { CreateInvoiceStore, InvoiceStoreType } from "@/lib/stores/invoice-store";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

type InvoiceStoreApi = ReturnType<typeof CreateInvoiceStore>;

//invoice store context
export const InvoiceContext = createContext<InvoiceStoreApi | undefined>(undefined);

//invoice store provider
export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<InvoiceStoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = CreateInvoiceStore();
    }

    return (
        <InvoiceContext.Provider value={storeRef.current}>
            {children}
        </InvoiceContext.Provider>
    );
}

export const useInvoiceStore = () => {
    const store = useContext(InvoiceContext);

    if (!store) {
        throw new Error("useInvoiceStore must be used within an InvoiceProvider");
    }
    const { invoices, initInvoices, addInvoice, removeInvoice, updateInvoice, clearInvoices } = useStore(store, state => state);

    return { invoices, initInvoices, addInvoice, removeInvoice, updateInvoice, clearInvoices } as InvoiceStoreType;
}
