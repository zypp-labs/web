import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    domains: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? [new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname]
      : [],
  },
  typescript: { ignoreBuildErrors: true },
};

export default withMDX(nextConfig);
