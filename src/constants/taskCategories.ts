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
