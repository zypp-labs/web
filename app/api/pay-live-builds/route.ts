import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

type Platform = "android" | "ios";

const TABLE = "pay_live_builds";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PayLiveBuildRow = {
  id: string;
  platform: Platform;
  build_name: string;
  release_date: string;
  url: string;
  ios_channel: "testflight" | "expo" | null;
  checksum: string | null;
  release_notes: string | null;
  important_notes: string | null;
  is_latest: boolean | null;
};

function pickLatest(platformBuilds: PayLiveBuildRow[]): PayLiveBuildRow | null {
  const byLatestFlag = platformBuilds.find((b) => b.is_latest);
  return byLatestFlag ?? platformBuilds[0] ?? null;
}

export async function GET() {
  try {
    const client = supabaseAdmin ?? supabase;

    const { data, error } = await retrySupabaseQuery(() =>
      client
        .from(TABLE)
        .select(
          "id,platform,build_name,release_date,url,ios_channel,checksum,release_notes,important_notes,is_latest"
        )
        .order("release_date", { ascending: false })
    );

    if (error) throw error;

    const builds = (data || []) as PayLiveBuildRow[];
    const androidBuilds = builds.filter((b) => b.platform === "android");
    const iosBuilds = builds.filter((b) => b.platform === "ios");

    const latestAndroid = pickLatest(androidBuilds);
    const latestIos = pickLatest(iosBuilds);

    const previousAndroid = androidBuilds.filter(
      (b) => latestAndroid ? b.id !== latestAndroid.id : true
    );
    const previousIos = iosBuilds.filter(
      (b) => latestIos ? b.id !== latestIos.id : true
    );

    return NextResponse.json({
      android: { latest: latestAndroid, previous: previousAndroid },
      ios: { latest: latestIos, previous: previousIos },
    });
  } catch (error) {
    console.error("Pay live builds fetch error:", error);
    return NextResponse.json(
      {
        android: { latest: null, previous: [] },
        ios: { latest: null, previous: [] },
        error: "Failed to load live builds",
      },
      { status: 500 }
    );
  }
}

