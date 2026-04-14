import type { Metadata } from "next";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://zypp.fun";

export const siteMetadata = {
  name: "Zypp Labs",
  tagline: "Offline-First Payment Infrastructure Research",
  description:
    "Zypp Labs is a research-driven infrastructure company building offline-first payment systems on Solana. We remove connectivity as a hard dependency for transaction creation and settlement, enabling resilient financial infrastructure for real-world network conditions.",
  url: rawSiteUrl,
  twitter: "@use_zypp",
  ogImage: `${rawSiteUrl}/og.png`,
  logo: `${rawSiteUrl}/apple-touch-icon.png`,
  contactEmail: "hello@zypp.fun",
  keywords: [
    "Zypp Labs",
    "offline-first payments",
    "Solana infrastructure",
    "asynchronous settlement",
    "TOSS stack",
    "Zypp Relayer Network",
    "ZRN",
    "offline crypto",
    "resilient blockchain",
    "Solana payments",
  ],
} as const;

export const absoluteUrl = (path = "/") => {
  if (!path) return siteMetadata.url;
  if (path.startsWith("http")) return path;
  return `${siteMetadata.url}${path.startsWith("/") ? path : `/${path}`}`;
};

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string | Date | null;
  updatedTime?: string | Date | null;
  canonical?: string;
};

const isoStringOrUndefined = (value?: string | Date | null) => {
  if (!value) return undefined;
  return new Date(value).toISOString();
};

export const buildMetadata = (args: BuildMetadataArgs = {}): Metadata => {
  const {
    title,
    description,
    path = "/",
    image,
    keywords = [],
    type = "website",
    publishedTime,
    updatedTime,
    canonical,
  } = args;

  const pageUrl = absoluteUrl(path);
  const canonicalUrl = canonical ? absoluteUrl(canonical) : pageUrl;
  const imageUrl = absoluteUrl(image ?? siteMetadata.ogImage);
  const resolvedTitle = title
    ? `${title} | ${siteMetadata.name}`
    : `${siteMetadata.name} – ${siteMetadata.tagline}`;
  const resolvedDescription = description ?? siteMetadata.description;
  const keywordSet = Array.from(
    new Set([...(siteMetadata.keywords ?? []), ...keywords])
  );

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
      },
    },
    keywords: keywordSet,
    openGraph: {
      type,
      url: canonicalUrl,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteMetadata.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
      ...(type === "article"
        ? {
          publishedTime: isoStringOrUndefined(publishedTime),
          modifiedTime: isoStringOrUndefined(updatedTime ?? publishedTime),
        }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl],
      creator: siteMetadata.twitter,
    },
  } satisfies Metadata;
};
