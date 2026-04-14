"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Code2, Bell, Twitter } from "lucide-react";
import Link from "next/link";
import { DottedGlowBackground } from "../ui/dotted-glow-background";

export const GetInvolved = () => {
  return (
    <section className="w-full min-h-[60vh] bg-black/70 py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-start relative overflow-hidden">
      <DottedGlowBackground
        color="#04E83D30"
        glowColorDarkVar=""
      />
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(4,232,61,0.05),transparent_70%)] pointer-events-none" />

      {/* Header section inspired by Developers */}
      <div className="w-full mb-16 relative z-10">
        <h1 className="text-white text-4xl sm:text-6xl font-bold tracking-tighter mb-8 uppercase text-left">
          Join the <br />
          <span className="text-[#04E83D]">Evolution</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-6 w-full">
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Action:</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-[#04E83D] px-2 py-1 bg-[#04E83D]/10 rounded">[X] GET INVOLVED</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Status:</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-white/60 px-2 py-1 bg-white/5 rounded">[X] OPEN ACCESS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Option 1 Narrative */}
        <div className="flex flex-col gap-8 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight uppercase font-mono">
              We’re building the foundation for <span className="text-zinc-500">offline-first financial systems</span>.
            </p>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              If you’re interested in what we’re doing, explore the research, build with the tools, or follow the work as it evolves.
            </p>
          </motion.div>
        </div>

        {/* Right Side: CTA Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Path: Thinkers -> Research */}
          <Link href="#" className="group relative p-8 border border-white/10 bg-black/20 hover:bg-white/[0.02] transition-all duration-100 flex flex-col justify-between min-h-[200px]">
            <div className="flex justify-between items-start">
              <BookOpen className="w-6 h-6 text-zinc-500 group-hover:text-[#04E83D] transition-colors duration-100" />
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-white font-bold uppercase font-mono tracking-tight group-hover:text-[#04E83D] transition-colors">Explore Research</h3>
              <p className="text-[10px] text-zinc-600 uppercase mt-1 font-mono tracking-widest">For Thinkers</p>
            </div>
          </Link>

          {/* Path: Builders -> SDK */}
          <Link href="https://github.com/zypp-labs" target="_blank" className="group relative p-8 border border-white/10 bg-black/20 hover:bg-white/[0.02] transition-all duration-100 flex flex-col justify-between min-h-[200px]">
            <div className="flex justify-between items-start">
              <Code2 className="w-6 h-6 text-zinc-500 group-hover:text-[#04E83D] transition-colors duration-100" />
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-white font-bold uppercase font-mono tracking-tight group-hover:text-[#04E83D] transition-colors">Start Building</h3>
              <p className="text-[10px] text-zinc-600 uppercase mt-1 font-mono tracking-widest">For Builders</p>
            </div>
          </Link>

          {/* Path: Everyone -> Follow */}
          <Link href="https://x.com/use_zypp" target="_blank" className="lg:col-span-2 group relative p-8 border border-white/10 bg-black/20 hover:bg-white/[0.02] transition-all duration-100 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Twitter className="w-6 h-6 text-zinc-500 group-hover:text-[#04E83D] transition-colors duration-100" />
              <div>
                <h3 className="text-white font-bold uppercase font-mono tracking-tight group-hover:text-[#04E83D] transition-colors">Follow Updates</h3>
                <p className="text-[10px] text-zinc-600 uppercase mt-1 font-mono tracking-widest">For Everyone</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.1 }}
        className="w-full relative z-10 mt-24 pt-8 border-t border-white/5 flex justify-between items-center"
      >
        <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em]">
          Zypp Labs © 2026 · Resilient Transaction Infrastructure
        </p>
      </motion.div>
    </section>
  );
};
