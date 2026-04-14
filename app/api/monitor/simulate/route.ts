import { NextResponse } from "next/server";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { createHash } from "node:crypto";

const INTENT_DOMAIN = "zypp-pay:v1:intent";

function hashHex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function signIntentId(id: string, kp: Keypair): string {
  const digest = createHash("sha256").update(`${INTENT_DOMAIN}:${id}`).digest();
  const signature = nacl.sign.detached(new Uint8Array(digest), kp.secretKey);
  return Buffer.from(signature).toString("base64");
}

export async function POST() {
  try {
    const relayerUrl = process.env.RELAYER_API_URL;
    const apiKey = process.env.RELAYER_API_KEY;

    if (!relayerUrl || !apiKey) {
      return NextResponse.json({ error: "Missing relayer configuration" }, { status: 500 });
    }

    const kp = Keypair.generate();
    const intent = {
      sender: kp.publicKey.toBase58(),
      receiver: Keypair.generate().publicKey.toBase58(),
      amount: 10,
      fee: 0.1,
      total: 10.1,
      nonce: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      timestamp: Date.now(),
      type: "TRANSFER",
      metadata: {
        v: 1 as const,
        app: "zypp-pay" as const,
        network: "devnet" as const,
        chain: "solana" as const,
        hw: Keypair.generate().publicKey.toBase58(),
      },
    };
    const id = hashHex(
      JSON.stringify({
        s: intent.sender,
        r: intent.receiver,
        a: intent.amount,
        f: intent.fee,
        t: intent.total,
        n: intent.nonce,
        ts: intent.timestamp,
      })
    );
    const signature = signIntentId(id, kp);
    const payloadBase64 = Buffer.from(
      JSON.stringify({
        intent: { ...intent, id, signature },
      })
    ).toString("base64");

    const response = await fetch(`${relayerUrl}/v1/intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-relayer-api-key": apiKey,
      },
      body: JSON.stringify({ payload: payloadBase64 }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Relayer simulate error:", errorText);
      throw new Error(`Relayer responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error simulating transaction:", error);
    return NextResponse.json({ error: "Failed to simulate transaction" }, { status: 500 });
  }
}
