// app/blog/page.tsx
"use client";

import { MainBtn } from "@/components/custom/MainBtn";
import { Spotlight } from "@/components/custom/spotlight";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Waitlist } from "@/components/sections/Waitlist";
import {
  Calendar,
  Clock,
  User,
  ArrowUpRight,
  Search,
  Filter,
  ChevronDown,
  Tag,
  BookOpen,
  Share2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { OutBtn } from "@/components/custom/OutBtn";
import { SafeImage } from "@/components/custom/safe-image";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 9;

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Fetch more posts when offset changes
  useEffect(() => {
    if (offset > 0) {
      fetchMorePosts();
    }
  }, [offset]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [postsRes, categoriesRes, tagsRes] = await Promise.all([
        fetch(`/api/blog/posts?limit=${limit}&offset=0`),
        fetch("/api/blog/categories"),
        fetch("/api/blog/tags"),
      ]);

      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();
      const tagsData = await tagsRes.json();

      if (postsData.posts) setBlogPosts(postsData.posts);
      if (categoriesData.categories) setCategories(categoriesData.categories);
      if (tagsData.tags) setTags(tagsData.tags);

      setHasMore(postsData.posts.length === limit);
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePosts = async () => {
    try {
      setLoadingMore(true);
      const response = await fetch(
        `/api/blog/posts?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      if (data.posts) {
        setBlogPosts((prev) => [...prev, ...data.posts]);
        setHasMore(data.posts.length === limit);
      }
    } catch (error) {
      console.error("Failed to fetch more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `/api/blog/posts?search=${encodeURIComponent(
            searchQuery
          )}&limit=${limit}`
        : `/api/blog/posts?limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.posts) {
        setBlogPosts(data.posts);
        setHasMore(data.posts.length === limit);
        setOffset(0);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    try {
      setLoading(true);
      setActiveCategory(categoryId);

      const url =
        categoryId === "all"
          ? `/api/blog/posts?limit=${limit}`
          : `/api/blog/posts?category=${categoryId}&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.posts) {
        setBlogPosts(data.posts);
        setHasMore(data.posts.length === limit);
        setOffset(0);
      }
    } catch (error) {
      console.error("Category filter failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading && blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
        <NavBar />
        <Spotlight />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      <NavBar />
      <Spotlight />

      {/* Hero Section */}
      <section className="relative pt-60 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
            Zypp <span className="text-primary font-serif italic">Blog</span>
          </h1>
          <p className="text-md md:text-2xl text-white/70 max-w-3xl mx-auto font-medium tracking-tight mb-8">
            Insights, updates, and tutorials on offline crypto transactions and
            the future of Web3.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 px-7 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filters Section */}
          <div className="mb-12">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filters - Hidden on mobile by default */}
            <div className={`${showFilters ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                        activeCategory === category.id
                          ? "bg-primary text-black"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 4).map((tag) => (
                    <button
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 hover:bg-primary/20 hover:text-primary transition-all duration-300"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Posts */}
          {activeCategory === "all" &&
            searchQuery === "" &&
            featuredPosts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight flex items-center gap-2">
                  <BookOpen className="w-8 h-8 text-primary" />
                  Featured <span className="text-primary">Articles</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all duration-300"
                    >
                      <div className="cursor-pointer group bg-black/5 rounded-3xl overflow-hidden shadow-[inset_0px_-11px_33px_0px_#00E35B]/7 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105">
                        {/* Image */}
                        <div className="h-48 relative overflow-hidden">
                          <SafeImage
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 bg-primary text-black text-xs font-semibold rounded-full">
                              Featured
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                            {post.title}
                          </h3>

                          <p className="text-white/70 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-white/60">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300">
                                <Share2 className="w-4 h-4" />
                              </button>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all duration-300"
                              >
                                Read More
                                <ArrowUpRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {/* All Posts Grid */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight">
              {searchQuery ? "Search Results" : "All Articles"}
              <span className="text-primary"> ({blogPosts.length})</span>
            </h2>

            {blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-white/30" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all duration-300"
                  >
                    <div className="cursor-pointer group bg-black/5 rounded-3xl overflow-hidden shadow-[inset_0px_-11px_33px_0px_#00E35B]/5 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105">
                      {/* Image */}
                      <div className="h-40 relative overflow-hidden">
                        <SafeImage
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                            {post.category.charAt(0).toUpperCase() +
                              post.category.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-white/70 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all duration-300"
                          >
                            Read More
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && blogPosts.length > 0 && (
              <div className="text-center mt-16">
                <OutBtn
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-4 border border-white/20 rounded-2xl text-white font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? "Loading..." : "Load More Articles"}
                </OutBtn>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
              <MainBtn className="whitespace-nowrap">
                <p className="font-semibold text-black">Subscribe</p>
                <ArrowUpRight className="text-primary-foreground" size={16} />
              </MainBtn>
            </div>
          </div>
        </div>
      </section>

      <Waitlist />
      <Footer />
    </div>
  );
}
