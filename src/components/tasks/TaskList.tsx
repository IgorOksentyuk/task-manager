"use client";

import { useState } from "react";
import { useTasks } from "@/lib/tasks/useTasks";
import { useTaskFilters } from "@/lib/tasks/useTaskFilters";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TaskFilters from "@/components/tasks/TaskFilters";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
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
      <div className="flex gap-3 justify-between items-center">
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="self-start px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition cursor-pointer"
          >
            {showForm ? "Cancel" : "+ Add task"}
          </button>

          {showForm && <CreateTaskForm onSuccess={() => setShowForm(false)} />}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="self-start px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-gray-400 transition cursor-pointer"
          >
            {showFilters ? "Hide filters" : "Show filters"}
          </button>

          {showFilters && (
            <TaskFilters
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              sortOrder={sortOrder}
              onSortCycle={cycleSortOrder}
              sortLabel={sortLabel}
            />
          )}
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
