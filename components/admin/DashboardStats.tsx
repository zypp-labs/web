"use client";

import { useEffect, useState } from "react";
import { Users, Mail, FileText, TrendingUp } from "lucide-react";

interface Stats {
  waitlist: number;
  newsletter: number;
  blogPosts: number;
  growth: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    waitlist: 0,
    newsletter: 0,
    blogPosts: 0,
    growth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [waitlistRes, newsletterRes, blogRes] = await Promise.all([
        fetch("/api/admin/stats/waitlist"),
        fetch("/api/admin/stats/newsletter"),
        fetch("/api/admin/stats/blog"),
      ]);

      const waitlistData = await waitlistRes.json();
      const newsletterData = await newsletterRes.json();
      const blogData = await blogRes.json();

      setStats({
        waitlist: waitlistData.count || 0,
        newsletter: newsletterData.count || 0,
        blogPosts: blogData.count || 0,
        growth: 12.5, // This would come from analytics
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Waitlist Signups",
      value: stats.waitlist,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
    },
    {
      label: "Newsletter Subscribers",
      value: stats.newsletter,
      icon: Mail,
      color: "text-green-400",
      bgColor: "bg-green-400/20",
    },
    {
      label: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
    },
    {
      label: "Growth Rate",
      value: `${stats.growth}%`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-2xl p-6 border border-white/10 animate-pulse"
          >
            <div className="h-4 bg-white/10 rounded w-24 mb-4"></div>
            <div className="h-8 bg-white/10 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <p className="text-white/60 text-sm mb-1">{stat.label}</p>
          <p className="text-3xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

