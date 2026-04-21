"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';

const links = [
  { label: 'Terms', href: '/pay/terms' },
  { label: 'Privacy', href: '/pay/privacy' },
  { label: 'License', href: '/pay/license' },
  { label: 'Demo', href: 'https://drive.google.com/drive/u/1/folders/17DGL5Urdko10zUD8ZCTJ1RvGeBPBeNLl', external: true },
];

export const PayNavBar = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className='fixed top-4 left-1/2 -translate-x-1/2 z-20 w-[90%] md:w-2/3 h-11 md:h-12 flex items-center justify-between px-2 pl-4 md:pl-6 rounded-full bg-[#cbfac2]'
      >
        <Link href="/pay">
          <Image src="/pay-logo.svg" width={57} alt='Pay' height={500} className='w-12 md:w-[57px] h-auto' />
        </Link>

        {/* Desktop links */}
        <div className='hidden md:flex items-center gap-5'>
          {links.map(l => (
            <Link key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className='text-xs font-semibold tracking-tight text-[#163617]/70 hover:text-[#163617] transition-colors'>
              {l.label}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          {children}
          {/* Mobile hamburger */}
          <button onClick={() => setOpen(v => !v)} className='flex md:hidden items-center justify-center w-8 h-8 rounded-full bg-[#A1DC95] text-[#163617]' aria-label="Menu">
            {open ? <X className='w-4 h-4' /> : <Menu className='w-4 h-4' />}
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className='fixed top-20 left-1/2 -translate-x-1/2 z-20 w-[90%] md:hidden bg-[#cbfac2] rounded-2xl p-4 flex flex-col gap-3 shadow-sm'
          >
            {links.map(l => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className='text-sm font-semibold text-[#163617]/70 hover:text-[#163617] transition-colors'>
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
