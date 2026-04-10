"use client";

import { TASK_CATEGORY_FILTERS } from "@/constants/taskCategories";
import type { TaskCategory } from "@/types/task";

type TaskCategoryFilterTabsProps = {
  active: TaskCategory | "all";
  onChange: (category: TaskCategory | "all") => void;
};

export default function TaskCategoryFilterTabs({ active, onChange }: TaskCategoryFilterTabsProps) {
  return (
    <div className="flex gap-2">
      {TASK_CATEGORY_FILTERS.map(({ label, value }) => (
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
