import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { data: publications, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching publications:", error);
      // Return a 200 with empty array if the table doesn't exist yet, to prevent frontend crash
      if (error.code === '42P01') {
        return NextResponse.json({ publications: [] });
      }
      throw error;
    }

    return NextResponse.json({
      publications: publications || [],
    });
  } catch (error) {
    console.error("Publications fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 }
    );
  }
}
