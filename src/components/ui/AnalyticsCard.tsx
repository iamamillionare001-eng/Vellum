interface AnalyticsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
}

export default function AnalyticsCard({ title, value, trend, trendPositive }: AnalyticsCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-semibold text-white">{value}</p>
        {trend && (
          <span className={`text-sm font-medium ${trendPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
