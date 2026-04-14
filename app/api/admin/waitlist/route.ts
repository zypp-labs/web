import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    const { data, error } = await retrySupabaseQuery(() =>
      supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false })
    );

    if (error) throw error;

    return NextResponse.json({ entries: data || [] });
  } catch (error) {
    console.error("Waitlist fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist", entries: [] },
      { status: 500 }
    );
  }
}

