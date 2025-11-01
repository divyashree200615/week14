"use client";

interface TaskProgressProps {
  tasks: any[];
}

export default function TaskProgress({ tasks }: TaskProgressProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.is_completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-4">
      <p className="mb-1 text-gray-300">
        Progress: {completed}/{total} tasks completed
      </p>
      <div className="w-full bg-gray-700 rounded h-4 overflow-hidden">
        <div
          className="bg-green-500 h-4 transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
