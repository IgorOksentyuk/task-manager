export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
};

export type CreateTaskInput = Pick<Task, "title" | "description">;
export type UpdateTaskInput = Partial<Pick<Task, "title" | "description" | "completed">>;
