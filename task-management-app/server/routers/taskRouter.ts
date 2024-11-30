// server/routers/taskRouter.ts
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const taskRouter = router({
    createTask: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string().optional(),
            status: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            // Task creation logic
        }),

    getTasks: publicProcedure
        .query(async ({ ctx }) => {
            // Fetch user tasks
        }),
});