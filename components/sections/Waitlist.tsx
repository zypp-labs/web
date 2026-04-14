// components/sections/Waitlist.tsx
"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { MainBtn } from "../custom/MainBtn";
import { Spotlight } from "../custom/spotlight";
import { AvatarCircles } from "../custom/avatar-circles";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const avatars = [
    { imageUrl: "https://avatars.githubusercontent.com/u/16860528" },
    { imageUrl: "https://avatars.githubusercontent.com/u/20110627" },
    { imageUrl: "https://avatars.githubusercontent.com/u/106103625" },
    { imageUrl: "https://avatars.githubusercontent.com/u/59228569" },
    { imageUrl: "https://avatars.githubusercontent.com/u/59442788" },
    { imageUrl: "https://avatars.githubusercontent.com/u/89768406" },
  ];

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
    } catch {
      setStatus("error");
      setMessage("Failed to join waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="waitlist"
      className="flex flex-col mt-20 sm:mt-40 items-center justify-center min-h-screen w-screen font-sans relative overflow-hidden px-4"
    >
      <Spotlight />
      <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 sm:mb-6 tracking-tight z-20 text-center">
        Be the First to{" "}
        <span className="tracking-normal text-primary font-semibold font-serif italic">
          Zypp
        </span>
      </h2>
      <p className="text-center max-w-md xs:max-w-xl mb-6 sm:mb-8 text-xs xs:text-sm sm:text-md opacity-80 font-medium line-clamp-4 leading-5.5 px-2">
        Be the first to experience the future of offline crypto transactions.
        Join our waitlist to get early access, exclusive updates, and special
        offers.
      </p>

      {/* Status Message */}
      {status !== "idle" && (
        <div
          className={`flex items-center gap-2 mb-4 px-4 py-3 rounded-2xl text-sm ${
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

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs xs:max-w-sm sm:max-w-md"
      >
        <div className="bg-neutral-400/20 h-12 xs:h-14 rounded-full w-full px-2 xs:px-4 flex items-center justify-between">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="bg-transparent border-0! outline-none! focus:ring-0 h-full w-full px-1 xs:px-2 sm:px-6 focus:border-0 focus:outline-0 active:ring-0 text-white placeholder:text-white/70 text-xs xs:text-sm sm:text-lg"
          />
          <MainBtn
            type="submit"
            disabled={loading}
            className="text-primary-foreground tracking-tighter font-semibold text-sm py-1 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Joining..." : "Join the waitlist"}
          </MainBtn>
        </div>
      </form>

      <div className="flex items-center justify-center mt-4 sm:mt-5 gap-2 text-sm xs:text-base">
        <AvatarCircles numPeople={62} avatarUrls={avatars} />
        are already sat!
      </div>
    </div>
  );
};
