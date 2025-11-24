import { createStore } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import triggerSync from "../sync-engine";

type PendingTask = {
    id: string,
    type: 'create' | 'update' | 'delete',
    payload: any,
}

export interface PendingTaskType {
    tasks: Array<PendingTask>,
    addTask: (task: PendingTask) => void,
    updateTask: (taskId: string, payload: any) => void,
    removeTask: (taskId: string) => void,
    clearTasks: () => void,
};

const usePendingTask = createStore<PendingTaskType>()(
    persist(subscribeWithSelector((set, get) => ({
        tasks: [] as Array<PendingTask>,
        addTask: (task: PendingTask) => {
            set({ tasks: [...get().tasks, task] });
            triggerSync();
        },
        updateTask: (taskId: string, payload: any) => {
            set({
                tasks: get().tasks.map((task) => task.id === taskId ? { ...task, payload } : task)
            });
            triggerSync();
        },
        removeTask: (taskId: string) => {
            set({
                tasks: get().tasks.filter(
                    (task) => task.id !== taskId
                ),
            });
            triggerSync();
        },
        clearTasks: () => set({ tasks: [] }),
    })), { name: 'pending-tasks' }));

export default usePendingTask;