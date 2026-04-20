import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'আমাদের পাশে দাঁড়ান | Ledger Knox',
  description: 'Ledger Knox বাংলাদেশের সেরা ফিন্যান্সিয়াল ট্র্যাকার যা সম্পূর্ণ ফ্রি! আমাদের এই উদ্যোগটি সচল রাখতে ডোনেট করুন। আয় ব্যয়ের হিসাব রাখুন বিনা মূল্যে।',
  keywords: ['donation', 'support ledger knox', 'free finance tracker', 'আয় ব্যয়ের হিসাব', 'বাংলাদেশের সেরা অ্যাপ'],
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/support',
  },
  openGraph: {
    title: 'আমাদের পাশে দাঁড়ান | Ledger Knox',
    description: 'Ledger Knox সম্পূর্ণ ফ্রি! কোনো লুকানো চার্জ নেই। আমাদের সচল রাখতে সাপোর্ট করুন।',
    url: 'https://ledgerknox.nullcove.com/support',
    images: [{ url: 'https://ledgerknox.nullcove.com/opengraph-image', width: 1200, height: 630, alt: 'Ledger Knox Support' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'আমাদের পাশে দাঁড়ান | Ledger Knox',
    description: 'Ledger Knox সম্পূর্ণ ফ্রি! কোনো লুকানো চার্জ নেই। আমাদের সচল রাখতে সাপোর্ট করুন।',
    images: ['https://ledgerknox.nullcove.com/opengraph-image'],
  },
};

const supportSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ledger Knox — পাশে দাঁড়ান',
  url: 'https://ledgerknox.nullcove.com/support',
  description: 'Ledger Knox সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য একটি প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার। এটি সচল রাখতে ডোনেট করুন।',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://ledgerknox.nullcove.com' },
      { '@type': 'ListItem', position: 2, name: 'পাশে দাঁড়ান', item: 'https://ledgerknox.nullcove.com/support' },
    ],
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(supportSchema) }}
      />
      {children}
    </>
  );
}
