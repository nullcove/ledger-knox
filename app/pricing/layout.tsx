import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'মূল্য তালিকা',
  description: 'Ledger Knox সম্পূর্ণ ফ্রি! বাংলাদেশের সেরা ফিন্যান্সিয়াল ট্র্যাকার ব্যবহার করুন কোনো চার্জ ছাড়াই। আমাদের প্রিমিয়াম প্ল্যানও পাচ্ছেন সাশ্রয়ী মূল্যে।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/pricing',
  },
  openGraph: {
    title: 'মূল্য তালিকা | Ledger Knox',
    description: 'Ledger Knox সম্পূর্ণ ফ্রি! কোনো লুকানো চার্জ নেই।',
    url: 'https://ledgerknox.nullcove.com/pricing',
    images: [{ url: 'https://ledgerknox.nullcove.com/opengraph-image', width: 1200, height: 630, alt: 'Ledger Knox Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'মূল্য তালিকা | Ledger Knox',
    description: 'Ledger Knox সম্পূর্ণ ফ্রি! কোনো লুকানো চার্জ নেই।',
    images: ['https://ledgerknox.nullcove.com/opengraph-image'],
  },
};

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ledger Knox — মূল্য তালিকা',
  url: 'https://ledgerknox.nullcove.com/pricing',
  description: 'Ledger Knox সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য একটি প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার।',
  offers: [
    {
      '@type': 'Offer',
      name: 'মৌলিক প্ল্যান',
      price: '0',
      priceCurrency: 'BDT',
      description: 'আনলিমিটেড ট্রানজেকশন, ৪টি ডিজিটাল ওয়ালেট, বেসিক অ্যানালিটিক্স সম্পূর্ণ বিনামূল্যে।',
      availability: 'https://schema.org/InStock',
    },
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://ledgerknox.nullcove.com' },
      { '@type': 'ListItem', position: 2, name: 'মূল্য তালিকা', item: 'https://ledgerknox.nullcove.com/pricing' },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      {children}
    </>
  );
}

