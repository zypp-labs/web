import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Allow Supabase Storage images
    domains: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? [new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname]
      : [],
  },
  "typescript": {
    ignoreBuildErrors: true
  },
};

export default nextConfig;
