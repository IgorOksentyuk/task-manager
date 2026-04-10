"use client";

import { useUpdateTask, useDeleteTask } from "@/lib/tasks/useTasks";
import type { Task } from "@/types/task";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  function toggleComplete() {
    updateTask.mutate({ id: task.id, input: { completed: !task.completed } });
  }

  function handleDelete() {
    deleteTask.mutate(task.id);
  }

  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
        className="mt-0.5 w-4 h-4 accent-gray-900 cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium text-gray-900 ${task.completed ? "line-through text-gray-400" : ""}`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
        )}
        <div className="flex items-center justify-between gap-2 mt-1.5">
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 capitalize">
            {task.category}
          </span>
          {task.deadline && (
            <span className="text-xs text-gray-400">
              Due {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={deleteTask.isPending}
        className="text-gray-400 hover:text-red-500 disabled:opacity-50 transition cursor-pointer text-sm"
      >
        Delete
      </button>
    </div>
  );
}
