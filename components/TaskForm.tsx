"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { taskSchema } from "@/lib/validation";

interface TaskFormProps {
  userId: string;
  onTaskAdded: (task: any) => void;
}

export default function TaskForm({ userId, onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = taskSchema.safeParse({ title });

    if (!validation.success) {
      // Fixed: flatten() gives proper fieldErrors
      const flattened = validation.error.flatten();
      setError(flattened.fieldErrors.title?.[0] || "Invalid task");
      return;
    }

    setLoading(true);

    const { data, error: supabaseError } = await supabase
      .from("tasks")
      .insert({ title: validation.data.title, user_id: userId })
      .select()
      .single();

    setLoading(false);

    if (supabaseError) {
      setError(supabaseError.message);
    } else if (data) {
      onTaskAdded(data);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border p-2 rounded text-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </form>
  );
}
