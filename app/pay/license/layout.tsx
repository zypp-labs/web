import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'License Agreement — Zypp Pay',
  description: 'Read the License Agreement and User Funds Policy for Zypp Pay by Zypp Labs. Non-custodial by design.',
  openGraph: {
    title: 'License Agreement — Zypp Pay',
    description: 'Read the License Agreement and User Funds Policy for Zypp Pay by Zypp Labs. Non-custodial by design.',
    type: 'website',
    url: 'https://pay.zypp.fun/license',
    images: [{ url: '/pay-og.png', width: 1200, height: 630, alt: 'Zypp Pay' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'License Agreement — Zypp Pay',
    description: 'Read the License Agreement for Zypp Pay by Zypp Labs.',
    images: ['/pay-og.png'],
  },
}

export default function LicenseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
