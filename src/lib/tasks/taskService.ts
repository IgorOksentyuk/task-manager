import { createClient } from "@/lib/supabase/client";
import type { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";

const supabase = createClient();

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
