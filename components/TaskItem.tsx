"use client";

import { supabase } from "@/lib/supabaseClient";

interface TaskItemProps {
  task: any;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const handleToggle = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_completed: !task.is_completed })
      .eq("id", task.id);

    if (!error) {
      onToggle(task.id, !task.is_completed);
    } else {
      console.error("Failed to toggle task:", error.message);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
    if (!error) {
      onDelete(task.id);
    } else {
      console.error("Failed to delete task:", error.message);
    }
  };

  return (
    <li className="flex justify-between items-center p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg hover:scale-[1.02] transition transform">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={handleToggle}
          className="w-5 h-5 accent-indigo-400"
        />
        <div>
          <p
            className={`text-white font-medium ${
              task.is_completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </p>
          <p className="text-gray-300 text-sm">{task.assignee}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.status === "Completed"
              ? "bg-green-600 text-white"
              : task.status === "In Progress"
              ? "bg-indigo-500 text-white"
              : "bg-yellow-500 text-white"
          }`}
        >
          {task.status}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.priority === "High"
              ? "bg-red-600 text-white"
              : task.priority === "Medium"
              ? "bg-yellow-400 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {task.priority}
        </span>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-400 font-bold text-lg"
        >
          ×
        </button>
      </div>
    </li>
  );
}
