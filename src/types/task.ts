export type TaskCategory = "work" | "entertainment" | "household";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  category: TaskCategory;
  created_at: string;
};

export type CreateTaskInput = Pick<Task, "title" | "description" | "category">;
export type UpdateTaskInput = Partial<Pick<Task, "title" | "description" | "completed" | "category">>;

export type TaskFilter = "all" | "incomplete" | "completed";
