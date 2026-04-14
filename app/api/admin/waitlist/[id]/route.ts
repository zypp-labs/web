import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { error } = await retrySupabaseQuery(() =>
      supabase
        .from("waitlist")
        .delete()
        .eq("id", id)
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}

