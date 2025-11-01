"use client";

import { supabase } from "@/lib/supabaseClient";

interface ToggleAllButtonProps {
  tasks: any[];
  userId: string;
  onToggleAll: (completed: boolean) => void;
}

export default function ToggleAllButton({ tasks, userId, onToggleAll }: ToggleAllButtonProps) {
  const handleToggleAll = async () => {
    const markCompleted = !tasks.every((t) => t.is_completed);

    const { error } = await supabase
      .from("tasks")
      .update({ is_completed: markCompleted })
      .eq("user_id", userId);

    if (!error) onToggleAll(markCompleted);
  };

  return (
    <button
      onClick={handleToggleAll}
      className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 mb-4"
    >
      {tasks.every((t) => t.is_completed) ? "Unmark All" : "Mark All Completed"}
    </button>
  );
}
