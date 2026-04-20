import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে | Ledger Knox',
  description: 'Ledger Knox তৈরির পেছনের গল্প। একটি বাংলা প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার যা আপনার আর্থিক জীবনকে স্মার্ট করে তোলে। Nullcove এর ডিজাইন করা বাংলাদেশের সেরা ক্যাশবুক অ্যাপ।',
  keywords: ['nullcove', 'ledger knox history', 'bangladeshi developer', 'আয় ব্যয়ের হিসাব', 'premium finance app'],
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/about',
  },
  openGraph: {
    title: 'আমাদের সম্পর্কে | Ledger Knox',
    description: 'Ledger Knox তৈরির পেছনের গল্প — একটি প্রিমিয়াম বাংলা ফিন্যান্স অ্যাপ।',
    url: 'https://ledgerknox.nullcove.com/about',
    images: [{ url: 'https://ledgerknox.nullcove.com/opengraph-image', width: 1200, height: 630, alt: 'Ledger Knox — About' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'আমাদের সম্পর্কে | Ledger Knox',
    description: 'Ledger Knox তৈরির পেছনের গল্প — প্রিমিয়াম বাংলা ফিন্যান্স অ্যাপের পেছনের মানুষ।',
    images: ['https://ledgerknox.nullcove.com/opengraph-image'],
  },
};

// Person Schema — tells Google about the creator
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nullcove',
  url: 'https://ledgerknox.nullcove.com/about',
  jobTitle: 'Software Developer & UI/UX Designer',
  description: 'Ledger Knox এর স্রষ্টা — একজন বাংলাদেশী সফটওয়্যার ডেভেলপার ও ডিজাইনার।',
  knowsAbout: ['Financial App Development', 'UI/UX Design', 'React', 'Next.js', 'TypeScript'],
  worksFor: {
    '@type': 'Organization',
    name: 'Ledger Knox',
    url: 'https://ledgerknox.nullcove.com',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {children}
    </>
  );
}

