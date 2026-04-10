"use client";

import { TASK_FILTERS } from "@/constants/taskFilters";
import type { TaskFilter } from "@/types/task";

type TaskFilterTabsProps = {
  active: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

export default function TaskFilterTabs({ active, onChange }: TaskFilterTabsProps) {
  return (
    <div className="flex gap-2">
      {TASK_FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
            active === value
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
