import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const tusker = localFont({
  src: './fonts/TuskerGrotesk-7600Semibold.ttf',
  variable: '--font-tusker',
  display: 'swap',
  weight: '600',
  style: 'normal',
})

const cabinet = localFont({
  src: [
    { path: './fonts/CabinetGrotesk-Light.otf', weight: '300', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Medium.otf', weight: '500', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Bold.otf', weight: '700', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-cabinet',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EXL — B2B Consultancy & Production Agency',
  description: 'We advise, produce, build, and grow for ambitious B2B and luxury brands. Senior strategy, AI-native workflows, cinematic output. Dallas.',
  icons: {
    icon: '/assets/images/exl-icon.webp',
    shortcut: '/assets/images/exl-icon.webp',
    apple: '/assets/images/exl-icon.webp',
  },
  openGraph: {
    title: 'EXL — A B2B consultancy with its own production floor.',
    description: 'Senior strategy, AI-native workflows, cinematic output. Podcasts, video, and social content shot in-house from our Dallas agency. B2B that looks like media.',
    url: 'https://exl.agency',
    images: [{ url: '/og-image.webp', width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: 'https://exl.agency',
  },
  metadataBase: new URL('https://exl.agency'),
}

import CustomCursor from '@/components/CustomCursor'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${tusker.variable} ${cabinet.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}

