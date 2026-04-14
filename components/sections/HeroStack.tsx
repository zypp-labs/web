"use client";

import React, { useEffect, useRef, useState } from "react";
import { Hero } from "./Hero";
import { Illustration } from "./illustration";
import { ForDevs } from "./ForDevs";
import { Developers } from "./Developers";

// HeroStack: manages a one-shot transition from hero -> illustration driven by wheel/touch.
export const HeroStack = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 = full hero, 1 = hero faded out

  useEffect(() => {
    // Simple scroll handler to fade hero based on scroll position
    const onScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      // Fade out over first 40% of window height
      const fadeProgress = Math.min(1, scrolled / (windowHeight * 0.4));
      setProgress(fadeProgress);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroOpacity = 1 - progress; // fade out only

  return (
    <>
      {/* Hero: on desktop it's fixed and fades out; on mobile it's static and fades out as it scrolls */}
      <div
        ref={containerRef}
        className="lg:fixed top-0 left-0 w-full lg:h-screen z-50 lg:pointer-events-none"
      >
        <div
          className="w-full h-full flex items-center justify-center lg:pointer-events-auto"
          style={{
            opacity: heroOpacity,
            transition: "opacity 100ms ease",
          }}
        >
          <Hero />
        </div>
      </div>

      {/* Main content: add spacing only on desktop when hero is fixed */}
      <div className="relative lg:pt-[100vh]">
        <div className="min-h-screen flex items-center justify-center">
          <Illustration />
        </div>
        <Developers />
        <ForDevs />
      </div>
    </>
  );
};
