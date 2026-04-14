import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    // Get recent waitlist signups
    const { data: waitlist, error: waitlistError } = await retrySupabaseQuery(async () =>
      await supabase
        .from("waitlist")
        .select("id, email, created_at")
        .order("created_at", { ascending: false })
        .limit(5)
    );

    // Get recent newsletter signups
    const { data: newsletter, error: newsletterError } = await retrySupabaseQuery(async () =>
      supabase
        .from("newsletter_subscribers")
        .select("id, email, created_at")
        .order("created_at", { ascending: false })
        .limit(5)
    );

    // Get recent blog posts
    const { data: blogPosts, error: blogError } = await retrySupabaseQuery(async () =>
      await supabase
        .from("blog_posts")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(5)
    );

    if (waitlistError || newsletterError || blogError) {
      throw waitlistError || newsletterError || blogError;
    }

    // Combine and format activities
    const activities = [
      ...(waitlist?.map((item) => ({
        id: item.id,
        type: "waitlist" as const,
        action: `New waitlist signup: ${item.email}`,
        timestamp: item.created_at,
      })) || []),
      ...(newsletter?.map((item) => ({
        id: item.id,
        type: "newsletter" as const,
        action: `New newsletter subscriber: ${item.email}`,
        timestamp: item.created_at,
      })) || []),
      ...(blogPosts?.map((item) => ({
        id: item.id,
        type: "blog" as const,
        action: `New blog post: ${item.title}`,
        timestamp: item.created_at,
      })) || []),
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Activity fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

