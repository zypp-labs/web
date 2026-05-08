import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

type Platform = "android" | "ios";
const TABLE = "pay_live_builds";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isTruthy(v: unknown) {
  if (typeof v !== "string") return Boolean(v);
  return ["true", "1", "yes", "on"].includes(v.toLowerCase());
}

function getIsoDate(value: string | null | undefined) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const platform = (formData.get("platform") as Platform) || "android";
    if (platform !== "android" && platform !== "ios") {
      return NextResponse.json(
        { error: "Invalid platform" },
        { status: 400 }
      );
    }

    const build_name = (formData.get("build_name") as string)?.trim();
    if (!build_name) {
      return NextResponse.json(
        { error: "Build name is required" },
        { status: 400 }
      );
    }

    const release_date_iso =
      getIsoDate(formData.get("release_date") as string | null) ?? new Date().toISOString();

    const is_latest = isTruthy(formData.get("is_latest"));

    const release_notes = (formData.get("release_notes") as string)?.trim() || null;
    const important_notes =
      (formData.get("important_notes") as string)?.trim() || null;
    const checksum = (formData.get("checksum") as string)?.trim() || null;

    const android_url_input = (formData.get("android_url") as string)?.trim() || null;
    const ios_url_input = (formData.get("ios_url") as string)?.trim() || null;
    const ios_channel_input = (formData.get("ios_channel") as "testflight" | "expo" | null) ?? null;

    // Upload bucket for Android APKs (public read URLs).
    const bucket =
      (process.env.PAY_LIVE_BINARIES_BUCKET as string | undefined) || "pay-live-builds";

    let url: string | null = null;
    let ios_channel: "testflight" | "expo" | null = null;

    const file = formData.get("file") as File | null;

    // Use admin client for inserts/updates + storage.
    const client = supabaseAdmin ?? supabase;
    if (!client) {
      return NextResponse.json(
        { error: "Supabase admin client is not configured" },
        { status: 500 }
      );
    }

    if (platform === "android") {
      const androidFile = file ?? null;

      if (androidFile) {
        // Only allow APK uploads for the Android platform.
        const allowedTypes = ["application/vnd.android.package-archive", "application/octet-stream"];
        const allowedExt = androidFile.name.toLowerCase().endsWith(".apk");
        const allowed = allowedTypes.includes(androidFile.type) || allowedExt;
        if (!allowed) {
          return NextResponse.json(
            { error: "Invalid file type. Upload an APK." },
            { status: 400 }
          );
        }

        const maxSize = 200 * 1024 * 1024; // 200MB
        if (androidFile.size > maxSize) {
          return NextResponse.json(
            { error: "APK is too large (max 200MB)." },
            { status: 400 }
          );
        }

        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const ext = androidFile.name.split(".").pop() || "apk";
        const storagePath = `android/${timestamp}-${randomString}.${ext}`;

        const arrayBuffer = await androidFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await retrySupabaseQuery(() =>
          client.storage
            .from(bucket)
            .upload(storagePath, buffer, {
              contentType: androidFile.type || "application/vnd.android.package-archive",
              upsert: false,
            })
        );

        if (uploadError) throw uploadError;

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl) {
          return NextResponse.json(
            { error: "Missing NEXT_PUBLIC_SUPABASE_URL" },
            { status: 500 }
          );
        }

        url = `${supabaseUrl}/storage/v1/object/public/${bucket}/${storagePath}`;
      } else if (android_url_input) {
        url = android_url_input;
      }

      if (!url) {
        return NextResponse.json(
          { error: "Provide an APK file or an Android APK URL." },
          { status: 400 }
        );
      }
    }

    if (platform === "ios") {
      if (!ios_url_input) {
        return NextResponse.json(
          { error: "Provide the TestFlight/Expo URL for iOS." },
          { status: 400 }
        );
      }

      if (ios_channel_input !== "testflight" && ios_channel_input !== "expo") {
        return NextResponse.json(
          { error: "iOS provider must be 'testflight' or 'expo'." },
          { status: 400 }
        );
      }

      url = ios_url_input;
      ios_channel = ios_channel_input;
    }

    if (!url) {
      return NextResponse.json(
        { error: "Missing download URL." },
        { status: 400 }
      );
    }

    if (is_latest) {
      // Enforce "only one latest per platform" in a simple two-step manner.
      // Supabase doesn't provide cross-row transaction guarantees here, but this matches
      // the expected admin usage pattern (low write concurrency).
      const { error: latestOffError } = await retrySupabaseQuery(() =>
        client.from(TABLE).update({ is_latest: false }).eq("platform", platform)
      );
      if (latestOffError) throw latestOffError;
    }

    const { data, error } = await retrySupabaseQuery(() =>
      client
        .from(TABLE)
        .insert([
          {
            platform,
            build_name,
            release_date: release_date_iso,
            url,
            ios_channel,
            checksum,
            release_notes,
            important_notes,
            is_latest,
          },
        ])
        .select()
        .single()
    );

    if (error) throw error;

    return NextResponse.json({ success: true, build: data }, { status: 201 });
  } catch (error) {
    console.error("Pay live build create error:", error);
    return NextResponse.json(
      { error: "Failed to add live build" },
      { status: 500 }
    );
  }
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

    return NextResponse.json({ builds: data || [] });
  } catch (error) {
    console.error("Pay live builds admin fetch error:", error);
    return NextResponse.json({ builds: [], error: "Failed to load builds" }, { status: 500 });
  }
}

