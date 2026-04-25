export default function ActivityFeed() {
  const activities = [
    { id: 1, type: "Link Click", details: "User clicked Instagram link", time: "2 mins ago" },
    { id: 2, type: "Webhook", details: "Received pricing inquiry", time: "15 mins ago" },
    { id: 3, type: "Smart Trigger", details: "Auto-replied to general query", time: "1 hour ago" },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
            <div className="w-10 h-10 rounded-full bg-violet-accent/20 flex items-center justify-center shrink-0">
              <span className="text-violet-accent text-sm">⚡</span>
            </div>
            <div>
              <p className="font-medium text-white">{activity.type}</p>
              <p className="text-sm text-gray-400">{activity.details}</p>
            </div>
            <span className="ml-auto text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
