import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ব্যবহারের শর্তাবলী',
  description: 'Ledger Knox ব্যবহারের শর্তাবলী। আমাদের সেবা ব্যবহার করার আগে এই শর্তগুলো পড়ুন।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/terms',
  },
  openGraph: {
    title: 'ব্যবহারের শর্তাবলী | Ledger Knox',
    description: 'Ledger Knox ব্যবহারের শর্তাবলী।',
    url: 'https://ledgerknox.nullcove.com/terms',
    images: [{ url: 'https://ledgerknox.nullcove.com/opengraph-image', width: 1200, height: 630, alt: 'Ledger Knox Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ব্যবহারের শর্তাবলী | Ledger Knox',
    description: 'Ledger Knox সেবা ব্যবহারের শর্তাবলী।',
    images: ['https://ledgerknox.nullcove.com/opengraph-image'],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

