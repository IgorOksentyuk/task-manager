"use client";

import { useState } from "react";
import { useTasks } from "@/lib/tasks/useTasks";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TaskFilterTabs from "@/components/tasks/TaskFilterTabs";
import type { TaskFilter } from "@/types/task";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>("all");

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;

    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <CreateTaskForm />

      <TaskFilterTabs active={filter} onChange={setFilter} />

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
