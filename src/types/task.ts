export type TaskCategory = "work" | "entertainment" | "household";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  category: TaskCategory;
  deadline: string | null;
  created_at: string;
};

export type CreateTaskInput = Pick<Task, "title" | "description" | "category" | "deadline">;
export type UpdateTaskInput = Partial<Pick<Task, "title" | "description" | "completed" | "category" | "deadline">>;

export type TaskFilter = "all" | "incomplete" | "completed";
