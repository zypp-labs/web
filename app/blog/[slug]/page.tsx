import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Spotlight } from "@/components/custom/spotlight";
import {
  Clock,
  ArrowUpRight,
  BookOpen,
  Tag,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { CopyLinkButton } from "@/components/custom/copy-link-button";
import { SafeImage } from "@/components/custom/safe-image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  published_at: string;
  read_time_minutes: number;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string | null;
  author: {
    name: string;
    avatar_url: string;
    bio: string;
    social_links: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    } | null;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
}

// Helper function to fetch blog post with retry logic
async function getBlogPost(
  slug: string,
  retries = 2
): Promise<BlogPost | null> {
  console.log("Fetching blog post with slug:", slug);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const { data: post, error } = await supabase
        .from("blog_posts")
        .select(
          `
          *,
          blog_categories(name, slug),
          blog_authors(name, avatar_url, bio, social_links),
          blog_post_tags(blog_tags(name, slug))
        `
        )
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        // If it's a network error and we have retries left, try again
        if (
          attempt < retries &&
          (error.message?.includes("fetch") ||
            error.message?.includes("network"))
        ) {
          console.warn(
            `Attempt ${attempt + 1} failed, retrying...`,
            error.message
          );
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (attempt + 1))
          ); // Exponential backoff
          continue;
        }
        console.error("Error fetching blog post:", error);
        return null;
      }

      if (!post) {
        console.log("No post found with slug:", slug);
        return null;
      }

      console.log("Found post:", post.title);

      return {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        published_at: post.published_at,
        read_time_minutes: post.read_time_minutes,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        canonical_url: post.canonical_url,
        author: post.blog_authors
          ? {
              name: post.blog_authors.name,
              avatar_url: post.blog_authors.avatar_url || null,
              bio: post.blog_authors.bio || "No bio available",
              social_links: post.blog_authors.social_links,
            }
          : {
              name: "Anonymous",
              avatar_url: null,
              bio: "No bio available",
              social_links: null,
            },
        category: post.blog_categories
          ? {
              name: post.blog_categories.name,
              slug: post.blog_categories.slug,
            }
          : {
              name: "Uncategorized",
              slug: "uncategorized",
            },
        tags:
          post.blog_post_tags
            ?.map(
              (pt: { blog_tags: { name: string; slug: string } | null }) =>
                pt.blog_tags
            )
            .filter(Boolean) || [],
      };
    } catch (err) {
      // If it's a network error and we have retries left, try again
      if (attempt < retries) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (
          errorMessage.includes("fetch") ||
          errorMessage.includes("network")
        ) {
          console.warn(
            `Attempt ${attempt + 1} failed with network error, retrying...`,
            errorMessage
          );
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (attempt + 1))
          );
          continue;
        }
      }
      console.error("Error fetching blog post:", err);
      return null;
    }
  }

  // If all retries failed
  console.error("Failed to fetch blog post after all retries");
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    path: `/blog/${slug}`,
    image: post.featured_image,
    type: "article",
    publishedTime: post.published_at,
    updatedTime: post.published_at,
    keywords: post.tags?.map((tag) => tag.name) || [],
    canonical: post.canonical_url || undefined,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Rendering blog detail page for slug:", slug);

  const post = await getBlogPost(slug);

  if (!post) {
    console.log("Post not found, returning 404");
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareUrl = `https://zypp.fun/blog/${slug}`;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      <NavBar />
      <Spotlight />

      {/* Back Navigation */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
              {post.category.name}
            </span>
            <span className="text-white/50 text-sm">
              {formatDate(post.published_at)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-t border-b border-white/10">
            <div className="flex items-center gap-4">
              {/* Author Avatar */}
              <div className="w-12 h-12 bg-linear-to-br from-primary/20 to-emerald-500/20 rounded-full overflow-hidden">
                <SafeImage
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-white/60 text-sm">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {post.read_time_minutes} min read
                </span>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-sm">Share:</span>
                <div className="flex gap-2">
                  <a
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-twitter/20 hover:text-twitter transition-all duration-300"
                  >
                    <Twitter className="w-3 h-3" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-linkedin/20 hover:text-linkedin transition-all duration-300"
                  >
                    <Linkedin className="w-3 h-3" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-facebook/20 hover:text-facebook transition-all duration-300"
                  >
                    <Facebook className="w-3 h-3" />
                  </a>
                  <CopyLinkButton url={shareUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden">
            <SafeImage
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover rounded-3xl"
              priority
              fallbackIcon={<BookOpen className="w-16 h-16 text-primary/50" />}
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="blog-content tracking-tighter">
            <div
              className="blog-content-inner tracking-tighter"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-4 py-2 bg-white/5 rounded-full text-white/70 text-sm hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-pointer"
                  >
                    <Tag className="w-3 h-3 inline mr-2" />
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-8 bg-black/5 rounded-3xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-linear-to-br from-primary/20 to-emerald-500/20 rounded-full overflow-hidden">
                  <SafeImage
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  About {post.author.name}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {post.author.bio}
                </p>
                {post.author.social_links && (
                  <div className="flex gap-3 mt-4">
                    {post.author.social_links.twitter && (
                      <a
                        href={post.author.social_links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                      >
                        <Twitter className="w-3 h-3" />
                      </a>
                    )}
                    {post.author.social_links.linkedin && (
                      <a
                        href={post.author.social_links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                      >
                        <Linkedin className="w-3 h-3" />
                      </a>
                    )}
                    {post.author.social_links.github && (
                      <a
                        href={post.author.social_links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/5 rounded-3xl p-8 md:p-12 border border-white/10 shadow-[inset_0px_-11px_33px_0px_#00E35B]/5">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Stay <span className="text-primary">Updated</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto font-medium tracking-tight">
              Get the latest articles, product updates, and crypto insights
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-all duration-300"
              />
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black rounded-2xl font-semibold hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                <span className="font-semibold">Subscribe</span>
                <ArrowUpRight className="text-primary-foreground" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
