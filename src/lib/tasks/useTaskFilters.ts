import { useState } from "react";
import type { TaskCategory, TaskFilter } from "@/types/task";

type SortOrder = "asc" | "desc" | "none";

export function useTaskFilters() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  function cycleSortOrder() {
    setSortOrder((prev) =>
      prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"
    );
    setPage(1);
  }

  function handleStatusChange(filter: TaskFilter) {
    setStatusFilter(filter);
    setPage(1);
  }

  function handleCategoryChange(category: TaskCategory | "all") {
    setCategoryFilter(category);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  const sortLabel =
    sortOrder === "asc" ? "Deadline ↑" :
    sortOrder === "desc" ? "Deadline ↓" :
    "Sort by deadline";

  return {
    page,
    setPage,
    search,
    setSearch: handleSearchChange,
    statusFilter,
    setStatusFilter: handleStatusChange,
    categoryFilter,
    setCategoryFilter: handleCategoryChange,
    sortOrder,
    cycleSortOrder,
    sortLabel,
  };
}
