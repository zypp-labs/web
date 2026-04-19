"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, MessageSquare, Code, Search, Palette, UserCheck, ArrowRight, Zap, Globe, Cpu, BookOpen, MessageCircleCode, MessageCircle } from "lucide-react";
import Link from "next/link";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function CommunityPage() {
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

                {/* Header section */}
                <div className="w-full mb-16 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                        className="text-white text-4xl sm:text-6xl font-bold tracking-tighter mb-8 uppercase text-left"
                    >
                        Community <br />
                        <span className="text-[#04E83D]">Zypp Labs</span>
                    </motion.h1>

                    <div className="max-w-2xl border-l border-[#04E83D]/30 pl-8 py-2">
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.1 }}
                            className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-medium"
                        >
                            Zypp Labs is being built in the open. We&apos;re early, but we&apos;re looking for builders, thinkers, and contributors who care about offline-first systems and resilient financial infrastructure.
                        </motion.p>
                    </div>
                </div>

                <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-l border-white/10">

                    {/* Section 1: Get Involved */}
                    <div className="p-8 border-r border-b border-white/10 flex flex-col gap-8 bg-black/20">
                        <div>
                            <span className="text-[10px] font-mono text-[#04E83D] uppercase tracking-[0.3em] font-bold mb-4 block">
                                01 / JOIN THE CORE
                            </span>
                            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-mono">Get Involved</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href="https://x.com/use_zypp"
                                target="_blank"
                                className="group flex items-center justify-between p-6 border border-white/5 bg-zinc-900/30 hover:bg-[#04E83D]/5 hover:border-[#04E83D]/30 transition-all duration-100"
                            >
                                <div className="flex items-center gap-4">
                                    <Twitter className="w-5 h-5 text-zinc-500 group-hover:text-[#04E83D]" />
                                    <span className="text-sm font-bold uppercase tracking-widest font-mono">Follow on X</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-[#04E83D] transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="https://t.me/zypp_labs"
                                className="group flex items-center justify-between p-6 border border-white/5 bg-zinc-900/30 hover:bg-[#04E83D]/5 hover:border-[#04E83D]/30 transition-all duration-100"
                            >
                                <div className="flex items-center gap-4">
                                    <MessageCircle className="w-5 h-5 text-zinc-500 group-hover:text-[#04E83D]" />
                                    <span className="text-sm font-bold uppercase tracking-widest font-mono">Join Telegram</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-[#04E83D] transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="mt-auto">
                            <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest italic">
                                * Early contributors will shape what Zypp becomes.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Who it's for */}
                    <div className="p-8 border-r border-b border-white/10 flex flex-col gap-8 bg-black/20">
                        <div>
                            <span className="text-[10px] font-mono text-[#04E83D] uppercase tracking-[0.3em] font-bold mb-4 block">
                                02 / ECOSYSTEM
                            </span>
                            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-mono">Who it&apos;s for</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: <Cpu className="w-5 h-5" />, title: "Solana Builders", desc: "Developers building high-performance decentralized applications." },
                                { icon: <BookOpen className="w-5 h-5" />, title: "Researchers", desc: "Exploring network systems and offline-first architectures." },
                                { icon: <Palette className="w-5 h-5" />, title: "Designers", desc: "Interested in the UX of resilient financial infrastructure." },
                                { icon: <UserCheck className="w-5 h-5" />, title: "Early Users", desc: "Testing the frontiers of offline-first digital value." }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-[#04E83D]">
                                        {item.icon}
                                        <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-white">{item.title}</h4>
                                    </div>
                                    <p className="text-xs text-zinc-500 leading-relaxed font-medium pl-8">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Ways to contribute */}
                    <div className="p-8 border-r border-b border-white/10 flex flex-col gap-8 bg-black/20 lg:col-span-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                            <div>
                                <span className="text-[10px] font-mono text-[#04E83D] uppercase tracking-[0.3em] font-bold mb-4 block">
                                    03 / ACTIONS
                                </span>
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-mono">Ways to contribute</h2>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#04E83D]/10 border border-[#04E83D]/20 rounded text-[10px] font-mono text-[#04E83D] uppercase tracking-widest font-bold">
                                <Zap className="w-3 h-3" /> Open Contribution
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: "Test the Wallet", action: "Beta Access", href: "https://drive.google.com/file/d/1wbVGX90cwW7hxLvxnk28f7CS7muXLfRU/view?usp=sharing" },
                                { title: "Build with SDK", action: "View Docs", href: "https://www.npmjs.com/package/toss-expo-sdk" },
                                { title: "Give Feedback", action: "Submit Form", href: "https://t.me/zypp_labs" },
                                { title: "Contribute Ideas", action: "Open Discussion", href: "https://pine.roggy.site/f/product-idea-submission" }
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    target="_blank"
                                    className="p-6 border border-white/5 bg-zinc-900/20 hover:border-[#04E83D]/30 hover:bg-[#04E83D]/5 transition-all flex flex-col gap-4 group"
                                >
                                    <h4 className="text-sm font-bold uppercase tracking-widest font-mono text-white group-hover:text-[#04E83D] transition-colors">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-auto group-hover:text-zinc-400">
                                        {item.action} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="w-full relative z-10 mt-16 text-center py-12 border border-dashed border-white/10 rounded-sm bg-[#04E83D]/[0.02]"
                >
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight font-mono mb-4">
                        Building in the Open
                    </h3>
                    <p className="text-sm font-semibold text-zinc-500 max-w-xl mx-auto leading-relaxed mb-8 px-4">
                        Early contributors will shape what Zypp becomes. We are defining the future of resilient financial infrastructure together.
                    </p>
                    <div className="flex justify-center">
                        <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-[0.3em]">
                            Zypp Labs © 2026 · Ecosystem & Community
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* <Footer /> */}
        </main>
    );
}
