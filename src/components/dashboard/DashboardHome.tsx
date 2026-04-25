import AnalyticsCard from "../ui/AnalyticsCard";
import ActivityFeed from "../ui/ActivityFeed";

export default function DashboardHome() {
  return (
    <div className="p-6 md:p-10 min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Here&apos;s what&apos;s happening with your platform today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <AnalyticsCard title="Total Interactions" value="1,248" trend="+12.5%" trendPositive={true} />
        <AnalyticsCard title="Auto-Replies Sent" value="342" trend="+5.2%" trendPositive={true} />
        <AnalyticsCard title="Conversion Rate" value="4.8%" trend="-1.1%" trendPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
          <p className="text-gray-500 font-medium">Chart Placeholder</p>
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
