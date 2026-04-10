"use client";

import { useCreateTask } from "@/lib/tasks/useTasks";
import { useState } from "react";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createTask = useCreateTask();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    createTask.mutate(
      { title: title.trim(), description: description.trim() || null },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-xl">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
      />
      <button
        type="submit"
        disabled={createTask.isPending || !title.trim()}
        className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition cursor-pointer"
      >
        {createTask.isPending ? "Adding..." : "Add task"}
      </button>
    </form>
  );
}
