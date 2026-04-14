import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    const result = await retrySupabaseQuery(() =>
      supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true)
    );

    if (result.error) throw result.error;

    return NextResponse.json({ count: result.count || 0 });
  } catch (error) {
    console.error("Newsletter stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter stats", count: 0 },
      { status: 500 }
    );
  }
}

