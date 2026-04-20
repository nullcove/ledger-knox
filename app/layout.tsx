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
  description: 'Ledger Knox বাংলাদেশের ১ নম্বর প্রিমিয়াম বাংলা ফিন্যান্সিয়াল ট্র্যাকার। রিয়েল-টাইম আয় ব্যয়ের হিসাব, স্মার্ট বাজেট বিশ্লেষণ, ধার-দেনা ট্র্যাকার, ডিজিটাল ক্যাশবুক এবং বাজার তালিকা — সম্পূর্ণ ফ্রি, নিরাপদ এবং বিজ্ঞাপনমুক্ত। প্রতিদিনের খরচের হিসাব রাখুন খুব সহজে।',
  keywords: [
    'হিসাব', 'আয় ব্যয়ের হিসাব', 'খরচের হিসাব', 'টাকার হিসাব', 'বাজেট অ্যাপ', 'ফিন্যান্স', 'ট্র্যাকার',
    'ledger knox', 'বাংলাদেশি অ্যাপ', 'বাজার তালিকা', 'হিসাব নিকাশ', 'ধার দেনা', 'expense tracker bd',
    'bangla finance app', 'money manager bangladesh', 'ব্যক্তিগত অর্থ', 'ক্যাশবুক', 'টাকা ম্যানেজ',
    'সঞ্চয় অ্যাপ', 'বাজেট ম্যানেজমেন্ট', 'দোকান বাকি', 'রিকারিং বিল', 'income expense tracker',
    'digital ledger bd', 'khorocher hisab', 'aya byayer hisab', 'takar hisab app', 'hisab nikhash',
    'daily expense manager', 'best finance app bangladesh', 'personal budget planner', 'লেজার নক্স',
    'সহজ হিসাব', 'বানিজ্যিক হিসাব', 'স্টুডেন্ট বাজেট', 'ফ্যামিলি বাজেট', 'অনলাইন হিসাবের খাতা',
    'ডিজিটাল খাতা', 'টাকা ট্র্যাকার', 'টাকার সহজ হিসাব', 'ব্যক্তিগত খরচের হিসাব', 'ফ্রি অ্যাপ বাংলাদেশ',
    'সফটওয়্যার', 'অ্যাপস', 'বাজেট সফটওয়্যার', 'ম্যানেজমেন্ট সিস্টেম', 'আর্থিক হিসাব', 'বাজেট প্ল্যানার'
  ],
  authors: [{ name: 'Nullcove', url: 'https://ledgerknox.nullcove.com' }],
  creator: 'Nullcove',
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
                description: 'বাংলাদেশের প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার — সম্পূর্ণ ফ্রি। আয় ব্যয়ের হিসাব রাখার ডিজিটাল মাধ্যম।',
                founder: {
                  '@type': 'Person',
                  name: 'Nullcove',
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
                '@type': 'SoftwareApplication',
                name: 'Ledger Knox',
                url: 'https://ledgerknox.nullcove.com',
                description: 'বাংলাদেশের সেরা প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার। বাজেট, ধার, বাজার তালিকা — আয় ব্যয়ের হিসাব এখন ডিজিটাল।',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Android, iOS, Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'BDT',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  ratingCount: '150',
                },
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
