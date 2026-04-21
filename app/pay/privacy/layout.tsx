import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Zypp Pay',
  description: 'Read the Privacy Policy for Zypp Pay. We collect minimal data and never access your private keys or seed phrases.',
  openGraph: {
    title: 'Privacy Policy — Zypp Pay',
    description: 'Read the Privacy Policy for Zypp Pay. We collect minimal data and never access your private keys or seed phrases.',
    type: 'website',
    url: 'https://pay.zypp.fun/privacy',
    images: [{ url: '/pay-og.png', width: 1200, height: 630, alt: 'Zypp Pay' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Zypp Pay',
    description: 'Read the Privacy Policy for Zypp Pay by Zypp Labs.',
    images: ['/pay-og.png'],
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
