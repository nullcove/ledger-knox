import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const hindSiliguri = Hind_Siliguri({ 
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#92400E',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ledgerknox.nullcove.com'),
  title: {
    default: 'Ledger Knox — স্মার্ট হিসাব, লাক্সারি ডিজাইন',
    template: '%s | Ledger Knox',
  },
  description: 'Ledger Knox একটি প্রিমিয়াম বাংলা ফিন্যান্সিয়াল ট্র্যাকার। রিয়েল-টাইম ডাটা, স্মার্ট বাজেট বিশ্লেষণ, ধার-দেনা ট্র্যাকিং এবং বাজার তালিকা — সম্পূর্ণ ফ্রি।',
  keywords: [
    'হিসাব', 'ফিন্যান্স', 'বাজেট', 'টাকা ট্র্যাকার', 'ledger knox', 'বাজার তালিকা',
    'ধার দেনা', 'expense tracker', 'bangla finance app', 'আয় ব্যয় হিসাব',
    'ব্যক্তিগত অর্থ', 'বাংলা অ্যাপ', 'financial tracker bangladesh', 'টাকা ম্যানেজ',
    'সঞ্চয়', 'বাজেট ম্যানেজমেন্ট', 'দোকান বাকি', 'রিকারিং বিল', 'income expense',
  ],
  authors: [{ name: 'Riyad Hossain Huzaifa', url: 'https://ledgerknox.nullcove.com' }],
  creator: 'Riyad Hossain Huzaifa',
  publisher: 'Ledger Knox',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com',
  },
  openGraph: {
    title: 'Ledger Knox — স্মার্ট হিসাব, লাক্সারি ডিজাইন',
    description: 'বাংলাদেশের সেরা প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার — সম্পূর্ণ ফ্রি। বাজেট, ধার, বাজার তালিকা সব এক জায়গায়।',
    url: 'https://ledgerknox.nullcove.com',
    siteName: 'Ledger Knox',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Ledger Knox branding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ledger Knox — স্মার্ট হিসাব, লাক্সারি ডিজাইন',
    description: 'বাংলাদেশের সেরা প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার — সম্পূর্ণ ফ্রি। বাজেট, ধার, বাজার তালিকা সব এক জায়গায়।',
    images: ['/opengraph-image'],
    creator: '@nullcove',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LedgerKnox',
    startupImage: '/icons/icon-512x512.png',
  },
  applicationName: 'Ledger Knox',
  category: 'finance',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LedgerKnox" />
        <meta name="msapplication-TileColor" content="#92400E" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) { console.log('SW registered'); })
                    .catch(function(err) { console.log('SW failed:', err); });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${hindSiliguri.className} antialiased`}
        suppressHydrationWarning
      >
        {/* Global Loading Bar */}
        <NextTopLoader
          color="#92400E"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #92400E,0 0 5px #92400E"
        />

        {/* Global JSON-LD — Server-Side for all pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Ledger Knox',
                url: 'https://ledgerknox.nullcove.com',
                logo: 'https://ledgerknox.nullcove.com/icons/icon-512x512.png',
                description: 'বাংলাদেশের প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার — সম্পূর্ণ ফ্রি।',
                founder: {
                  '@type': 'Person',
                  name: 'Riyad Hossain Huzaifa',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer support',
                  url: 'https://ledgerknox.nullcove.com/contact',
                  availableLanguage: ['Bengali', 'English'],
                },
                sameAs: ['https://ledgerknox.nullcove.com'],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Ledger Knox',
                url: 'https://ledgerknox.nullcove.com',
                description: 'বাংলাদেশের সেরা প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার — সম্পূর্ণ ফ্রি।',
                inLanguage: 'bn',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://ledgerknox.nullcove.com/help?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
