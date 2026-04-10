import type { TaskFilter } from "@/types/task";

export const TASK_FILTERS: { label: string; value: TaskFilter }[] = [
  { label: "All", value: "all" },
  { label: "Incomplete", value: "incomplete" },
  { label: "Completed", value: "completed" },
];
