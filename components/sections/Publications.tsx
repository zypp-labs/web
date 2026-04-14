"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { DottedGlowBackground } from "../ui/dotted-glow-background";
import { SafeImage } from "../custom/safe-image";

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

export const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/api/publications");
        const data = await response.json();
        if (data.publications) {
          setPublications(data.publications);
        }
      } catch (error) {
        console.error("Error fetching publications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, []);

  return (
    <section className="w-full min-h-screen bg-black/70 py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-start relative overflow-hidden">
      <DottedGlowBackground
        color="#04E83D30"
        glowColorDarkVar=""
      />
      {/* Background glow */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#04E83D]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header section inspired by Developers */}
      <div className="w-full mb-16 relative z-10">
        <h1 className="text-white text-4xl sm:text-6xl font-bold tracking-tighter mb-8 uppercase text-left">
          Scientific <br />
          <span className="text-[#04E83D]">Publications</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-6 w-full">
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Archive:</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-[#04E83D] px-2 py-1 bg-[#04E83D]/10 rounded">[X] OPEN ACCESS</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Upcoming:</span>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[10px] font-mono text-[#04E83D] font-bold uppercase tracking-widest">More is coming</span>
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

      {/* Papers List - Grid Layout Matching Developers & Nike Style */}
      <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10">
        {isLoading ? (
          <div className="col-span-full h-64 flex flex-col items-center justify-center gap-4 border-r border-b border-white/10">
            <Loader2 className="w-8 h-8 text-[#04E83D] animate-spin" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Accessing Archive...</p>
          </div>
        ) : (
          <>
            {publications.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.1 }}
                className="group relative p-8 border-r border-b border-white/10 transition-all duration-100 flex flex-col min-h-[600px] bg-black/20 hover:bg-white/[0.02]"
              >
                {/* Top Section: Metadata & Square Thumbnail (1080x1080) */}
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-[#04E83D] bg-[#04E83D]/5 px-2 py-0.5 rounded border border-[#04E83D]/10 uppercase tracking-widest">
                      {paper.tag || "RESEARCH"}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-bold">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  {/* Square Aspect Ratio Thumbnail (1:1) */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-sm border border-white/5 group-hover:border-[#04E83D]/20 transition-all duration-100 shadow-2xl bg-zinc-900/50">
                    <SafeImage
                      src={paper.cover_image}
                      alt={paper.title}
                      fill
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-80 group-hover:scale-102 transition-all duration-100"
                    />
                    <div className="absolute inset-0 bg-zinc-950/20" />
                  </div>
                </div>

                {/* Middle Section: Content - Nike minimal style */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-mono text-zinc-600 italic uppercase tracking-widest font-bold">
                    {paper.type || "Scientific Paper"} · {paper.date || "2026"}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase font-mono group-hover:text-[#04E83D] transition-colors duration-100 leading-tight">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans font-medium line-clamp-3 group-hover:text-zinc-400 transition-colors duration-100">
                    {paper.subtext}
                  </p>
                </div>

                {/* Bottom Section: CTA - Like the "Add to cart" position */}
                <div className="mt-auto pt-8 flex justify-between items-end border-t border-white/5 group-hover:border-[#04E83D]/10 transition-colors duration-100">
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                    Ref: {paper.ref || `RES-${index + 1}`}
                  </div>
                  <Link
                    href={paper.link || "#"}
                    target="_blank"
                    className="group/link flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-all"
                  >
                    Read Paper <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Coming Soon Placeholders */}
            {Array.from({ length: Math.max(0, 3 - publications.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="group relative p-8 border-r border-b border-white/10 flex flex-col min-h-[600px] bg-black/10 opacity-80 grayscale"
              >
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-white/10 bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
                      PENDING
                    </span>
                    <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest font-bold">
                      0{publications.length + i + 1}
                    </span>
                  </div>

                  <div className="relative w-full aspect-square overflow-hidden rounded-sm border border-white/5 bg-zinc-900/20 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-white/5">
                      <FileText className="w-12 h-12" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Research Pending</span>
                    </div>
                    {/* Redacted lines effect */}
                    <div className="absolute inset-0 p-8 flex flex-col gap-4 opacity-10">
                      <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                      <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                      <div className="h-2 w-2/3 bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="h-4 w-1/3 bg-white/5 rounded-full" />
                  <div className="h-8 w-full bg-white/5 rounded-full" />
                  <div className="h-4 w-2/3 bg-white/5 rounded-full" />
                </div>

                <div className="mt-auto pt-8 flex justify-between items-end border-t border-white/5">
                  <div className="text-[10px] font-mono text-white/5 uppercase tracking-tighter italic">
                    COMING SOON
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Global Footer Note Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="w-full relative z-10 mt-12"
      >
        <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest text-left">
          Research on offline-first systems, transaction reliability, and network resilience.
        </p>
      </motion.div>
    </section>
  );
};
