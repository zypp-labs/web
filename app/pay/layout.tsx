import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zypp Pay — Pay Without Internet',
  description: 'Spend your stablecoins even without a stable internet.',
  keywords: [
    'offline payments',
    'crypto payments',
    'solana wallet',
    'gasless transactions',
    'web3 payments',
    'self custodial wallet',
    'offline crypto',
    'mobile payments',
    'decentralized payments',
    'pay without internet'
  ],
  openGraph: {
    title: 'Pay Without Internet — Zypp Pay',
    description: 'Spend your stablecoins even without a stable internet.',
    type: 'website',
    url: 'https://pay.zypp.fun',
    images: [
      {
        url: '/pay-og.png',
        width: 1200,
        height: 630,
        alt: 'Zypp Pay — Pay Without Internet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zypp Pay — Offline Payments, Finally',
    description: 'Spend your stablecoins even without a stable internet.',
    images: ['/pay-og.png'],
  },
}

export default function PayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
