import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'গোপনীয়তা নীতি',
  description: 'Ledger Knox গোপনীয়তা নীতি। আমরা কিভাবে আপনার ডাটা সংগ্রহ, ব্যবহার এবং সুরক্ষা করি তা জানুন।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/privacy',
  },
  openGraph: {
    title: 'গোপনীয়তা নীতি | Ledger Knox',
    description: 'Ledger Knox আপনার প্রাইভেসি রক্ষায় প্রতিশ্রুতিবদ্ধ।',
    url: 'https://ledgerknox.nullcove.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
