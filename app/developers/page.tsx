import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import DevelopersClient from "./DevelopersClient";

export const metadata: Metadata = buildMetadata({
  title: "Developers",
  description:
    "Developer docs, SDK downloads, and example code for integrating Zypp Labs’ offline-first Solana stack.",
  path: "/developers",
  keywords: [
    "Zypp developers",
    "offline Solana SDK",
    "Zypp docs",
    "Solana offline toolkit",
  ],
});

export default function DevelopersPage() {
  return <DevelopersClient />;
}
