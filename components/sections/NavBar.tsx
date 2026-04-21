"use client";

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { ArrowUpRight, Twitter, X, Menu, Github } from 'lucide-react';
import { HyperText } from '../ui/hyper-text';

export const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className='w-full h-16 top-0 left-0 fixed z-50'>
        <div className='w-full h-full flex items-center justify-between px-4'>
          <div className='flex items-center justify-center'>
            <Link href="/" className='flex items-center gap-2'>
              <Image src="/logo.svg" alt='logo' width={100} height={100} className='w-16 h-16' /></Link>
            <h1 className='text-md font-medium opacity-70 mt-1'>{pathname === '/' ? '' : `/${pathname.split('/')[1]}`}</h1>
          </div>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center justify-center gap-8'>
            <Link href="/" className='flex items-center gap-2'>
              <HyperText duration={400} className='pointer-events-none text-xs hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Home</HyperText>
            </Link>
            <Link href="/community" className='flex items-center gap-2'>
              <HyperText duration={400} className='pointer-events-none text-xs hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Community</HyperText>
            </Link>
            <Link href="/products" className='flex items-center gap-2'>
              <HyperText duration={400} className='pointer-events-none text-xs hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Products</HyperText>
            </Link>
            <Link href="/research" className='flex items-center gap-2'>
              <HyperText duration={400} className='pointer-events-none text-xs hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Research</HyperText>
            </Link>
            <Link href="/monitor" className='flex items-center gap-2'>
              <HyperText duration={400} className='pointer-events-none text-xs hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Monitor</HyperText>
            </Link>
            <Link href="/idea" className='flex items-center gap-2'>
              <HyperText duration={400} className='pointer-events-none text-xs hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Idea</HyperText>
            </Link>
            <Link href="/pay" className='flex items-center gap-2'>
              <HyperText duration={400} className='pointer-events-none text-xs hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Pay</HyperText>
            </Link>
          </div>

          {/* Desktop Socials */}
          <div className='hidden md:flex items-center gap-3'>
            <Link href="https://github.com/zypp-labs" target='_blank' className='font-semibold items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-100 border border-white/60 hover:border-white rounded-xl px-4 py-2'>
              <Github className='w-4 h-4' />
            </Link>
            <Link href="https://x.com/use_zypp" target='_blank' className='font-semibold items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-100 border border-white/60 hover:border-white rounded-xl px-4 py-2'>
              <Twitter className='w-4 h-4' />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex md:hidden h-10 w-10 items-center justify-center transition"
            type="button"
          >
            <span className="flex flex-col items-start justify-center gap-1.5">
              <span
                className={`block h-0.5 w-6 rounded-full bg-foreground transition shadow-xl ${isOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-3 rounded-full bg-foreground transition shadow-xl ${isOpen ? "-translate-y-[5px] -rotate-45 w-6" : ""
                  }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-black/20 backdrop-blur-md z-50 transform transition-transform duration-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className='flex flex-col p-6 gap-6'>
          <button onClick={toggleMenu} className='self-end text-white mb-4'>
            <X className='w-6 h-6' />
          </button>

          <Link href="/" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='pointer-events-none text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Home</HyperText>
          </Link>
          <Link href="/community" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='pointer-events-none text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Community</HyperText>
          </Link>
          <Link href="/products" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='pointer-events-none text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Products</HyperText>
          </Link>
          <Link href="/research" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='pointer-events-none text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Research</HyperText>
          </Link>
          <Link href="/monitor" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='pointer-events-none text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Monitor</HyperText>
          </Link>
          <Link href="/idea" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='pointer-events-none text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Idea</HyperText>
          </Link>
          <Link href="/pay" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='pointer-events-none text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Pay</HyperText>
          </Link>
          {/* <Link href="https://toss.zypp.fun" onClick={toggleMenu} className='flex items-center gap-2'>
            <HyperText duration={400} className='text-sm hover:font-semibold text-white/80 hover:text-white transition-all duration-100'>Files</HyperText>
          </Link> */}

          <div className='flex gap-3 mt-4'>
            <Link href="https://github.com/zypp-labs" target='_blank' onClick={toggleMenu} className='flex font-semibold items-center gap-2 text-sm w-fit text-white/70 hover:text-white transition-all duration-100 border border-white/60 hover:border-white rounded-xl px-4 py-2'>
              <Github className='w-4 h-4' />
            </Link>
            <Link href="https://x.com/use_zypp" target='_blank' onClick={toggleMenu} className='flex font-semibold items-center gap-2 text-sm w-fit text-white/70 hover:text-white transition-all duration-100 border border-white/60 hover:border-white rounded-xl px-4 py-2'>
              <Twitter className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div onClick={toggleMenu} className='fixed inset-0 bg-black/40 z-40 md:hidden' />
      )}
    </>
  )
}
