import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'সাধারণ প্রশ্নোত্তর',
  description: 'Ledger Knox সম্পর্কে সাধারণ প্রশ্ন এবং উত্তর। ডাটা নিরাপত্তা, প্রাইভেসি, ফিচার এবং ব্যবহার নিয়ে সব প্রশ্নের জবাব পাবেন এখানে।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/faq',
  },
  openGraph: {
    title: 'সাধারণ প্রশ্নোত্তর | Ledger Knox',
    description: 'Ledger Knox সম্পর্কে সব প্রশ্নের উত্তর।',
    url: 'https://ledgerknox.nullcove.com/faq',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
