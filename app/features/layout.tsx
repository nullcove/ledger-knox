import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ফিচারসমূহ',
  description: 'Ledger Knox এর সব প্রিমিয়াম ফিচার দেখুন — বাজেট ট্র্যাকিং, ধার-দেনা হিসাব, বাজার তালিকা, রিকারিং বিল, সঞ্চয় লক্ষ্য এবং আরো অনেক কিছু।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/features',
  },
  openGraph: {
    title: 'ফিচারসমূহ | Ledger Knox',
    description: 'Ledger Knox এর সব প্রিমিয়াম ফিচার — বাজেট, ধার, বাজার তালিকা এবং আরো।',
    url: 'https://ledgerknox.nullcove.com/features',
    images: [{ url: 'https://ledgerknox.nullcove.com/opengraph-image', width: 1200, height: 630, alt: 'Ledger Knox Features' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ফিচারসমূহ | Ledger Knox',
    description: 'Ledger Knox এর সব প্রিমিয়াম ফিচার — বাজেট, ধার, বাজার তালিকা এবং আরো।',
    images: ['https://ledgerknox.nullcove.com/opengraph-image'],
  },
};


// SoftwareApplication Schema — enables Google rich results with app info
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ledger Knox',
  url: 'https://ledgerknox.nullcove.com',
  description:
    'প্রিমিয়াম বাংলা ফিন্যান্সিয়াল ট্র্যাকার। বাজেট, ধার-দেনা, বাজার তালিকা, রিকারিং বিল — সব এক জায়গায়।',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web, Android, iOS',
  inLanguage: 'bn',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BDT',
    description: 'সম্পূর্ণ বিনামূল্যে',
  },
  author: {
    '@type': 'Person',
    name: 'Riyad Hossain Huzaifa',
    url: 'https://ledgerknox.nullcove.com/about',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'রিয়েল-টাইম লেনদেন ট্র্যাকিং',
    'স্মার্ট বাজেট ম্যানেজমেন্ট',
    'ধার-দেনা হিসাব',
    'দোকান বাকি ট্র্যাকিং',
    'বাজার তালিকা',
    'রিকারিং বিল রিমাইন্ডার',
    'সঞ্চয় লক্ষ্য ট্র্যাকিং',
    'বহু মুদ্রা সাপোর্ট',
  ],
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      {children}
    </>
  );
}

