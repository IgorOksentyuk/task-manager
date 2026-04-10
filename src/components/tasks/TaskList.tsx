"use client";

import { useTasks } from "@/lib/tasks/useTasks";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();

  return (
    <div className="flex flex-col gap-6">
      <CreateTaskForm />

      {isLoading && <p className="text-sm text-gray-500">Loading tasks...</p>}

      {isError && <p className="text-sm text-red-500">Failed to load tasks.</p>}

      {tasks && tasks.length === 0 && (
        <p className="text-sm text-gray-400">No tasks yet. Add one above.</p>
      )}

      {tasks && tasks.length > 0 && (
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
