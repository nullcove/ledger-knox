import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ফিচারসমূহ',
  description: 'Ledger Knox এর সব প্রিমিয়াম ফিচার দেখুন — বাজেট ট্র্যাকিং, ধার-দেনা হিসাব, বাজার তালিকা, রিকারিং বিল, সঞ্চয় লক্ষ্য এবং আরো অনেক কিছু।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/features',
  },
  openGraph: {
    title: 'ফিচারসমূহ | Ledger Knox',
    description: 'Ledger Knox এর সব প্রিমিয়াম ফিচার — বাজেট, ধার, বাজার তালিকা এবং আরো।',
    url: 'https://ledgerknox.nullcove.com/features',
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
