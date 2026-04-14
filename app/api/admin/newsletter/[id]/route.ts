import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { is_active } = await request.json();

    const { error } = await retrySupabaseQuery(() =>
      supabase
        .from("newsletter_subscribers")
        .update({ is_active })
        .eq("id", id)
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to update subscriber" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await retrySupabaseQuery(() =>
      supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id)
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}

