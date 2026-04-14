import { CountdownGate } from "@/components/CountdownGate";
import { Footer } from "@/components/sections/Footer";
import { ForDevs } from "@/components/sections/ForDevs";
import { Hero } from "@/components/sections/Hero";
import { Illustration } from "@/components/sections/illustration";
import { NavBar } from "@/components/sections/NavBar";
import { Waitlist } from "@/components/sections/Waitlist";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function Home() {
  return (
      <div className="flex flex-col relative min-h-screen font-sans items-center justify-center bg-[#000604] text-white">
        <NavBar />
        {/* <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-green-300"
        glowColorDarkVar="--color-green-400"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      /> */}
        {/* <HeroStack /> */}
        <Hero />
        
        {/* <Illustration />
        <ForDevs />
        <Waitlist />
        <Footer /> */}
      </div>

  );
}
