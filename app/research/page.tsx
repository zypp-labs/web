"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, BookOpen, Globe, Cpu, AlertCircle, Inbox, Loader2 } from "lucide-react";
import Link from "next/link";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { SafeImage } from "@/components/custom/safe-image";

interface Publication {
    id: string;
    title: string;
    subtext: string;
    cover_image: string;
    link: string;
    tag?: string;
    type?: string;
    date?: string;
    ref?: string;
}

export default function ResearchPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/publications");
                if (!response.ok) throw new Error("Failed to fetch publications");
                const data = await response.json();

                if (data.publications) {
                    setPublications(data.publications);
                } else {
                    setPublications([]);
                }
            } catch (err) {
                console.error("Error fetching publications:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublications();
    }, []);

    const getIcon = (type?: string) => {
        if (type?.toLowerCase().includes("paper")) return <Globe className="w-12 h-12" />;
        if (type?.toLowerCase().includes("whitepaper")) return <Cpu className="w-12 h-12" />;
        return <BookOpen className="w-12 h-12" />;
    };
    return (
        <main className="min-h-screen bg-[#000604] text-white selection:bg-[#04E83D] selection:text-black">
            <NavBar />

            <section className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-16 flex flex-col items-start relative overflow-hidden">
                <DottedGlowBackground
                    color="#04E83D30"
                    glowColorDarkVar=""
                />

                {/* Background glow effects */}
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#04E83D]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Header section matching Publications/Developers style */}
                <div className="w-full mb-16 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                        className="text-white text-4xl sm:text-6xl font-bold tracking-tighter mb-8 uppercase text-left"
                    >
                        Applied <br />
                        <span className="text-[#04E83D]">Research</span>
                    </motion.h1>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-6 w-full">
                        <div className="flex items-center gap-6">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Repository:</span>
                            <div className="flex gap-4">
                                <span className="text-xs font-bold text-[#04E83D] px-2 py-1 bg-[#04E83D]/10 rounded">[X] OPEN SOURCE</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Status:</span>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 min-w-[140px]">
                                    <span className="text-[10px] font-mono text-[#04E83D] font-bold uppercase tracking-widest">Active Investigation</span>
                                    <div className="h-0.5 w-full bg-[#04E83D]/20 overflow-hidden">
                                        <motion.div
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="h-full w-1/2 bg-[#04E83D]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Research Grid - Grid Layout Matching Developers & Nike Style */}
                <div className="w-full relative z-10">
                    {isLoading ? (
                        <div className="w-full h-96 flex flex-col items-center justify-center gap-4 border border-white/10 rounded-sm bg-black/20">
                            <Loader2 className="w-8 h-8 text-[#04E83D] animate-spin" />
                            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Accessing Research Database...</p>
                        </div>
                    ) : error ? (
                        <div className="w-full h-96 flex flex-col items-center justify-center gap-4 border border-white/10 rounded-sm bg-black/20">
                            <AlertCircle className="w-8 h-8 text-red-500/50" />
                            <div className="text-center">
                                <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-1">Database Connection Error</p>
                                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{error}</p>
                            </div>
                        </div>
                    ) : publications.length === 0 ? (
                        <div className="w-full h-96 flex flex-col items-center justify-center gap-4 border border-white/10 rounded-sm bg-black/20">
                            <Inbox className="w-8 h-8 text-zinc-800" />
                            <div className="text-center">
                                <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest mb-1">No Publications Found</p>
                                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">The research archive is currently empty</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10">
                            {publications.map((area, index) => (
                                <motion.div
                                    key={area.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05, duration: 0.1 }}
                                    className="group relative p-8 border-r border-b border-white/10 transition-all duration-100 flex flex-col min-h-[600px] bg-black/20 hover:bg-white/[0.02]"
                                >
                                    {/* Top Section: Metadata & Visual Placeholder */}
                                    <div className="flex flex-col gap-6 mb-8">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-mono text-[#04E83D] bg-[#04E83D]/5 px-2 py-0.5 rounded border border-[#04E83D]/10 uppercase tracking-widest">
                                                {area.tag || "RESEARCH"}
                                            </span>
                                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-bold">
                                                {area.id}
                                            </span>
                                        </div>

                                        {/* Square Aspect Ratio Placeholder (1:1) - Nike Style */}
                                        <div className="relative w-full aspect-square overflow-hidden rounded-sm border border-white/5 group-hover:border-[#04E83D]/20 transition-all duration-100 shadow-2xl bg-zinc-900/50 flex items-center justify-center">
                                            <div className="text-[#04E83D]/10 group-hover:text-[#04E83D]/20 transition-colors duration-100">
                                                {getIcon(area.type)}
                                            </div>

                                            {/* Display image if available */}
                                            {area.cover_image && (
                                                <div className="absolute inset-0 z-0">
                                                    <SafeImage
                                                        src={area.cover_image}
                                                        alt={area.title}
                                                        fill
                                                        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                </div>
                                            )}

                                            {/* Subtle scanline effect */}
                                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(4,232,61,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan pointer-events-none z-10" />

                                            <div className="absolute inset-0 bg-zinc-950/20 z-0" />
                                        </div>
                                    </div>

                                    {/* Middle Section: Content */}
                                    <div className="flex flex-col gap-4">
                                        <span className="text-[10px] font-mono text-zinc-600 italic uppercase tracking-widest font-bold">
                                            {area.type || "Publication"} · {area.date || "2026"}
                                        </span>
                                        <h3 className="text-xl font-bold text-white tracking-tight uppercase font-mono group-hover:text-[#04E83D] transition-colors duration-100 leading-tight">
                                            {area.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed font-sans font-medium group-hover:text-zinc-400 transition-colors duration-100">
                                            {area.subtext}
                                        </p>
                                    </div>

                                    {/* Bottom Section: CTA */}
                                    <div className="mt-auto pt-8 flex justify-between items-end border-t border-white/5 group-hover:border-[#04E83D]/10 transition-colors duration-100">
                                        <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                                            Ref: {area.ref || `RES-${area.id}`}
                                        </div>
                                        <Link
                                            href={area.link}
                                            target="_blank"
                                            className="group/link flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-all"
                                        >
                                            Download PDF <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Archive Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="w-full relative z-10 mt-12 flex flex-col gap-4"
                >
                    <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest text-left">
                        Research methodologies: Deterministic Primitives · Asynchronous Broadcasters · Peer Coordination.
                    </p>
                    <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-[0.3em]">
                        Zypp Labs © 2026 · Research Driven Infrastructure
                    </p>
                </motion.div>
            </section>

            {/* <Footer /> */}
        </main>
    );
}
