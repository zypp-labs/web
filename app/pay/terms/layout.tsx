import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Zypp Pay',
  description: 'Read the Terms of Service for Zypp Pay, the non-custodial offline payment application by Zypp Labs.',
  openGraph: {
    title: 'Terms of Service — Zypp Pay',
    description: 'Read the Terms of Service for Zypp Pay, the non-custodial offline payment application by Zypp Labs.',
    type: 'website',
    url: 'https://pay.zypp.fun/terms',
    images: [{ url: '/pay-og.png', width: 1200, height: 630, alt: 'Zypp Pay' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — Zypp Pay',
    description: 'Read the Terms of Service for Zypp Pay by Zypp Labs.',
    images: ['/pay-og.png'],
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
