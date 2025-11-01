"use client";

import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: any[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (!tasks.length)
    return (
      <p className="text-center text-gray-400 mt-8 text-lg font-medium">
        No tasks yet! 🎉
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
