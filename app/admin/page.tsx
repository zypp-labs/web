import { redirect } from "next/navigation";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";

export default async function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome to the Zypp Admin Panel</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart />
        <RecentActivity />
      </div>
    </div>
  );
}
