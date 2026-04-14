"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Share2, Database, Wifi } from "lucide-react";
import { DottedGlowBackground } from "../ui/dotted-glow-background";

const steps = [
  {
    id: "01",
    title: "Create",
    description: "Cryptographic signing occurs locally. Private keys never leave the hardware boundary.",
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: "02",
    title: "Store",
    description: "Encrypted transaction payloads are persisted in a local, secure queue.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "03",
    title: "Submit",
    description: "Broadcast occurs via asynchronous relay nodes upon network re-entry.",
    icon: <Share2 className="w-6 h-6" />,
  },
];

export const HowItWorks = () => {
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
          Protocol <br />
          <span className="text-[#04E83D]">Architecture</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-6 w-full">
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Process:</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-[#04E83D] px-2 py-1 bg-[#04E83D]/10 rounded">[X] OFFLINE-FIRST</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Status:</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-[#04E83D] px-2 py-1 bg-[#04E83D]/10 rounded">[X] LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Grid - Matching Developers Layout */}
      <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10 mb-20">
        {steps.map((step, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1, delay: index * 0.05 }}
            key={step.id}
            className="group relative p-8 border-r border-b border-white/10 transition-all duration-100 flex flex-col justify-between min-h-[300px] bg-black/20 hover:bg-white/[0.02]"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-zinc-600 font-bold tracking-widest group-hover:text-[#04E83D] transition-colors">{step.id}</span>
              <div className="text-zinc-500 group-hover:text-[#04E83D]/60 transition-colors duration-100">
                {step.icon}
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <h3 className="text-xl font-bold text-white tracking-tight uppercase font-mono group-hover:text-[#04E83D] transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-sans font-medium group-hover:text-zinc-400 transition-colors">
                {step.description}
              </p>
            </div>

            <div className="mt-auto pt-8 flex justify-between items-end">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                Phase: 0{index + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schematic Diagram */}
      <div className="w-full relative z-10">
        <div className="w-full p-1 border border-white/5 bg-white/[0.01] rounded-2xl relative group/diagram">
          <div className="p-12 md:p-20 border border-white/5 bg-black/40 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">

              {/* Device Node */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-xl border border-white/10 flex items-center justify-center bg-zinc-900/50 relative group">
                  <Smartphone className="w-8 h-8 text-zinc-600 group-hover:text-[#04E83D] transition-colors" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1 h-1 rounded-full bg-red-500"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold">Client</p>
                  <p className="text-[9px] font-mono text-zinc-700 uppercase mt-1">Local Env</p>
                </div>
              </div>

              {/* Connector 1 */}
              <div className="flex-1 h-[1px] w-[1px] md:w-full md:h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-[#04E83D]/30 to-transparent shadow-[0_0_10px_rgba(4,232,61,0.2)]"
                />
              </div>

              {/* Storage Node */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-xl border border-white/10 flex items-center justify-center bg-zinc-900/50 relative group">
                  <Database className="w-8 h-8 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                  <motion.div
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl bg-blue-400/5"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold">Secure Store</p>
                  <p className="text-[9px] font-mono text-zinc-700 uppercase mt-1">Persistence</p>
                </div>
              </div>

              {/* Connector 2 */}
              <div className="flex-1 h-[1px] w-[1px] md:w-full md:h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.6 }}
                  className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent shadow-[0_0_10px_rgba(96,165,250,0.2)]"
                />
              </div>

              {/* Network Node */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-xl border border-white/10 flex items-center justify-center bg-zinc-900/50 relative group">
                  <Wifi className="w-8 h-8 text-zinc-600 group-hover:text-orange-400 transition-colors" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute w-12 h-12 rounded-full border border-orange-400/20"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold">Relay</p>
                  <p className="text-[9px] font-mono text-zinc-700 uppercase mt-1">Broadcast</p>
                </div>
              </div>

              {/* Connector 3 */}
              <div className="flex-1 h-[1px] w-[1px] md:w-full md:h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.2 }}
                  className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-[#04E83D]/30 to-transparent shadow-[0_0_10px_rgba(4,232,61,0.2)]"
                />
              </div>

              {/* Blockchain Node */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-xl border border-white/10 flex items-center justify-center bg-zinc-900/50 overflow-hidden group relative">
                  <div className="grid grid-cols-2 gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity relative z-10">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        className="w-3 h-3 bg-[#04E83D] rounded-[2px] shadow-[0_0_8px_rgba(4,232,61,0.3)]"
                      />
                    ))}
                  </div>
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-[#04E83D]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold">L1 Layer</p>
                  <p className="text-[9px] font-mono text-zinc-700 uppercase mt-1">Settlement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
