"use client";

import { useTasks } from "@/lib/tasks/useTasks";
import { useTaskFilters } from "@/lib/tasks/useTaskFilters";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TaskFilterTabs from "@/components/tasks/TaskFilterTabs";
import TaskCategoryFilterTabs from "@/components/tasks/TaskCategoryFilterTabs";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();
  const {
    filteredTasks,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    cycleSortOrder,
    sortLabel,
  } = useTaskFilters(tasks);

  return (
    <div className="flex flex-col gap-6">
      <CreateTaskForm />

      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400 w-16 shrink-0">
            Status
          </span>
          <TaskFilterTabs active={statusFilter} onChange={setStatusFilter} />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400 w-16 shrink-0">
            Category
          </span>
          <TaskCategoryFilterTabs
            active={categoryFilter}
            onChange={setCategoryFilter}
          />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400 w-16 shrink-0">
            Sort
          </span>
          <button
            onClick={cycleSortOrder}
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

      {isLoading && <p className="text-sm text-gray-500">Loading tasks...</p>}
      {isError && <p className="text-sm text-red-500">Failed to load tasks.</p>}

      {filteredTasks && filteredTasks.length === 0 && (
        <p className="text-sm text-gray-400">No tasks found.</p>
      )}

      {filteredTasks && filteredTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
