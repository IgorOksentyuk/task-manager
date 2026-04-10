import type { TaskCategory } from "@/types/task";

export const TASK_CATEGORIES: { label: string; value: TaskCategory }[] = [
  { label: "Work", value: "work" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Household", value: "household" },
];

export const TASK_CATEGORY_FILTERS: { label: string; value: TaskCategory | "all" }[] = [
  { label: "All", value: "all" },
  ...TASK_CATEGORIES,
];

export const TASK_CATEGORY_COLORS: Record<TaskCategory, string> = {
  work: "bg-blue-100 text-blue-700",
  entertainment: "bg-orange-100 text-orange-700",
  household: "bg-green-100 text-green-700",
};
