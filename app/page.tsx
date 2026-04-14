import { Hero } from "@/components/sections/Hero";
import { NavBar } from "@/components/sections/NavBar";
import { Developers } from "@/components/sections/Developers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Publications } from "@/components/sections/Publications";
import { WhyItMatters } from "@/components/sections/WhyItMatters";

import { GetInvolved } from "@/components/sections/GetInvolved";

export default function Home() {
  return (
    <div className="flex flex-col relative min-h-screen font-sans items-center bg-[#000604] text-white overflow-x-hidden">
      <NavBar />
      <Hero />
      <Developers />
      <HowItWorks />
      <Publications />
      <WhyItMatters />
      <GetInvolved />
      {/* <Illustration /> */}
      {/* <ForDevs /> */}
      {/* <Waitlist /> */}
      {/* <Footer /> */}
    </div>
  );
}
