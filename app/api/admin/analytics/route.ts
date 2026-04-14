import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    // Get last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get waitlist signups grouped by date
    const { data: waitlistData, error: waitlistError } = await retrySupabaseQuery(() =>
      supabase
        .from("waitlist")
        .select("created_at")
        .gte("created_at", thirtyDaysAgo.toISOString())
    );

    // Get newsletter signups grouped by date
    const { data: newsletterData, error: newsletterError } = await retrySupabaseQuery(() =>
      supabase
        .from("newsletter_subscribers")
        .select("created_at")
        .gte("created_at", thirtyDaysAgo.toISOString())
        .eq("is_active", true)
    );

    if (waitlistError || newsletterError) {
      throw waitlistError || newsletterError;
    }

    // Group by date
    const dateMap = new Map<string, { waitlist: number; newsletter: number }>();

    // Initialize last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dateMap.set(dateStr, { waitlist: 0, newsletter: 0 });
    }

    // Count waitlist
    waitlistData?.forEach((item) => {
      const dateStr = new Date(item.created_at).toISOString().split("T")[0];
      const existing = dateMap.get(dateStr) || { waitlist: 0, newsletter: 0 };
      dateMap.set(dateStr, { ...existing, waitlist: existing.waitlist + 1 });
    });

    // Count newsletter
    newsletterData?.forEach((item) => {
      const dateStr = new Date(item.created_at).toISOString().split("T")[0];
      const existing = dateMap.get(dateStr) || { waitlist: 0, newsletter: 0 };
      dateMap.set(dateStr, { ...existing, newsletter: existing.newsletter + 1 });
    });

    // Convert to array format
    const chartData = Array.from(dateMap.entries()).map(([date, counts]) => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      waitlist: counts.waitlist,
      newsletter: counts.newsletter,
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

