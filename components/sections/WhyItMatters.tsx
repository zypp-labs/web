"use client";

import React from "react";
import { motion } from "framer-motion";
import { WifiOff, AlertTriangle, RefreshCcw, Activity, Globe2, ZapOff } from "lucide-react";
import { DottedGlowBackground } from "../ui/dotted-glow-background";

export const WhyItMatters = () => {
  return (
    <section className="w-full min-h-screen bg-black/70 py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-start relative overflow-hidden">
      <DottedGlowBackground
        color="#04E83D30"
        glowColorDarkVar=""
      />
      {/* Background glow - subtle red for the problem section */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#04E83D]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header section inspired by Developers & Research style */}
      <div className="w-full mb-16 relative z-10">
        <h1 className="text-white text-4xl sm:text-6xl font-bold tracking-tighter mb-8 uppercase text-left">
          Analysis: <br />
          <span className="text-[#04E83D]">Why it Matters</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-6 w-full">
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Context:</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-[#04E83D] px-2 py-1 bg-[#04E83D]/10 rounded">[X] PROBLEM STATEMENT</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Dataset:</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-white/60 px-2 py-1 bg-white/5 rounded">[X] GLOBAL CONNECTIVITY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left Side: Structured Research Narrative */}
        <div className="flex flex-col gap-12 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-[#04E83D] font-bold tracking-[0.2em] uppercase">Hypothesis</span>
              <p className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight uppercase font-mono">
                Most financial systems assume <span className="text-zinc-500">constant internet access</span>.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-zinc-600 font-bold tracking-[0.2em] uppercase">The Reality</span>
                <p className="text-zinc-500 font-medium text-base leading-relaxed">
                  In reality, large parts of the world operate under unreliable, intermittent, or no connectivity at all. 
                  Digital infrastructure often fails where it is needed most.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-zinc-600 font-bold tracking-[0.2em] uppercase">Systemic Failure</span>
                <p className="text-white/80 font-medium text-base leading-relaxed">
                  When networks fail, transactions fail. Payments don’t go through. 
                  Financial systems break when they lose their connection to the cloud.
                </p>
              </div>

              <div className="mt-4 p-6 border-l border-[#04E83D]/30 bg-zinc-900/20">
                <p className="text-[#04E83D] text-sm font-mono font-semibold leading-relaxed italic uppercase tracking-tight">
                  &ldquo;We&rsquo;re building for the environments where this is the norm, not the exception.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Technical Diagnostic Visuals */}
        <div className="w-full relative">
          <div className="p-1 border border-white/5 bg-white/[0.01] rounded-2xl relative group/diagram">
            <div className="p-12 border border-white/5 bg-black/40 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
              
              <div className="relative z-10 flex flex-col gap-8">
                {/* Diagnostic Header */}
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Diagnostic</span>
                    <span className="text-xs font-mono text-white font-bold uppercase">System Status: Critical</span>
                  </div>
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="text-[10px] font-mono text-red-500 uppercase font-bold">Offline</span>
                  </motion.div>
                </div>

                {/* Technical Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-white/5 bg-zinc-900/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-3 text-zinc-600">
                      <ZapOff className="w-4 h-4" />
                      <span className="text-[9px] font-mono uppercase tracking-widest">Connectivity</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white font-mono">0.00</span>
                      <span className="text-[10px] font-mono text-zinc-600">%</span>
                    </div>
                  </div>
                  <div className="p-4 border border-white/5 bg-zinc-900/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-3 text-zinc-600">
                      <Activity className="w-4 h-4" />
                      <span className="text-[9px] font-mono uppercase tracking-widest">Packet Loss</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-red-500/80 font-mono">100.0</span>
                      <span className="text-[10px] font-mono text-zinc-600">%</span>
                    </div>
                  </div>
                </div>

                {/* Animated Failure Schematic */}
                <div className="relative h-32 border border-white/5 bg-zinc-950/50 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  <div className="relative flex items-center gap-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-black relative">
                        <Globe2 className="w-5 h-5 text-zinc-700" />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 border border-red-500/30 rounded"
                        />
                      </div>
                      <span className="text-[8px] font-mono text-zinc-700 uppercase">Network</span>
                    </div>

                    <div className="w-24 h-[1px] bg-white/5 relative">
                      <motion.div 
                        initial={{ left: "0%" }}
                        animate={{ left: "40%" }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-[1px] bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      />
                      <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-red-500/40" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-black">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCcw className="w-5 h-5 text-zinc-700" />
                        </motion.div>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-700 uppercase">Gateway</span>
                    </div>
                  </div>
                </div>

                {/* Redacted Data Overlay */}
                <div className="flex flex-col gap-2 opacity-20">
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
                  <div className="h-1.5 w-3/4 bg-zinc-800 rounded-full" />
                  <div className="h-1.5 w-1/2 bg-zinc-800 rounded-full" />
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-zinc-700 uppercase">Error Log: PRT-001-FAIL</span>
                  <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Retrying in 2.4s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
