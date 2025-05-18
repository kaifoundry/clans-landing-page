import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Rajdhani } from 'next/font/google';
import './globals.css';
import { ClanProvider } from '@/context/ClanContext';
import { Toaster } from 'react-hot-toast';
import { ReferralProvider } from '@/context/ReferralContext';
import { UserProvider } from '@/context/UserContext';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-rajdhani',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const DOMAIN = process.env.NEXT_PUBLIC_API_BASE_URL;
const OG_IMAGE = `${DOMAIN}/og-image.png`;

export const metadata: Metadata = {
  title: 'Clans',
  description:
    'Clans is your decentralized identity wallet powered by the KILT Protocol. Claim your Web3 name, manage verifiable credentials, and interact securely with the digital world.',
  keywords: [
    'KILT Protocol',
    'digital identity',
    'decentralized identity',
    'DID',
    'verifiable credentials',
    'Web3 name',
    'Clans',
    'SSI',
    'privacy',
    'identity wallet',
    'blockchain identity',
    'Web3',
    'identity management',
    'KILT',
    'self-sovereign identity',
  ],
  openGraph: {
    title: 'Clans',
    description:
      'Clans is your identity super app built on the KILT Protocol. Claim your Web3 name, manage DIDs, and control your credentials securely.',
    url: DOMAIN,
    siteName: 'Clans',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Clans - KILT Identity Wallet',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clans | Your KILT Identity Wallet',
    description:
      'Claim your Web3 name, manage decentralized credentials, and verify your identity using the KILT Protocol. Join Clans now.',
    images: [OG_IMAGE],
    creator: '@yourtwitterhandle',
    site: '@yourtwitterhandle',
  },
  alternates: {
    canonical: DOMAIN,
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: './favicon.ico' },
  ],
  other: {
    'theme-color': '#ffffff',
    'application-name': 'Clans',
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    author: 'Clans Team',
    publisher: 'Clans',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`antialiased ${rajdhani.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <UserProvider>
          <ReferralProvider>
            <ClanProvider>
              {children}
              {/* <Toaster /> */}
            </ClanProvider>
          </ReferralProvider>
        </UserProvider>
      </body>
    </html>
  );
}
