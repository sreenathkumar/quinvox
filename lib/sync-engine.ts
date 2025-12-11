import syncDatabase from "@/actions/syncDB";
import usePendingTask from "./stores/pending-task-store";
import { toast } from "@/hooks/use-toast";
import authClient from "./auth-client";

let syncing = false;
let syncDebounce: any;

async function syncWithCloud() {
    if (syncing) return; // prevents parallel syncs
    syncing = true;

    try {
        while (true) {
            const { tasks, removeTask } = usePendingTask.getState();

            // no more tasks → stop loop
            if (tasks.length === 0) break;

            // always take first task
            const task = tasks[0];

            try {
                const res = await syncDatabase(task);

                if (res.success) {
                    toast({
                        title: "Sync Successful",
                        description: res.message,
                    });

                    removeTask(task.id);
                } else {
                    if (res.code === 'RESOURCE_NOT_FOUND' || res.code === 'DUPLICATE_RESOURCE') {
                        removeTask(task.id);
                    } else {
                        throw new Error(res.message || 'Sync failed');
                    }

                }
            } catch (error: any) {
                toast({
                    title: "Sync Failed",
                    description: `Failed to sync task ${task.id}: ${error?.message}`,
                    variant: "destructive",
                });
                removeTask(task.id);
                // stop processing and allow retry later
                break;
            }
        }
    } finally {
        syncing = false;
    }
}

// debounce multiple calls within short time    
async function TriggerSync() {
    const { data: session } = await authClient.getSession();
    const user = session?.user;

    if (!user || user.plan === 'free') return;

    if (navigator.onLine === false) return; // do not schedule sync when offline

    clearTimeout(syncDebounce);
    syncDebounce = setTimeout(() => {
        syncWithCloud();
    }, 10000); // 10s wait for batch tasks
}

export default TriggerSync;
