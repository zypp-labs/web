import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import fractal from "@/assets/fractal.svg";
import coinHero from "@/assets/coin-hero.svg";
import { buildMetadata, siteMetadata } from "@/lib/seo";

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  // weight: ["400", "500", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const mono = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteMetadata.name,
  url: siteMetadata.url,
  logo: siteMetadata.logo,
  image: siteMetadata.logo,
  sameAs: [
    "https://x.com/use_zypp",
    "https://github.com/zypp-labs",
    "https://www.linkedin.com/company/zypp-protocol/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: siteMetadata.contactEmail,
      contactType: "customer support",
      availableLanguage: ["English"],
    },
  ],
};

export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: new URL(siteMetadata.url),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
  },
  authors: [{ name: siteMetadata.name, url: siteMetadata.url }],
  publisher: siteMetadata.name,
  creator: siteMetadata.name,
  category: "Blockchain",
  applicationName: siteMetadata.name,
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={fractal.src}
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href={coinHero.src}
          as="image"
          type="image/svg+xml"
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
