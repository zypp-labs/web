import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zypp Pay — Live Build",
  description: "Download the latest version of Zypp Pay. Updated in real time.",
  openGraph: {
    title: "Zypp Pay — Live Build",
    description: "Download the latest version of Zypp Pay. Updated in real time.",
    type: "website",
    url: "https://pay.zypp.fun/live",
  },
};

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

