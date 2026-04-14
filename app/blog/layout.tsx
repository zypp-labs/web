import type { Metadata } from "next";
import "../globals.css";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Insights, launch updates, and thought leadership from the Zypp Labs team on building offline-first payments on Solana.",
  path: "/blog",
  keywords: [
    "Zypp blog",
    "Solana research",
    "offline crypto payments",
    "developer updates",
  ],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
