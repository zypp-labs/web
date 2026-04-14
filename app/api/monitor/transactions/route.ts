import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const relayerUrl = process.env.RELAYER_API_URL;
        const apiKey = process.env.RELAYER_API_KEY;

        if (!relayerUrl || !apiKey) {
            return NextResponse.json({ error: "Missing relayer configuration" }, { status: 500 });
        }

        // Get limit from query params, default to 20
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit") || "20";

        const response = await fetch(`${relayerUrl}/v1/ops/transactions?limit=${limit}`, {
            headers: {
                "x-relayer-api-key": apiKey,
            },
            cache: "no-store", // Always fetch latest for transactions
        });

        if (!response.ok) {
            throw new Error(`Relayer responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching transactions from relayer:", error);
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}
