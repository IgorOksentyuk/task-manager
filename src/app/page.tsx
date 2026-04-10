import TaskList from "@/components/tasks/TaskList";
import { logout } from "@/app/auth/actions";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Task Manager</h1>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-gray-900 transition cursor-pointer"
          >
            Sign out
          </button>
        </form>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <TaskList />
      </main>
    </div>
  );
}
