'use client';

import getInvoices from "@/actions/getInvoices";
import { useInvoiceStore } from "@/contexts/InvoiceProvider";
import authClient from "@/lib/auth-client";
import usePendingTask from "@/lib/stores/pending-task-store";
import triggerSync from "@/lib/sync-engine";
import { useEffect, useRef } from "react";

function SyncListener() {
    const { invoices, initInvoices } = useInvoiceStore();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const initializedRef = useRef(false);

    // Run syncWithCloud on loading the app
    useEffect(() => {
        if (!user) { return }
        if (initializedRef.current) { return }

        async function initCloudInvioces() {
            console.log('SyncListener: Checking for cloud invoices to initialize...');
            const pendingTasks = usePendingTask.getState().tasks;

            if (invoices.length === 0 && pendingTasks.length === 0) {
                const res = await getInvoices();

                if (res.length > 0) {
                    initInvoices(res);
                    console.log('SyncListener: Initialized invoices from cloud.');
                }
            }
        }

        if (navigator.onLine) {
            triggerSync();
            //get cloud invoices 
            initCloudInvioces();
        }
        initializedRef.current = true;
    }, [user]);

    // Run when the app comes online
    useEffect(() => {
        function handleOnline() {
            triggerSync()
            console.log('SyncListener: App is back online, syncing pending tasks...');
        }

        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('online', handleOnline);
        }
    }, []);

    return null;
}

export default SyncListener