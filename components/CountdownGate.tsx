"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { MainBtn } from "./custom/MainBtn";
import { AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Input } from "./ui/input";
import { Spotlight } from "./custom/spotlight";

const TARGET_TIMESTAMP = new Date("2025-11-28T08:00:00+01:00").getTime();
const COUNTDOWN_SEGMENTS = ["Days", "Hours", "Minutes", "Seconds"] as const;

type CountdownShape = {
  totalMs: number;
  segments: Record<(typeof COUNTDOWN_SEGMENTS)[number], string>;
};

const getRemainingTime = (): CountdownShape => {
  const totalMs = Math.max(TARGET_TIMESTAMP - Date.now(), 0);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

  return {
    totalMs,
    segments: {
      Days: days.toString().padStart(2, "0"),
      Hours: hours.toString().padStart(2, "0"),
      Minutes: minutes.toString().padStart(2, "0"),
      Seconds: seconds.toString().padStart(2, "0"),
    },
  };
};

export const CountdownGate = ({ children }: { children: ReactNode }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [remaining, setRemaining] = useState<CountdownShape>(() =>
    getRemainingTime()
  );

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to join waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const shouldShowSite = isDismissed || remaining.totalMs <= 0;

  const countdownBlocks = useMemo(
    () =>
      COUNTDOWN_SEGMENTS.map((segment) => (
        <div
          key={segment}
          className="flex flex-col items-center justify-center rounded-3xl px-6 py-5 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <span className="text-5xl sm:text-6xl md:text-9xl font-semibold tracking-tight text-primary drop-shadow-[0_10px_30px_rgba(0,226,91,0.35)]">
            {remaining.segments[segment]}
          </span>
          <span className="mt-2 text-xs sm:text-sm uppercase tracking-[0.4rem] text-white/70">
            {segment}
          </span>
        </div>
      )),
    [remaining.segments]
  );

  if (shouldShowSite) {
    return <>{children}</>;
  }

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#010504] text-white">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,226,91,0.15),rgba(1,5,4,0.95))]" />
      <div className="absolute -top-20 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" /> */}
      <Spotlight/>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.5rem] text-white/60">
          Countdown
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
          Beta Test Launching Soon
        </h1>
        <p className="mt-3 max-w-2xl text-md font-medium sm:text-lg text-white/70">
          The future of offline crypto transactions lands on{" "}
          <strong>November 28, 8:00 AM (UTC+1)</strong>. Hold tight for the full
          reveal — or jump in early below.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-5 w-full max-w-xs xs:max-w-sm sm:max-w-md"
        >
          <div className="bg-neutral-400/20 h-12 xs:h-14 rounded-full w-full px-2 xs:px-4 flex items-center justify-between">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="placeholder:font-medium bg-transparent border-0! outline-none! focus:ring-0 h-full w-full px-1 xs:px-2 sm:px-6 focus:border-0 focus:outline-0 active:ring-0 text-white placeholder:text-white/70 text-xs xs:text-sm sm:text-lg"
            />
            <MainBtn
              type="submit"
              disabled={loading}
              className="text-primary-foreground tracking-tighter font-semibold text-sm py-1 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Joining..." : "Join the waitlist"}
            </MainBtn>
          </div>
          {/* Status Message */}
          {status !== "idle" && (
            <div
              className={`flex items-center font-medium tracking-tighter mt-2 gap-2 mb-4 px-4 py-3 rounded-2xl text-sm ${
                status === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              {message}
            </div>
          )}
        </form>
        <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {countdownBlocks}
        </div>

        <MainBtn
          onClick={() => setIsDismissed(true)}
          className="mt-12 max-w-xs text-black sm:max-w-sm text-lg font-semibold"
        >
          <p className="z-10 tracking-tighter font-semibold text-black text-sm sm:text-base">
            Enter Website
          </p>
          <ArrowUpRight
            className="text-primary-foreground -ml-1"
            strokeWidth={2}
            size={16}
          />
        </MainBtn>
        <p className="mt-4 text-sm text-white/60">
          Ready to explore? Tap above and we&apos;ll take you straight in.
        </p>
      </div>
    </section>
  );
};
