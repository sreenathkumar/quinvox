'use client';

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import createInvoiceStore, { InvoiceStoreType } from "@/lib/stores/invoice-store";

type InvoiceStoreApi = ReturnType<typeof createInvoiceStore>;

//invoice store context
export const InvoiceContext = createContext<InvoiceStoreApi | undefined>(undefined);

//invoice store provider
export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<InvoiceStoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = createInvoiceStore();
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
    const { invoices, addInvoice, removeInvoice } = useStore(store, state => state);

    return { invoices, addInvoice, removeInvoice } as InvoiceStoreType;
}
