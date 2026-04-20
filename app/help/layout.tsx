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
  },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
