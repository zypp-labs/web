import Image from "next/image";
import React from "react";
import oneImg from "@/assets/one.png";
import speedImg from "@/assets/speed.png";
import securityImg from "@/assets/security.png";
import userImg from "@/assets/user-x.png";
import { MainBtn } from "../custom/MainBtn";
import { ArrowUpRight } from "lucide-react";
import Github from "@/assets/github.svg";
import Link from "next/link";

export const ForDevs = () => {
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
  return (
    <div className="flex flex-col mt-8 sm:mt-[5rem] items-center bg-transparent justify-center min-h-screen w-screen font-sans relative overflow-hidden px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center max-w-3xl px-2 sm:px-4">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-semibold text-[#00FF84] mb-1 sm:mb-4 z-10 tracking-tighter text-center">
          For Developers:
        </h2>
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-semibold text-white mb-4 z-10 tracking-tighter text-center">
          Build with Zypp Labs
        </h2>
        <p className="text-sm xs:text-base sm:text-md w-full max-w-2xl font-medium text-white mb-4 z-10 tracking-tight opacity-70 text-center mt-2 sm:mt-4 px-2 sm:px-0">
          Zypp Labs offers a foundational SDK to integrate DropFi capabilities into your dApps, enabling instant, offline, peer-to-peer transfers of on-chain and off-chain assets.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 mt-8 sm:mt-12 z-10 w-full max-w-4xl px-2 sm:px-4">
        {features.slice(0, 4).map((feature, idx) => (
          <div
            key={idx}
            className="cursor-pointer hover:scale-[1.02] transition-transform duration-100 bg-black/5 rounded-2xl my-2 sm:rounded-3xl flex flex-col items-start gap-3 h-[300px] xs:h-[320px] sm:h-[350px] md:h-[320px] w-full max-w-md mx-auto shadow-[inset_0px_-11px_33px_0px_#00E35B]/5"
          >
            {feature.image && (
              <Image
                src={feature.image}
                alt={feature.title}
                className="w-full object-contain object-center"
              />
            )}
            <div className="flex flex-col self-end bottom-0 py-3 px-4 sm:px-7 gap-2 w-full">
              <h3 className="text-base xs:text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-xs xs:text-sm text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-12 sm:mt-20 px-2 sm:px-0">
        <h3 className="text-xl xs:text-2xl sm:text-4xl text-center font-semibold text-white tracking-tight">
          What You Can <span className="text-[#00E35B]">Build</span>
        </h3>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-5 mt-6 sm:mt-8 justify-center max-w-[900px] px-2">
          {[
            "Offline NFT Marketplaces",
            "P2P Token Swaps",
            "Local Content Sharing",
            "In-Game Item Trading",
            "Decentralized File Sharing",
          ].map((label) => (
            <div
              key={label}
              className="px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-3 border border-[#00E397]/30 bg-[#3FF399]/5 rounded-full cursor-pointer hover:scale-105 transition text-xs xs:text-sm sm:text-base whitespace-nowrap"
            >
              {label}
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-row items-center mt-8 sm:mt-10 gap-3 justify-center w-full px-4">
          <MainBtn className="">
            <p className="relative z-10 font-semibold text-black text-sm sm:text-base">
              Get early access
            </p>
            <ArrowUpRight
              className="-ml-1 text-primary-foreground"
              size={12}
              strokeWidth={2}
            />
          </MainBtn>

          <Link href="https://github.com/zypp-labs" className="mt-0">
            <Image
              src={Github}
              alt="GitHub"
              width={32}
              height={32}
              className="cursor-pointer hover:opacity-80 transition w-8 h-8 xs:w-9 xs:h-9"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};