"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ScrollToHash() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect runs when the component mounts and when the URL changes
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#waitlist") {
        // Small delay to ensure the page has finished rendering
        setTimeout(() => {
          const waitlistSection = document.getElementById("waitlist");
          if (waitlistSection) {
            waitlistSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    // Run on initial load
    handleHash();

    // Set up a listener for hash changes
    const handleHashChange = () => {
      handleHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname, searchParams]);

  return null;
}
