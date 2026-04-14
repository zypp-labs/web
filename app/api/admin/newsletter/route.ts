import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    const { data, error } = await retrySupabaseQuery(() =>
      supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false })
    );

    if (error) throw error;

    return NextResponse.json({ subscribers: data || [] });
  } catch (error) {
    console.error("Newsletter fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers", subscribers: [] },
      { status: 500 }
    );
  }
}

