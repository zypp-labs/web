"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Code2, Share2, Cpu, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function StackPage() {
    return (
        <main className="min-h-screen bg-[#000604] text-white selection:bg-[#04E83D] selection:text-black">
            <NavBar />

            <section className="w-full min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-16 flex flex-col items-center relative overflow-hidden">
                <DottedGlowBackground
                    color="#04E83D30"
                    glowColorDarkVar=""
                />

                {/* Background glow effects */}
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#04E83D]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Header section */}
                <div className="w-full max-w-5xl mb-24 relative z-10 text-center sm:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                        className="text-white text-4xl sm:text-7xl font-bold tracking-tighter mb-8 uppercase"
                    >
                        The Zypp <br />
                        <span className="text-[#04E83D]">Stack</span>
                    </motion.h1>

                    <div className="max-w-2xl border-l border-[#04E83D]/30 pl-8 py-2 mx-auto sm:mx-0">
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.1 }}
                            className="text-lg sm:text-2xl text-zinc-400 leading-relaxed font-medium"
                        >
                            A set of tools for building and running transactions beyond reliable connectivity.
                        </motion.p>
                    </div>
                </div>

                {/* Stack Layers - Hierarchical Layout */}
                <div className="w-full max-w-5xl relative z-10 flex flex-col gap-12">

                    {/* Layer 1: User Layer (Big) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.1 }}
                        className="group relative p-10 border border-white/10 bg-black/40 hover:bg-white/[0.02] transition-all duration-100 rounded-sm"
                    >
                        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                            <div className="w-20 h-20 rounded-full bg-[#04E83D]/10 flex items-center justify-center border border-[#04E83D]/20 text-[#04E83D]">
                                <Wallet className="w-10 h-10" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-[10px] font-mono text-[#04E83D] uppercase tracking-[0.3em] font-bold">
                                        LAYER 01 / USER
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-bold border border-white/10 px-2 py-0.5 rounded">
                                        ENTRY POINT
                                    </span>
                                </div>
                                <h2 className="text-4xl font-bold text-white uppercase tracking-tighter font-mono mb-4">Zypp Wallet</h2>
                                <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl font-medium">
                                    Create, sign, and store transactions offline, then submit when connectivity becomes available.
                                </p>
                            </div>
                            <Link
                                href="https://drive.google.com/drive/folders/17WvnvQsNqDXtu3RQ9jKKjFhevHh2tWcz"
                                target="_blank"
                                className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-[#04E83D] uppercase tracking-widest transition-all"
                            >
                                Launch Wallet <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Mid Layers: Developer & Infrastructure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Layer 2: Developer Layer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.1 }}
                            className="group relative p-10 border border-white/10 bg-black/40 hover:bg-white/[0.02] transition-all duration-100 rounded-sm flex flex-col"
                        >
                            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 mb-8">
                                <Code2 className="w-8 h-8" />
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em] font-bold">
                                    LAYER 02 / DEV
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-mono mb-4">Zypp SDK</h2>
                            <p className="text-base text-zinc-500 leading-relaxed font-medium mb-8">
                                Build offline-first transaction flows without depending on continuous network access. This is how others build on you.
                            </p>
                            <Link
                                href="https://www.npmjs.com/package/toss-expo-sdk"
                                target="_blank"
                                className="mt-auto flex items-center gap-2 text-xs font-mono text-zinc-600 hover:text-white uppercase tracking-widest transition-all"
                            >
                                Read Documentation <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* Layer 3: Infrastructure Layer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.1 }}
                            className="group relative p-10 border border-white/10 bg-black/40 hover:bg-white/[0.02] transition-all duration-100 rounded-sm flex flex-col"
                        >
                            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400 mb-8">
                                <Share2 className="w-8 h-8" />
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-[0.3em] font-bold">
                                    LAYER 03 / INFRA
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-mono mb-4">Zypp Relay</h2>
                            <p className="text-base text-zinc-500 leading-relaxed font-medium mb-8">
                                Asynchronous transaction broadcasting across unreliable networks. This is the core innovation of the stack.
                            </p>
                            <Link
                                href="https://docs.google.com/document/d/1yxLT7qavcNbJPx2Uozeruos0xeWpk3IwWBnQPxeDYQA/edit?usp=sharing"
                                target="_blank"
                                className="mt-auto flex items-center gap-2 text-xs font-mono text-zinc-600 hover:text-white uppercase tracking-widest transition-all"
                            >
                                Explore Protocol <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Layer 4: Research Layer (Small) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.1 }}
                        className="group relative p-8 border border-white/10 bg-black/20 hover:bg-white/[0.01] transition-all duration-100 rounded-sm"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-1">
                                        <span className="text-[9px] font-mono text-pink-400 uppercase tracking-[0.3em] font-bold">
                                            LAYER 04 / LAB
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight font-mono">Zypp Research</h3>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 max-w-md leading-relaxed font-medium">
                                Ongoing exploration into delay-tolerant systems and transaction reliability. The credibility engine of the stack.
                            </p>
                            <Link
                                href="https://docs.google.com/document/d/165tvnjI6KXsI4RR29nTfnHYH9kjPBcjjttWfysfFxjE/edit?usp=sharing"
                                target="_blank"
                                className="flex items-center gap-2 text-xs font-mono text-zinc-700 hover:text-white uppercase tracking-widest transition-all"
                            >
                                View Papers <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Core Principle Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-5xl relative z-10 mt-32 text-center py-20 border-t border-white/10"
                >
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3 px-4 py-1.5 bg-[#04E83D]/10 border border-[#04E83D]/20 rounded-full text-[10px] font-mono text-[#04E83D] uppercase tracking-[0.2em] font-bold">
                            <Shield className="w-3.5 h-3.5" /> Built for Unreliable Networks
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tighter font-mono max-w-2xl">
                            One Integrated System for a Disconnected World
                        </h2>
                        <p className="text-zinc-500 max-w-2xl leading-relaxed font-medium text-lg">
                            Zypp is designed for environments where connectivity is not guaranteed. Every component works together to ensure transactions can be created, stored, and eventually settled.
                        </p>

                        <div className="mt-12 flex flex-col items-center gap-4">
                            <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-[0.4em]">
                                Zypp Labs © 2026 · Architectural Framework
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* <Footer /> */}
        </main>
    );
}
