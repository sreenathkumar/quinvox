'use client';

import getInvoices from "@/actions/getInvoices";
import { useInvoiceStore } from "@/contexts/InvoiceProvider";
import authClient from "@/lib/auth-client";
import usePendingTask from "@/lib/stores/pending-task-store";
import triggerSync from "@/lib/sync-engine";
import { useEffect } from "react";

function SyncListener() {
    const { invoices, initInvoices } = useInvoiceStore();
    const { data: session } = authClient.useSession();
    const user = session?.user;


    // Run syncWithCloud on loading the app
    useEffect(() => {
        async function initCloudInvioces() {
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
            console.log('SyncListener: App is online on load, syncing pending tasks...');
            triggerSync();

            if (user) {
                //get cloud invoices 
                initCloudInvioces();
            }

        }
    }, []);

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