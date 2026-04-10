import type { TaskCategory, TaskFilter } from "@/types/task";

export const queryKeys = {
  tasks: (params: {
    page: number;
    statusFilter: TaskFilter;
    categoryFilter: TaskCategory | "all";
    sortOrder: "asc" | "desc" | "none";
  }) => ["tasks", params] as const,
};
