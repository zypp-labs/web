"use client";

import React, { useState } from "react";
import { ArrowUpRight, Code2, Cpu, Globe, Lock, Share2, Wallet } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DottedGlowBackground } from "../ui/dotted-glow-background";

const tools = [
  {
    id: "ZP-001",
    title: "Zypp Wallet",
    description: "Create, sign, and store transactions offline, then submit when connectivity is available.",
    tags: ["MOBILE", "LIVE"],
    icon: <Wallet className="w-6 h-6" />,
    size: "large",
    color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  },
  {
    id: "ZP-002",
    title: "Zypp SDK",
    description: "Developer toolkit for building offline-first transaction flows on Solana.",
    tags: ["CORE"],
    icon: <Code2 className="w-6 h-6" />,
    size: "medium",
    color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  {
    id: "ZP-003",
    title: "Zypp Relay",
    description: "Asynchronous transaction broadcaster for submitting transactions when networks become available.",
    tags: ["INFRA"],
    icon: <Share2 className="w-6 h-6" />,
    size: "medium",
    color: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  },
  {
    id: "ZP-004",
    title: "Zypp Research",
    description: "Ongoing research into offline-first systems, delay-tolerant networks, and transaction reliability.",
    tags: ["LAB"],
    icon: <Cpu className="w-6 h-6" />,
    size: "small",
    color: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  },
];

export const Developers = () => {
  const [view, setView] = useState("FEATURED");
  const [mode, setMode] = useState("BENTO");

  const filteredTools = tools.filter((tool) => {
    if (view === "FEATURED") return true;
    return tool.tags.includes(view);
  });

  return (
    <section className="w-full min-h-screen bg-black/70 py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-start relative overflow-hidden">
      <DottedGlowBackground
        color="#04E83D30"
        glowColorDarkVar=""
        className="h-fit"
      />
      {/* Background glow */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#04E83D]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header section inspired by the image */}
      <div className="w-full mb-16 relative z-10">
        <h1 className="text-white text-4xl sm:text-6xl font-bold tracking-tighter mb-8 uppercase text-left">
          Developer Tools For <br />
          <span className="text-[#04E83D]">Zypp Ecosystem</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-6 w-full">
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">View:</span>
            <div className="flex gap-4">
              {["FEATURED", "CORE", "INFRA", "LAB"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`text-xs font-bold px-2 py-1 rounded transition-all ${view === v ? "bg-[#04E83D] text-black" : "text-white/60 hover:text-white"
                    }`}
                >
                  [{view === v ? "X" : " "}] {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Mode:</span>
            <div className="flex gap-4">
              <button
                onClick={() => setMode("BENTO")}
                className={`text-xs font-bold px-2 py-1 rounded transition-all ${mode === "BENTO" ? "bg-[#04E83D] text-black" : "text-white/60 hover:text-white"
                  }`}
              >
                [{mode === "BENTO" ? "X" : " "}] BENTO
              </button>
              <button
                onClick={() => setMode("TREE")}
                className={`text-xs font-bold px-2 py-1 rounded transition-all ${mode === "TREE" ? "bg-[#04E83D] text-black" : "text-white/60 hover:text-white"
                  }`}
              >
                [{mode === "TREE" ? "X" : " "}] TREE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full relative z-10">
        <AnimatePresence mode="wait">
          {mode === "BENTO" ? (
            <motion.div
              key="bento"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/10"
            >
              {filteredTools.map((tool, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1, delay: index * 0.05 }}
                  key={tool.title}
                  className="group relative p-8 border-r border-b border-white/10 transition-all duration-100 flex flex-col justify-between min-h-[350px] bg-black/20 hover:bg-white/[0.02]"
                >
                  {/* Top Section: Tags & Icon */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-white/20 text-white/40 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-white/20 group-hover:text-[#04E83D]/40 transition-colors duration-100">
                      {tool.icon}
                    </div>
                  </div>

                  {/* Middle Section: Content */}
                  <div className="flex flex-col gap-4 mt-8">
                    <h3 className="text-xl font-bold text-white tracking-tight uppercase font-mono">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed font-sans font-medium">
                      {tool.description}
                    </p>
                  </div>

                  {/* Bottom Section: CTA */}
                  <div className="mt-auto pt-8 flex justify-between items-end">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                      Ref: {tool.id}
                    </div>
                    <Link
                      href="/products"
                      className="group/link flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest"
                    >
                      Explore <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="tree"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.1 }}
              className="flex flex-col gap-0 w-full max-w-4xl"
            >
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.05 }}
                  className="relative pl-12 pb-16 last:pb-0 group"
                >
                  {/* Timeline Line */}
                  {index !== filteredTools.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-0 w-px bg-white/10 group-hover:bg-[#04E83D]/20 transition-colors duration-100" />
                  )}

                  {/* Timeline Node */}
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 group-hover:border-[#04E83D]/50 transition-all duration-100 shadow-[0_0_20px_rgba(0,0,0,1)]">
                    <div className="text-white/40 group-hover:text-[#04E83D] transition-colors duration-100">
                      {tool.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-mono text-[#04E83D] bg-[#04E83D]/10 px-2 py-0.5 rounded">
                          {tool.id}
                        </span>
                        <div className="flex gap-2">
                          {tool.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-white/10 text-white/30 uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 uppercase font-mono tracking-tight">
                        {tool.title}
                      </h3>
                      <p className="text-white/50 max-w-2xl text-base leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <Link
                      href="/products"
                      className="group/link flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-[#04E83D] text-white hover:text-black transition-all rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                      Explore Documentation <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
