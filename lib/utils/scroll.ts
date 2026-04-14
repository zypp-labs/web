"use client";

export const scrollToWaitlist = (e?: React.MouseEvent) => {
  e?.preventDefault();

  // If we're not on the home page, navigate to home with a hash
  if (window.location.pathname !== "/") {
    window.location.href = "/#waitlist";
    return;
  }

  // If we're on the home page, scroll to the waitlist section
  const waitlistSection = document.getElementById("waitlist");
  if (waitlistSection) {
    // Add a small delay to ensure the page has finished any transitions
    setTimeout(() => {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
      // Update the URL with the hash
      window.history.pushState(null, "", "#waitlist");
    }, 100);
  }
};
