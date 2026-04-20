import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'সহায়তা কেন্দ্র',
  description: 'Ledger Knox সহায়তা কেন্দ্র। একাউন্ট সেটআপ, লেনদেন, নিরাপত্তা এবং মোবাইল ব্যবহার সংক্রান্ত সম্পূর্ণ গাইড।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/help',
  },
  openGraph: {
    title: 'সহায়তা কেন্দ্র | Ledger Knox',
    description: 'Ledger Knox সম্পূর্ণ ব্যবহার গাইড এবং সহায়তা কেন্দ্র।',
    url: 'https://ledgerknox.nullcove.com/help',
    images: [{ url: 'https://ledgerknox.nullcove.com/opengraph-image', width: 1200, height: 630, alt: 'Ledger Knox Help Center' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'সহায়তা কেন্দ্র | Ledger Knox',
    description: 'Ledger Knox সম্পূর্ণ ব্যবহার গাইড।',
    images: ['https://ledgerknox.nullcove.com/opengraph-image'],
  },
};

const helpSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ledger Knox — সহায়তা কেন্দ্র',
  url: 'https://ledgerknox.nullcove.com/help',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://ledgerknox.nullcove.com' },
      { '@type': 'ListItem', position: 2, name: 'সহায়তা', item: 'https://ledgerknox.nullcove.com/help' },
    ],
  },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(helpSchema) }}
      />
      {children}
    </>
  );
}

