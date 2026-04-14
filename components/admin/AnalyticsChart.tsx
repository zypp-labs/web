"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  waitlist: number;
  newsletter: number;
}

export function AnalyticsChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      const chartData = await res.json();
      setData(chartData || []);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 animate-pulse">
        <div className="h-6 bg-white/10 rounded w-32 mb-4"></div>
        <div className="h-64 bg-white/10 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold mb-6">Growth Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="waitlist"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Waitlist"
          />
          <Line
            type="monotone"
            dataKey="newsletter"
            stroke="#10b981"
            strokeWidth={2}
            name="Newsletter"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

