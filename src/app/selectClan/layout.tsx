import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Rajdhani } from 'next/font/google';
import { ClanProvider } from '@/context/ClanContext';
import { ReferralProvider } from '@/context/ReferralContext';
import { UserProvider } from '@/context/UserContext';
import { ENV } from '@/constant/envvariables';

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

const DOMAIN = ENV.NEXT_PUBLIC_API_BASE_URL;
const SOCIAL = ENV.NEXT_PUBLIC_X_HANDLER;

const OG_IMAGE = `${DOMAIN}/Images/gettingStarted/clansLogoog.png`;

export const metadata: Metadata = {
  title: 'Clans',
  description:
    'An AttentionFi app where identity earns. ROAR, connect, and lead your clan to victory.',
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
      'An AttentionFi app where identity earns. ROAR, connect, and lead your clan to victory.',
    url: DOMAIN,
    siteName: 'Clans',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Clans',
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
      'An AttentionFi app where identity earns. ROAR, connect, and lead your clan to victory.',
    images: [OG_IMAGE],
    creator: SOCIAL,
    site: DOMAIN,
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
    author: 'KILT Protocol',
    publisher: 'KILT Protocol',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`antialiased ${rajdhani.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <UserProvider>
        <ReferralProvider>
          <ClanProvider>{children}</ClanProvider>
        </ReferralProvider>
      </UserProvider>
    </div>
  );
}
