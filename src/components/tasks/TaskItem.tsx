"use client";

import { useUpdateTask, useDeleteTask } from "@/lib/tasks/useTasks";
import { TASK_CATEGORY_COLORS } from "@/constants/taskCategories";
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
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-xl transition hover:cursor-pointer ${task.completed ? "opacity-50" : "hover:scale-[1.01] hover:shadow-sm"}`}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          className="mt-0.5 w-6 h-6 accent-gray-900 cursor-pointer rounded-full"
        />

        <div className="flex flex-col gap-2">
          <p
            className={`text-sm font-medium text-gray-900 ${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={handleDelete}
          disabled={deleteTask.isPending}
          className="text-gray-400 hover:text-red-500 disabled:opacity-50 transition cursor-pointer text-sm"
        >
          Delete
        </button>

        <div className="flex flex-col items-end justify-between gap-1 mt-1.5">
          {task.deadline && (
            <span className="text-xs text-gray-400">
              Due {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${TASK_CATEGORY_COLORS[task.category]}`}
          >
            {task.category}
          </span>
        </div>
      </div>
    </div>
  );
}
