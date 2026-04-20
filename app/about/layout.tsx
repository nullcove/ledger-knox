import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে',
  description: 'Ledger Knox তৈরির পেছনের গল্প। একটি বাংলা প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার যা আপনার আর্থিক জীবনকে স্মার্ট করে তোলে।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/about',
  },
  openGraph: {
    title: 'আমাদের সম্পর্কে | Ledger Knox',
    description: 'Ledger Knox তৈরির পেছনের গল্প — একটি প্রিমিয়াম বাংলা ফিন্যান্স অ্যাপ।',
    url: 'https://ledgerknox.nullcove.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
