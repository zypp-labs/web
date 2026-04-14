// components/sections/Footer.tsx
"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import TextZypp from "@/assets/text-zypp.svg";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Successfully subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-screen text-foreground dark px-4 sm:px-6 md:px-10 lg:px-40 py-16 sm:py-5 md:py-32">
      <div className="container">
        <div className="gap-8 sm:gap-12 lg:gap-15 flex flex-col justify-between lg:flex-row">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            <p className="relative text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight flex items-center justify-start gap-2 flex-wrap">
              Send Crypto{" "}
              <span className="text-primary font-serif font-semibold italic">
                Offline
              </span>
              <ArrowUpRight
                size={24}
                className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10"
              />
            </p>
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>Get Support : </p>
              <a href="mailto:info@zypp.fun" className="text-sm sm:text-base">
                info@zypp.fun
              </a>
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-8 sm:gap-10 text-sm font-light lg:text-base">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg"
                >
                  For Developers
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://x.com/use_zypp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-md w-full tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg group flex items-center gap-1"
                  aria-label="Follow us on X (formerly Twitter)"
                >
                  <span>Follow us on X</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg size-3 sm:size-3.5"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg group flex items-center gap-1"
                >
                  Telegram
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg size-3 sm:size-3.5"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/zypp-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg group flex items-center gap-1"
                >
                  GitHub
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg size-3 sm:size-3.5"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="gap-8 sm:gap-12 lg:gap-15 mt-12 sm:mt-16 lg:mt-20 flex flex-col justify-between lg:flex-row">
          <div className="flex w-full max-w-md flex-col gap-6 sm:gap-8 lg:gap-10">
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>Sign up for newsletter : </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="border-b-foreground/10 flex w-full items-end border-b"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Email*"
                  className="file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 text-sm sm:text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-foreground/20 mt-6 sm:mt-10 rounded-none border-0 p-0 uppercase shadow-none focus-visible:ring-0 lg:text-base"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([className*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-3 sm:px-4 py-2 has-[>svg]:px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </form>
              {status !== "idle" && (
                <p
                  className={`text-sm mt-2 ${status === "success" ? "text-green-400" : "text-red-400"
                    }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-8 sm:gap-10 text-sm font-light lg:text-base">
            <div className="w-28 xs:w-32">
              Built with love, On{" "}
              <span className="bg-linear-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                Solana
              </span>
            </div>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg group flex items-center gap-1"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-md tracking-tighter text-white hover:text-primary/70 transition-colors duration-300 text-shadow-lg group flex items-center gap-1"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <Image
            src={TextZypp}
            alt="Zypp Logo"
            width={600}
            height={600}
            className="mt-8 sm:mt-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </footer>
  );
};
