import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'যোগাযোগ করুন',
  description: 'Ledger Knox এর সাথে যোগাযোগ করুন। আপনার প্রশ্ন, মতামত বা সমস্যা জানান — আমরা সর্বদা সাহায্য করতে প্রস্তুত।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/contact',
  },
  openGraph: {
    title: 'যোগাযোগ করুন | Ledger Knox',
    description: 'Ledger Knox এর সাথে যোগাযোগ করুন। আমরা সর্বদা সাহায্য করতে প্রস্তুত।',
    url: 'https://ledgerknox.nullcove.com/contact',
    images: [{ url: 'https://ledgerknox.nullcove.com/opengraph-image', width: 1200, height: 630, alt: 'Ledger Knox — Contact' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'যোগাযোগ করুন | Ledger Knox',
    description: 'Ledger Knox এর সাথে যোগাযোগ করুন।',
    images: ['https://ledgerknox.nullcove.com/opengraph-image'],
  },
};

// ContactPage Schema
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Ledger Knox — যোগাযোগ',
  url: 'https://ledgerknox.nullcove.com/contact',
  description: 'Ledger Knox এর সাথে যোগাযোগ করুন। আপনার প্রশ্ন, মতামত বা সমস্যা জানান।',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://ledgerknox.nullcove.com' },
      { '@type': 'ListItem', position: 2, name: 'যোগাযোগ', item: 'https://ledgerknox.nullcove.com/contact' },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}

