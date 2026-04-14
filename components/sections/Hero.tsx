import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 lg:h-screen w-full font-sans relative overflow-hidden py-20 lg:py-0">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/bg.png"
          width={1920}
          height={1080}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between h-full mt-20 lg:mt-40 mb-10 items-center bg-transparent z-1 w-full gap-10 lg:gap-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full gap-8 lg:gap-0">
          <h1 className="text-white text-4xl md:text-6xl lg:text-8xl tracking-tight font-serif text-center lg:text-left">
            The network is <span className="italic">optional</span>.<br />
            <span className="text-[#04E83D]">Transactions <span className="font-medium">aren’t</span>.</span>
          </h1>
          <div className="flex flex-col items-center lg:items-end justify-center">
            <h1 className="text-white text-base md:text-lg font-medium tracking-tight text-center lg:text-right leading-tight font-sans max-w-md lg:max-w-none">
              A research‑driven initiative focused on building resilient, <br className="hidden lg:block" />offline‑first payment infrastructure for the Solana ecosystem.
            </h1>
            <Link href="https://drive.google.com/file/d/1USGGqEICwqUAfm-by6JwF4vrbQPbVdvU/view?usp=sharing" target='_blank' className='flex font-medium items-center gap-2 text-sm w-fit text-white transition-all duration-100 border border-white rounded-full px-4 py-2 mt-4'>
              Read the whitepaper
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-3 w-full">
          <div className="h-40 lg:h-45 w-full lg:w-1/3 p-6 lg:pl-8 bg-black/40 rounded-2xl lg:rounded-[3rem] relative hover:scale-101 duration-100 flex flex-col items-start justify-center backdrop-blur-sm border border-white/10">
            <h1 className="font-bold font-serif text-6xl lg:text-8xl text-white">1</h1>
            <h1 className="font-semibold text-lg lg:text-xl tracking-tight text-white">Research Papers Published</h1>
            <Link href="/research" target='_blank' className='absolute bottom-6 right-6 flex font-semibold items-center gap-2 border border-white px-5 py-2 lg:px-7 lg:py-3 rounded-full'>
              <ArrowUpRight className='w-5 h-5 lg:w-6 lg:h-6' />
            </Link>
          </div>
          <div className="h-40 lg:h-45 w-full lg:w-1/3 p-6 lg:pl-8 bg-black/40 rounded-2xl lg:rounded-[3rem] relative hover:scale-101 duration-100 flex flex-col items-start justify-center backdrop-blur-sm border border-white/10">
            <h1 className="font-bold font-serif text-6xl lg:text-8xl text-white">3+</h1>
            <h1 className="font-semibold text-lg lg:text-xl tracking-tight text-white">Partners</h1>
            <Link href="community" target='_blank' className='absolute bottom-6 right-6 flex font-semibold items-center gap-2 border border-white px-5 py-2 lg:px-7 lg:py-3 rounded-full'>
              <ArrowUpRight className='w-5 h-5 lg:w-6 lg:h-6' />
            </Link>
          </div>
          <div className="h-40 lg:h-45 w-full lg:w-1/3 p-6 lg:pl-8 bg-[#04E83D] rounded-2xl lg:rounded-[3rem] relative hover:scale-101 duration-100 flex flex-col items-start justify-center">
            <h1 className="font-bold font-serif text-6xl lg:text-8xl text-black">4</h1>
            <h1 className="font-semibold text-lg lg:text-xl tracking-tight text-black">Products Shipped</h1>
            <Link href="products" target='_blank' className='absolute bottom-6 right-6 flex font-semibold items-center gap-2 border bg-black px-5 py-2 lg:px-7 lg:py-3 rounded-full'>
              <ArrowUpRight className='w-5 h-5 lg:w-6 lg:h-6 text-white' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
