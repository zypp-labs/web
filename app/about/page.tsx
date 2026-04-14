// app/about/page.tsx
import type { Metadata } from "next";
import { MainBtn } from "@/components/custom/MainBtn";
import { Spotlight } from "@/components/custom/spotlight";
import { ArrowUpRight } from "lucide-react";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Waitlist } from "@/components/sections/Waitlist";
import { scrollToWaitlist } from "@/lib/utils/scroll";
import oneImg from "@/assets/one.png";
import speedImg from "@/assets/speed.png";
import securityImg from "@/assets/security.png";
import userImg from "@/assets/user-x.png";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Discover the Zypp Labs mission, offline-first architecture, and milestones shaping the future of Solana payments.",
  path: "/about",
  keywords: ["About Zypp", "offline crypto mission", "Solana founders"],
});

export default function AboutPage() {
  const features = [
    {
      title: "Offline Functionality",
      description:
        "Enable your users to transfer assets, files, and data even without an active internet connection, drastically expanding the reach and utility of your dApp.",
      image: oneImg,
    },
    {
      title: "Solana-Native Efficiency",
      description:
        "Benefit from Solana's high-speed, low-cost blockchain for on-chain settlement, ensuring efficient and scalable transactions.",
      image: speedImg,
    },
    {
      title: "Enhanced Security",
      description:
        "Integrate with a protocol built with end-to-end encryption, local signing, and replay protection, ensuring user assets and data remain secure.",
      image: securityImg,
    },
    {
      title: "Intuitive User Experience",
      description:
        "Leverage gesture-driven interactions (like swiping and tapping) to make digital transfers feel as natural as a handshake.",
      image: userImg,
    },
  ];

  const milestones = [
    {
      year: "July 2025",
      title: "Protocol Concept",
      description: "Initial research of offline transaction technology",
    },
    {
      year: "August & September 2025",
      title: "Initial Development",
      description: "Commencement of protocol architecture and design",
    },
    {
      year: "October 2025",
      title: "Solana Cypherpunk Hackathon",
      description: "Contested in the Solana Cypherpunk Hackathon",
    },
    {
      year: "November 2025",
      title: "First Testnet Launch & Campaign",
      description: "Closed Beta Test launch of Zypp Labs on Solana Testnet",
    },
    {
      year: "December 2025",
      title: "Public Testnet Release",
      description:
        "Public release of Zypp Labs Testnet for wider testing and feedback",
    },
    {
      year: "Q1 2026",
      title: "Prepartion For Mainnet Launch",
      description:
        "Preparations for Official launch of Zypp Labs on Solana Mainnet",
    },
    {
      year: "Q2 2026",
      title: "Mainnet Launch",
      description: "Official launch of Zypp Labs on Solana Mainnet",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans items-center justify-center flex flex-col">
      <NavBar />
      <Spotlight />

      {/* Hero Section */}
      <section className="relative pt-60 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
              About <span className="text-primary font-serif italic">Zypp</span>
            </h1>
            <p className="text-md md:text-2xl text-white/70 max-w-3xl mx-auto font-medium tracking-tight">
              Revolutionizing crypto transactions by making them possible
              anywhere, even without an internet connection.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { number: "0.1s", label: "Transaction Speed" },
              { number: "$0.001", label: "Gas Fees" },
              { number: "100%", label: "Offline Capable" },
              { number: "∞", label: "Accessibility" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <div className="mw-full"> */}
      <h2 className="text-4xl md:text-5xl font-semibold text-center mt-16 tracking-tight">
        Our <span className="text-primary">Features</span>
      </h2>

      <div className="md:grid md:grid-cols-2 md:gap-7 space-y-7 flex items-center justify-center flex-col mt-12 z-10 md:px-12">
        {features.slice(0, 4).map((feature, idx) => (
          <div
            key={idx}
            className="cursor-pointer hover:scale-101 transition-transform duration-300 bg-black/5 rounded-3xl flex flex-col items-start gap-3 h-[400px] md:h-[350px] mx-11 md:mx-0 md:w-[400px] shadow-[inset_0px_-11px_33px_0px_#00E35B]/10"
          >
            {feature.image && (
              <Image
                src={feature.image}
                alt={feature.title}
                // width={48}
                // height={48}
                className="w-full object-contain"
              />
            )}
            <div className="flex flex-col self-end bottom-0 py-3 px-7 gap-2">
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-md text-white/50">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
      {/* </section> */}

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-semibold text-center mb-12 sm:mb-16 tracking-tight">
            Our <span className="text-primary">Journey</span>
          </h2>

          <div className="relative">
            {/* Timeline line - Responsive positioning */}
            <div className="absolute left-4 xs:left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-emerald-500 transform md:-translate-x-1/2"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-start md:items-center mb-8 sm:mb-10 md:mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Content - Mobile first, then desktop alternating */}
                <div
                  className={`flex-1 w-full ${index % 2 === 0
                      ? "md:pr-6 lg:pr-8 md:text-right"
                      : "md:pl-6 lg:pl-8"
                    }`}
                >
                  <div className="cursor-pointer hover:scale-[1.02] transition-transform duration-300 bg-black/5 rounded-2xl sm:rounded-3xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-none md:w-auto p-4 xs:p-5 sm:p-6 md:p-8 ml-10 xs:ml-12 sm:ml-15 md:ml-0 shadow-[inset_0px_-11px_33px_0px_#00E35B]/20 border border-white/10">
                    {/* Year - Visible on mobile, hidden on desktop (shown on opposite side) */}
                    <div className="md:hidden text-primary font-bold text-sm xs:text-base sm:text-lg mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-2 tracking-tight text-white">
                      {milestone.title}
                    </h3>
                    <p className="text-white/70 text-xs xs:text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Node - Responsive sizing and positioning */}
                <div className="absolute left-4 xs:left-5 sm:left-6 md:left-1/2 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 bg-primary rounded-full transform md:-translate-x-1/2 border-2 xs:border-3 sm:border-4 border-black z-10"></div>

                {/* Year on opposite side for desktop - Hidden on mobile */}
                <div
                  className={`flex-1 hidden md:block ${index % 2 === 0
                      ? "pl-6 lg:pl-8"
                      : "pr-6 lg:pr-8 md:text-right"
                    }`}
                >
                  <div className="text-lg lg:text-xl xl:text-2xl font-bold text-primary">
                    {milestone.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            Ready to{" "}
            <span className="text-primary font-serif italic">
              Revolutionize
            </span>{" "}
            Crypto?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto font-medium tracking-tight">
            Join us in building the future of offline digital asset transfers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MainBtn onClick={scrollToWaitlist}>
              <p className="font-semibold text-black">Get Early Access</p>
              <ArrowUpRight className="text-primary-foreground" size={16} />
            </MainBtn>
          </div>
        </div>
      </section>

      <Waitlist />
      <Footer />
    </div>
  );
}
