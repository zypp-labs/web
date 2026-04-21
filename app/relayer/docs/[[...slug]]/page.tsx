import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { relayerSource } from "@/lib/relayer-source";
import type { InferPageType } from "fumadocs-core/source";

type Page = InferPageType<typeof relayerSource>;

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = relayerSource.getPage(slug) as Page | undefined;
  if (!page) notFound();

  const { body: MDX, toc } = page.data as unknown as {
    body: React.ComponentType<{ components?: Record<string, unknown> }>;
    toc: { depth: number; url: string; title: string }[];
    full?: boolean;
  };

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className="font-medium tracking-tight font-mono">
        <MDX components={defaultMdxComponents as Record<string, unknown>} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return relayerSource.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = relayerSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
