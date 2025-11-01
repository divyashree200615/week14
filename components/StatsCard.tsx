interface StatsCardProps {
  title: string;
  value: number;
  total?: number;
  color?: string;
  gradient?: string;
   suffix?: string;
    // Tailwind background color class
}

export default function StatsCard({ title, value, total, color }: StatsCardProps) {
  const percentage = total ? Math.round((value / total) * 100) : undefined;

  return (
    <div className={`p-4 rounded-lg shadow-md ${color || "bg-gray-700"}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">
        {value} {total && `/${total}`} {percentage !== undefined && `(${percentage}%)`}
      </p>
    </div>
  );
}
