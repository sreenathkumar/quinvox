import syncDatabase from "@/actions/syncDB";
import usePendingTask from "./stores/pending-task-store";
import { toast } from "@/hooks/use-toast";

function syncWithCloud() {
    const { tasks, removeTask } = usePendingTask.getState()

    if (tasks.length == 0) return;

    tasks.forEach(async (task: { id: string, type: string, payload: any }) => {
        try {
            //update database
            const res = await syncDatabase(task);

            if (res.success) {
                toast({
                    title: "Sync Successful",
                    description: res.message,
                });
                //on success remove task from queue
                removeTask(task.id);
            }

        } catch (error) {
            toast({
                title: "Sync Failed",
                description: `Failed to sync task ${task.id}: ${(error as Error).message}`,
                variant: "destructive",
            });
        }
    })
}

export default syncWithCloud;