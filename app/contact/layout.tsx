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
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
