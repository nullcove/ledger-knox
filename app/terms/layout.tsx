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
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
