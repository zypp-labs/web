"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { OrbitingCircles } from "../custom/orbiting-cirlces";
import SolanaIcon from "@/assets/solana-icon.svg";
import CashIcon from "@/assets/dollar-icon.svg";
import OfflineIcon from "@/assets/offline-icon.svg";
import UserIcon from "@/assets/user-icon.svg";
import LogoGlow from "@/assets/logo-glow.svg";
import {
  Shield,
  Zap,
  Globe,
  Cpu,
  CircleDollarSign,
  Lock,
  Rocket,
  Key,
  Sparkles,
  Coins,
  WifiOff,
  Share,
} from "lucide-react";

export function Illustration() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const features = [
    {
      id: 1,
      text: "Offline Transactions",
      icon: WifiOff,
      description: "Send & receive without internet",
      mobileLeft: "5%",
      mobileTop: "10%",
      desktopLeft: "8%",
      desktopTop: "15%",
      delay: 0,
      color: "from-green-500/30 to-emerald-500/30",
      orbitColor: "border-emerald-400/40",
    },
    {
      id: 2,
      text: "Blazing Fast",
      icon: Zap,
      description: "Sub-second Solana transactions",
      mobileLeft: "70%",
      mobileTop: "8%",
      desktopLeft: "75%",
      desktopTop: "10%",
      delay: 200,
      color: "from-emerald-500/30 to-green-500/30",
      orbitColor: "border-emerald-400/40",
    },
    {
      id: 3,
      text: "Global Access",
      icon: Globe,
      description: "Works anywhere, anytime",
      mobileLeft: "10%",
      mobileTop: "55%",
      desktopLeft: "15%",
      desktopTop: "60%",
      delay: 400,
      color: "from-green-500/30 to-emerald-500/30",
      orbitColor: "border-emerald-400/40",
    },
    {
      id: 4,
      text: "Powered by Solana",
      icon: Cpu,
      description: "Built on high-performance blockchain",
      mobileLeft: "65%",
      mobileTop: "60%",
      desktopLeft: "70%",
      desktopTop: "65%",
      delay: 600,
      color: "from-emerald-500/30 to-green-500/30",
      orbitColor: "border-emerald-400/40",
    },
    {
      id: 5,
      text: "Zero Gas Fees",
      icon: Coins,
      description: "Peer-to-peer with no friction",
      mobileLeft: "50%",
      mobileTop: "80%",
      desktopLeft: "50%",
      desktopTop: "85%",
      delay: 800,
      color: "from-green-500/30 to-emerald-500/30",
      orbitColor: "border-emerald-400/40",
    },
    {
      id: 6,
      text: "Mass Airdrops",
      icon: Share,
      description: "Distribute tokens in one tap",
      mobileLeft: "25%",
      mobileTop: "30%",
      desktopLeft: "30%",
      desktopTop: "35%",
      delay: 1000,
      color: "from-emerald-500/30 to-green-500/30",
      orbitColor: "border-emerald-400/40",
    },
    {
      id: 7,
      text: "Secure Identity",
      icon: Shield,
      description: "Your wallet, your control",
      mobileLeft: "55%",
      mobileTop: "35%",
      desktopLeft: "60%",
      desktopTop: "40%",
      delay: 1200,
      color: "from-green-500/30 to-emerald-500/30",
      orbitColor: "border-emerald-400/40",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / rect.width;
      const py = (e.clientY - cy) / rect.height;

      setMousePosition({ x: px, y: py });

      el.style.setProperty("--parallax-x", `${px * 25}px`);
      el.style.setProperty("--parallax-y", `${py * 18}px`);
      el.style.setProperty("--tilt-x", `${py * 8}deg`);
      el.style.setProperty("--tilt-y", `${-px * 8}deg`);
    };

    const onLeave = () => {
      if (!el) return;
      el.style.setProperty("--parallax-x", `0px`);
      el.style.setProperty("--parallax-y", `0px`);
      el.style.setProperty("--tilt-x", `0deg`);
      el.style.setProperty("--tilt-y", `0deg`);
      setActiveFeature(null);
    };

    // Only add mouse effects on non-touch devices
    if (!isMobile) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [isMobile]);

  const getResponsiveValue = (small: number, medium: number, large: number) => {
    if (windowSize.width < 640) return small;
    if (windowSize.width < 1024) return medium;
    return large;
  };

  const renderParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(isMobile ? 12 : 20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-green-500/10 to-green-500/10 animate-float"
          style={{
            width: Math.random() * (isMobile ? 4 : 8) + 2,
            height: Math.random() * (isMobile ? 4 : 8) + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  );

  const renderConnectionLines = () => (
    !isMobile && (
      <svg className="absolute inset-0 pointer-events-none z-10">
        {features.map((feature) => (
          <line
            key={feature.id}
            x1="50%"
            y1="50%"
            x2={isMobile ? feature.mobileLeft : feature.desktopLeft}
            y2={isMobile ? feature.mobileTop : feature.desktopTop}
            className="stroke-white/10 stroke-1 animate-pulse"
            style={{
              animationDelay: `${feature.delay}ms`,
            }}
          />
        ))}
      </svg>
    )
  );

  const renderGradientRings = () => (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[200px] xs:w-[240px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-[200px] xs:h-[240px] sm:h-[320px] md:h-[400px] lg:h-[500px] rounded-full border border-white/5 animate-spin-slow"
          style={{ animationDuration: "40s" }}
        />
        <div
          className="absolute w-[160px] xs:w-[200px] sm:w-[280px] md:w-[360px] lg:w-[450px] h-[160px] xs:h-[200px] sm:h-[280px] md:h-[360px] lg:h-[450px] rounded-full border border-green-500/10 animate-spin"
          style={{ animationDuration: "30s", animationDirection: "reverse" }}
        />
      </div>
    </>
  );

  return (
    <div
      ref={ref}
      className="relative flex h-[60vh] xs:h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen w-full items-center justify-center overflow-hidden bg-black"
      style={{
        perspective: isMobile ? 1000 : 1200,
        transform: `
          rotateX(var(--tilt-x, 0deg)) 
          rotateY(var(--tilt-y, 0deg))
          ${windowSize.width > 1440 ? 'scale(0.95)' : ''}
        `,
        transformOrigin: 'center',
        transition: "transform 0.1s ease-out",
      }}
    >
      {renderParticleBackground()}

      {/* Enhanced decorative blur green blobs with parallax */}
      {/* <div
        className="absolute z-0 -left-20 xs:-left-30 sm:-left-40 -top-10 xs:-top-15 sm:-top-20 w-80 xs:w-100 sm:w-130 h-80 xs:h-100 sm:h-130 rounded-full bg-gradient-to-tr from-green-500/20 via-green-500/15 to-green-500/20 blur-2xl xs:blur-3xl opacity-60 animate-blob-slow parallax-transform"
        style={{
          transform: isMobile ? 'none' : `translate(calc(var(--parallax-x, 0px) * 0.3), calc(var(--parallax-y, 0px) * 0.3))`,
        }}
      />
      <div
        className="absolute z-0 -right-20 xs:-right-30 sm:-right-40 -bottom-14 xs:-bottom-20 sm:-bottom-24 w-80 xs:w-100 sm:w-130 h-80 xs:h-100 sm:h-130 rounded-full bg-gradient-to-bl from-green-500/25 via-teal-500/20 to-green-500/25 blur-2xl xs:blur-3xl opacity-40 animate-blob-slower parallax-transform"
        style={{
          transform: isMobile ? 'none' : `translate(calc(var(--parallax-x, 0px) * 0.5), calc(var(--parallax-y, 0px) * 0.5))`,
        }}
      /> */}

      {renderConnectionLines()}
      {renderGradientRings()}

      {/* Enhanced floating info cards - Hidden on mobile, shown on sm+ */}
      {features.map((feature) => {
        const IconComponent = feature.icon;
        const left = isMobile ? feature.mobileLeft : feature.desktopLeft;
        const top = isMobile ? feature.mobileTop : feature.desktopTop;

        return (
          <div
            key={feature.id}
            className={`hidden sm:flex absolute scale-90 z-30 w-fit px-2 xs:px-3 sm:px-4 lg:px-6 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 rounded-full bg-white/8 border border-white/12 backdrop-blur-xl items-center text-white shadow-2xl transition-all duration-100 group hover:scale-110 hover:bg-white/12 ${activeFeature === feature.id ? "scale-110 bg-white/12" : ""
              }`}
            style={{
              left,
              top,
              animationDelay: `${feature.delay}ms`,
              transform: isMobile ? 'none' : `translate(calc(var(--parallax-x, 0px) * 0.8), calc(var(--parallax-y, 0px) * 0.8))`,
            }}
            onMouseEnter={() => !isMobile && setActiveFeature(feature.id)}
            onMouseLeave={() => !isMobile && setActiveFeature(null)}
          >
            <div
              className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-100 bg-gradient-to-r ${feature.color} blur-sm -z-10`}
            />
            <div className="relative flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 lg:gap-3 font-semibold">
              <div className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center">
                <IconComponent
                  size={isMobile ? 12 : 16}
                  className="text-white opacity-90 transition-all duration-100 group-hover:scale-110 sm:scale-110 lg:scale-125"
                />
              </div>
              <span className="text-white/90 font-bold text-xs xs:text-sm whitespace-nowrap">
                {feature.text}
              </span>
            </div>
          </div>
        );
      })}

      {/* Enhanced central illustration with multiple layers */}
      <div className="relative z-20 flex items-center justify-center parallax-transform">
        {/* Pulsing core glow */}
        <div className="absolute w-[160px] xs:w-[200px] sm:w-[280px] md:w-[400px] lg:w-[500px] h-[160px] xs:h-[200px] sm:h-[280px] md:h-[400px] lg:h-[500px] rounded-full bg-green-500/10 blur-xl xs:blur-2xl animate-pulse" />

        {/* Main central orb with enhanced gradient */}
        <div className="relative w-[140px] xs:w-[180px] sm:w-[220px] md:w-[300px] lg:w-[380px] h-[140px] xs:h-[180px] sm:h-[220px] md:h-[300px] lg:h-[380px] rounded-full border border-white/15 backdrop-blur-xl xs:backdrop-blur-2xl overflow-hidden group">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-radial-to-br from-green-500/20 via-green-500/15 to-green-500/20 animate-gradient-xy" />

          {/* Inner grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-grid-pulse" />

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine" />
        </div>

        {/* Enhanced logo container */}
        <div className="absolute z-30 flex items-center justify-center w-[160px] xs:w-[200px] sm:w-[240px] md:w-[340px] lg:w-[420px] h-[160px] xs:h-[200px] sm:h-[240px] md:h-[340px] lg:h-[420px]">
          {/* Logo with enhanced glow */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-green-500/30 blur-lg xs:blur-xl animate-pulse-slow" />
            <div
              className="absolute inset-0 rounded-full bg-green-500/20 blur-md xs:blur-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <Image
              src={LogoGlow}
              alt="logo"
              width={160}
              height={160}
              className="relative z-10 transition-all duration-100 group-hover:scale-110 group-hover:rotate-12 drop-shadow-2xl w-16 xs:w-20 sm:w-24 md:w-32 lg:w-40"
            />
          </div>

          {/* Primary orbiting system */}
          <OrbitingCircles
            iconSize={getResponsiveValue(20, 30, 40)}
            radius={getResponsiveValue(90, 140, 180)}
            className="z-40"
            interactive={!isMobile}
            speed={1.2}
          >
            <div className="group relative">
              <Image
                src={SolanaIcon}
                alt="Solana"
                width={150}
                height={150}
                className="transition-all scale-150 xs:scale-200 sm:scale-250 duration-100 group-hover:scale-125 group-hover:drop-shadow-glow-emerald"
              />
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            </div>
            <div className="group relative">
              <Image
                src={UserIcon}
                alt="user"
                width={50}
                height={50}
                className="transition-all scale-150 xs:scale-200 sm:scale-250 duration-100 group-hover:scale-125 group-hover:drop-shadow-glow-green"
              />
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            </div>
          </OrbitingCircles>
        </div>
      </div>

      {/* Multiple orbiting systems for depth */}
      <OrbitingCircles
        iconSize={getResponsiveValue(16, 24, 30)}
        radius={getResponsiveValue(120, 200, 260)}
        reverse
        speed={1.6}
        className="z-15 opacity-80"
      >
        <div className="group">
          <Image
            src={OfflineIcon}
            alt="offline"
            width={50}
            height={50}
            className="transition-all scale-250 xs:scale-320 sm:scale-390 duration-100 group-hover:scale-125 group-hover:drop-shadow-glow-green"
          />
        </div>
        <div className="group">
          <Image
            src={CashIcon}
            alt="Cash"
            width={50}
            height={50}
            className="transition-all scale-250 xs:scale-320 sm:scale-390 duration-100 group-hover:scale-125 group-hover:drop-shadow-glow-emerald"
          />
        </div>
      </OrbitingCircles>

      {/* Third orbiting layer with Lucide icons */}
      <OrbitingCircles
        iconSize={getResponsiveValue(12, 16, 20)}
        radius={getResponsiveValue(150, 240, 320)}
        speed={0.8}
        className="z-10 opacity-60"
      >
        <div className="group flex items-center justify-center">
          <Rocket
            size={isMobile ? 14 : 20}
            className="text-white opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-100"
          />
        </div>
        <div className="group flex items-center justify-center">
          <Key
            size={isMobile ? 14 : 20}
            className="text-white opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-100"
          />
        </div>
        <div className="group flex items-center justify-center">
          <Zap
            size={isMobile ? 14 : 20}
            className="text-white opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-100"
          />
        </div>
        <div className="group flex items-center justify-center">
          <Globe
            size={isMobile ? 14 : 20}
            className="text-white opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-100"
          />
        </div>
      </OrbitingCircles>

      {/* Floating particles that follow mouse - Only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-green-500/30 blur-sm transition-transform duration-100"
              style={{
                left: `calc(50% + ${mousePosition.x * 100}px + ${Math.sin(i) * 50}px)`,
                top: `calc(50% + ${mousePosition.y * 100}px + ${Math.cos(i) * 50}px)`,
                transitionDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}