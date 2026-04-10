"use client";

import { useState } from "react";
import { useTasks } from "@/lib/tasks/useTasks";
import { useTaskFilters } from "@/lib/tasks/useTaskFilters";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TaskFilters from "@/components/tasks/TaskFilters";
import Modal from "@/components/ui/Modal";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const {
    filteredTasks,
    statusFilter, setStatusFilter,
    categoryFilter, setCategoryFilter,
    sortOrder, cycleSortOrder, sortLabel,
  } = useTaskFilters(tasks);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition cursor-pointer"
        >
          + Add task
        </button>
        <button
          onClick={() => setShowFilters(true)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-gray-400 transition cursor-pointer"
        >
          Filters
        </button>
      </div>

      {showForm && (
        <Modal title="New task" onClose={() => setShowForm(false)}>
          <CreateTaskForm onSuccess={() => setShowForm(false)} />
        </Modal>
      )}

      {showFilters && (
        <Modal title="Filters & sorting" onClose={() => setShowFilters(false)}>
          <TaskFilters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sortOrder={sortOrder}
            onSortCycle={cycleSortOrder}
            sortLabel={sortLabel}
          />
        </Modal>
      )}

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
