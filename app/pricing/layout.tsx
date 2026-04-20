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
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
