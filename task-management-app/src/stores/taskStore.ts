// src/stores/taskStore.ts
import create from 'zustand';

interface TaskState {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
        )
    })),
}));