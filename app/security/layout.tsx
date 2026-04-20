import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'নিরাপত্তা',
  description: 'Ledger Knox এর নিরাপত্তা ব্যবস্থা সম্পর্কে জানুন। এন্ড-টু-এন্ড এনক্রিপশন, ক্লাউড সিকিউরিটি এবং আপনার ডাটা সুরক্ষার বিস্তারিত।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/security',
  },
  openGraph: {
    title: 'নিরাপত্তা | Ledger Knox',
    description: 'Ledger Knox সর্বোচ্চ নিরাপত্তায় আপনার আর্থিক ডাটা সুরক্ষিত রাখে।',
    url: 'https://ledgerknox.nullcove.com/security',
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
