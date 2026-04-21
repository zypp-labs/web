"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const PayNavBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className='fixed top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] md:w-2/3 h-11 md:h-12 flex items-center justify-between px-2 pl-6 md:pl-6 rounded-full bg-[#cbfac2]'
    >
      <Link href="/pay">
        <Image src="/pay-logo.svg" width={57} alt='Pay' height={500} className='w-12 md:w-[57px] h-auto' />
      </Link>
      <div className='hidden md:flex items-center gap-5'>
        <Link href="/pay/terms" className='text-xs font-semibold tracking-tight text-[#163617]/70 hover:text-[#163617] transition-colors'>Terms</Link>
        <Link href="/pay/privacy" className='text-xs font-semibold tracking-tight text-[#163617]/70 hover:text-[#163617] transition-colors'>Privacy</Link>
        <Link href="/pay/license" className='text-xs font-semibold tracking-tight text-[#163617]/70 hover:text-[#163617] transition-colors'>License</Link>
        <a href="https://drive.google.com/drive/u/1/folders/17DGL5Urdko10zUD8ZCTJ1RvGeBPBeNLl" target="_blank" rel="noopener noreferrer" className='text-xs font-semibold tracking-tight text-[#163617]/70 hover:text-[#163617] transition-colors'>Demo</a>
      </div>
      {children}
    </motion.div>
  );
};
