import { NextResponse } from "next/server";

export async function GET() {
  try {
    const relayerUrl = process.env.RELAYER_API_URL;
    const apiKey = process.env.RELAYER_API_KEY;

    if (!relayerUrl || !apiKey) {
      return NextResponse.json({ error: "Missing relayer configuration" }, { status: 500 });
    }

    const response = await fetch(`${relayerUrl}/v1/ops/metrics`, {
      headers: {
        "x-relayer-api-key": apiKey,
      },
      next: { revalidate: 2 }, // Cache for 2 seconds
    });

    if (!response.ok) {
      throw new Error(`Relayer responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching metrics from relayer:", error);
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
