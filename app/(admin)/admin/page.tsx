export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your photography admin panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards for stats */}
        {[
          { label: "Total Projects", value: "24", icon: "📸" },
          { label: "Total Frames", value: "12", icon: "🖼️" },
          { label: "Pending Bookings", value: "5", icon: "📅" },
          { label: "Sales (Monthly)", value: "$1,240", icon: "💰" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">{stat.label}</h3>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
        <div className="mt-4 text-sm text-muted-foreground">
          No recent activity to show.
        </div>
      </div>
    </div>
  );
}
