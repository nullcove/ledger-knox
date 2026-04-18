import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri } from 'next/font/google';
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
  title: 'Ledger Knox — স্মার্ট হিসাব, লাক্সারি ডিজাইন',
  description: 'Ledger Knox একটি প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার। রিয়েল-টাইম ডাটা, AI বিশ্লেষণ এবং ১০০% ফ্রি।',
  keywords: ['হিসাব', 'ফিন্যান্স', 'বাজেট', 'টাকা ট্র্যাকার', 'ledger knox'],
  authors: [{ name: 'Riyad Hossain Huzaifa' }],
  creator: 'Riyad Hossain Huzaifa',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LedgerKnox',
    startupImage: '/icons/icon-512x512.png',
  },
  applicationName: 'Ledger Knox',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'Ledger Knox — স্মার্ট হিসাব',
    description: 'প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার — সম্পূর্ণ ফ্রি',
    siteName: 'Ledger Knox',
    type: 'website',
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
        {children}
      </body>
    </html>
  );
}
