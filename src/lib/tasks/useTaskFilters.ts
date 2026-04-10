import { useState } from "react";
import type { Task, TaskCategory, TaskFilter } from "@/types/task";

type SortOrder = "asc" | "desc" | "none";

export function useTaskFilters(tasks: Task[] | undefined) {
  const [statusFilter, setStatusFilter] = useState<TaskFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  function cycleSortOrder() {
    setSortOrder((prev) =>
      prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"
    );
  }

  const filteredTasks = tasks
    ?.filter((task) => {
      const matchesStatus =
        statusFilter === "completed" ? task.completed :
        statusFilter === "incomplete" ? !task.completed :
        true;

      return matchesStatus && (categoryFilter === "all" || task.category === categoryFilter);
    })
    .sort((a, b) => {
      if (sortOrder === "none") return 0;
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;

      const diff = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();

      return sortOrder === "asc" ? diff : -diff;
    });

  const sortLabel =
    sortOrder === "asc" ? "Deadline ↑" :
    sortOrder === "desc" ? "Deadline ↓" :
    "Sort by deadline";

  return {
    filteredTasks,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    cycleSortOrder,
    sortLabel,
  };
}
