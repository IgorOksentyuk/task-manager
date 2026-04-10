"use client";

import { useState } from "react";
import { useTasks } from "@/lib/tasks/useTasks";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TaskFilterTabs from "@/components/tasks/TaskFilterTabs";
import TaskCategoryFilterTabs from "@/components/tasks/TaskCategoryFilterTabs";
import type { TaskCategory, TaskFilter } from "@/types/task";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();
  const [statusFilter, setStatusFilter] = useState<TaskFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all");

  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus =
      statusFilter === "completed" ? task.completed :
      statusFilter === "incomplete" ? !task.completed :
      true;

    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;

    return matchesStatus && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      <CreateTaskForm />

      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400 w-16 shrink-0">Status</span>
          <TaskFilterTabs active={statusFilter} onChange={setStatusFilter} />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400 w-16 shrink-0">Category</span>
          <TaskCategoryFilterTabs active={categoryFilter} onChange={setCategoryFilter} />
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
