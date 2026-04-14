"use client";

import * as React from "react";
import { RightPanel } from "@/components/monitor/RightPanel";
import { PipelineVisualizer } from "@/components/monitor/PipelineVisualizer";
import { NavBar } from "@/components/sections/NavBar";
import { MonitorProvider, useMonitor } from "@/components/monitor/MonitorContext";
import { Zap, Loader2 } from "lucide-react";

function MonitorHUD() {
  const { metrics, isLoading } = useMonitor();
  const [isSimulating, setIsSimulating] = React.useState(false);

  const simulateTx = async () => {
    setIsSimulating(true);
    try {
      await fetch("/api/monitor/simulate", { method: "POST" });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  // If no metrics loaded yet, just show placeholders or 0
  const successRate = metrics?.counts.total && Number(metrics.counts.total) > 0
    ? Math.round((Number(metrics.counts.confirmed) / Number(metrics.counts.total)) * 100)
    : 100;

  const activeQueue = Number(metrics?.counts.queued || 0) + Number(metrics?.counts.sent || 0);
  const totalProcessed = Number(metrics?.counts.total || 0);

  return (
    <div className="absolute top-24 left-8 flex flex-col gap-8 z-10 pointer-events-none bg-black/1 backdrop-blur-md py-6 px-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">Relayer Status</span>
        <span className="text-3xl font-mono font-bold text-green-500">LIVE</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">Success Rate</span>
        <span className="text-3xl font-mono font-bold text-foreground">
          {isLoading && !metrics ? "--" : `${successRate}%`}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">Active Queue</span>
        <span className="text-3xl font-mono font-bold text-foreground">
          {isLoading && !metrics ? "--" : activeQueue}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">Total Processed</span>
        <span className="text-3xl font-mono font-bold text-foreground">
          {isLoading && !metrics ? "--" : totalProcessed.toLocaleString()}
        </span>
      </div>

      <div className="mt-8 pointer-events-auto">
        <button
          onClick={simulateTx}
          disabled={isSimulating}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary text-sm font-bold tracking-wider uppercase transition-all"
        >
          {isSimulating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          Simulate TX
        </button>
      </div>
    </div>
  );
}

export default function MonitorPage() {
  return (
    <MonitorProvider>
      <div className="flex flex-col h-screen w-full bg-background overflow-hidden font-sans">
        {/* Make the navbar sit on top in the flex column */}
        <NavBar />

        {/* The remaining height is entirely dedicated to the visualizer */}
        <main className="flex-1 relative flex items-center justify-center">

          <PipelineVisualizer />

          <MonitorHUD />
        </main>

        {/* Right Panel: Transaction Feed */}
        <RightPanel />
      </div>
    </MonitorProvider>
  );
}
