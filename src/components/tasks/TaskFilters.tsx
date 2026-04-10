"use client";

import TaskFilterTabs from "@/components/tasks/TaskFilterTabs";
import TaskCategoryFilterTabs from "@/components/tasks/TaskCategoryFilterTabs";
import type { TaskCategory, TaskFilter } from "@/types/task";

type TaskFiltersProps = {
  statusFilter: TaskFilter;
  onStatusChange: (filter: TaskFilter) => void;
  categoryFilter: TaskCategory | "all";
  onCategoryChange: (category: TaskCategory | "all") => void;
  sortOrder: "asc" | "desc" | "none";
  onSortCycle: () => void;
  sortLabel: string;
};

export default function TaskFilters({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  sortOrder,
  onSortCycle,
  sortLabel,
}: TaskFiltersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-400 w-16 shrink-0">Status</span>
        <TaskFilterTabs active={statusFilter} onChange={onStatusChange} />
      </div>
      <div className="h-px bg-gray-100" />
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-400 w-16 shrink-0">Category</span>
        <TaskCategoryFilterTabs active={categoryFilter} onChange={onCategoryChange} />
      </div>
      <div className="h-px bg-gray-100" />
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-400 w-16 shrink-0">Sort</span>
        <button
          onClick={onSortCycle}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
            sortOrder !== "none"
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
          }`}
        >
          {sortLabel}
        </button>
      </div>
    </div>
  );
}
