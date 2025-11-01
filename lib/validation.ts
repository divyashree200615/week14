import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  completed: z.boolean().optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;
