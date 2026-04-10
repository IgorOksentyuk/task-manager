import { createClient } from "@/lib/supabase/client";
import type {
  CreateTaskInput,
  Task,
  TaskCategory,
  TaskFilter,
  UpdateTaskInput,
} from "@/types/task";

const supabase = createClient();

const PAGE_SIZE = 5;

export type FetchTasksParams = {
  page: number;
  statusFilter: TaskFilter;
  categoryFilter: TaskCategory | "all";
  sortOrder: "asc" | "desc" | "none";
  search: string;
};

export type FetchTasksResult = {
  tasks: Task[];
  totalCount: number;
  pageSize: number;
};

export async function fetchTasks({
  page,
  statusFilter,
  categoryFilter,
  sortOrder,
  search,
}: FetchTasksParams): Promise<FetchTasksResult> {
  let query = supabase.from("tasks").select("*", { count: "exact" });

  if (statusFilter === "completed") query = query.eq("completed", true);
  if (statusFilter === "incomplete") query = query.eq("completed", false);
  if (categoryFilter !== "all") query = query.eq("category", categoryFilter);
  if (search.trim()) {
    query = query.or(`title.ilike.%${search.trim()}%,description.ilike.%${search.trim()}%`);
  }

  if (sortOrder !== "none") {
    query = query.order("deadline", {
      ascending: sortOrder === "asc",
      nullsFirst: false,
    });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    tasks: data ?? [],
    totalCount: count ?? 0,
    pageSize: PAGE_SIZE,
  };
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateTask(
  id: string,
  input: UpdateTaskInput,
): Promise<Task> {
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
