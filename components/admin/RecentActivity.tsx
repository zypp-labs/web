"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Mail, User, FileText } from "lucide-react";

interface Activity {
  id: string;
  type: "waitlist" | "newsletter" | "blog";
  action: string;
  timestamp: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/admin/activity");
      const data = await res.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "waitlist":
        return User;
      case "newsletter":
        return Mail;
      case "blog":
        return FileText;
      default:
        return FileText;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "waitlist":
        return "text-blue-400 bg-blue-400/20";
      case "newsletter":
        return "text-green-400 bg-green-400/20";
      case "blog":
        return "text-purple-400 bg-purple-400/20";
      default:
        return "text-white/40 bg-white/5";
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-white/60 text-center py-8">No recent activity</p>
        ) : (
          activities.map((activity) => {
            const Icon = getIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${getColor(activity.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-white/40 text-xs">
                    {formatDistanceToNow(new Date(activity.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

