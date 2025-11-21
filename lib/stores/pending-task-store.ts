import { createStore } from "zustand";
import { persist } from "zustand/middleware";

type PendingTask = {
    id: string,
    type: 'create' | 'update' | 'delete',
    payload: any,
}

export interface PendingTaskType {
    tasks: Array<PendingTask>,
    addTask: (task: PendingTask) => void,
    removeTask: (taskId: string) => void,
    clearTasks: () => void,
}; 

const usePendingTask = createStore<PendingTaskType>()(
    persist((set, get) => ({
        tasks: [] as Array<PendingTask>,
        addTask: (task: PendingTask) =>
            set({ tasks: [task, ...get().tasks] }),
        removeTask: (taskId: string) =>
            set({
                tasks: get().tasks.filter(
                    (task) => task.id !== taskId
                ),
            }),
        clearTasks: () => set({ tasks: [] }),
    }), { name: 'pending-tasks' }));

export default usePendingTask;