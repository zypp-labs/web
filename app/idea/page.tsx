import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Zypp Ideas — Submit a Product Idea",
  description: "Submit your product ideas to Zypp Labs. We build offline-first and low-connectivity systems. Share clear, practical ideas that can work in the real world.",
  keywords: "offline-first, low connectivity, product ideas, startup ideas, web3 infrastructure, zypp labs, decentralized systems, mobile payments, developer ideas",
  openGraph: {
    title: "Zypp Ideas — Submit a Product Idea",
    description: "Got an idea that works without internet? Submit it to Zypp Labs. We focus on real-world, offline-first systems.",
    type: "website",
    url: "https://idea.zypp.fun",
    images: [
      {
        url: "/idea-og.png",
        width: 1200,
        height: 630,
        alt: "Zypp Ideas — Submit a Product Idea",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Zypp Ideas — Submit a Product Idea",
    description: "Share clear, practical ideas for offline-first systems.",
    images: ["/idea-og.png"],
  }
}

const Page = () => {
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
        <iframe src="https://pine.roggy.site/f/product-idea-submission" className='w-full h-full border-0'></iframe>
    </div>
  )
}

export default Page