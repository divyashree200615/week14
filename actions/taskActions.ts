'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabaseClient';
import { taskSchema } from '@/lib/validation';

export async function addTask(userId: string, title: string) {
  const validation = taskSchema.safeParse({ title });

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { error } = await supabase
    .from('tasks')
    .insert({ title: validation.data.title, user_id: userId });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function toggleTask(taskId: string, isCompleted: boolean) {
  const { error } = await supabase
    .from('tasks')
    .update({ is_completed: !isCompleted })
    .eq('id', taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function toggleAllTasks(userId: string, markCompleted: boolean) {
  const { error } = await supabase
    .from('tasks')
    .update({ is_completed: markCompleted })
    .eq('user_id', userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}
