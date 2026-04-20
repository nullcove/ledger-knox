import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'সাধারণ প্রশ্নোত্তর',
  description: 'Ledger Knox সম্পর্কে সাধারণ প্রশ্ন এবং উত্তর। ডাটা নিরাপত্তা, প্রাইভেসি, ফিচার এবং ব্যবহার নিয়ে সব প্রশ্নের জবাব পাবেন এখানে।',
  alternates: {
    canonical: 'https://ledgerknox.nullcove.com/faq',
  },
  openGraph: {
    title: 'সাধারণ প্রশ্নোত্তর | Ledger Knox',
    description: 'Ledger Knox সম্পর্কে সব প্রশ্নের উত্তর। ডাটা নিরাপত্তা, প্রাইভেসি, ফিচার নিয়ে বিস্তারিত।',
    url: 'https://ledgerknox.nullcove.com/faq',
  },
};

// FAQ Schema for Google Rich Results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'লেজার নক্স ব্যবহারের খরচ কত?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'লেজার নক্স ফ্রিতে ব্যবহার করা সম্ভব। তবে অ্যাডভান্সড ফিচার এবং লিমিট বাড়ানোর জন্য আমাদের সাশ্রয়ী প্রো প্ল্যান রয়েছে।',
      },
    },
    {
      '@type': 'Question',
      name: 'আমার ডাটা কি নিরাপদ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'হ্যাঁ, আপনার প্রতিটি ডাটা এনক্রিপশনে সুরক্ষিত এবং ইনসফোর্জ ক্লাউডে হোস্ট করা হয় যা হ্যাকিং রোধে প্রতিশ্রুতিবদ্ধ।',
      },
    },
    {
      '@type': 'Question',
      name: 'আমি কি ডাটা এক্সপোর্ট করতে পারবো?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'অবশ্যই! ড্যাশবোর্ড থেকে যেকোনো সময় আপনার ট্রানজেকশন ডাটা CSV হিসেবে ডাউনলোড করতে পারবেন।',
      },
    },
    {
      '@type': 'Question',
      name: 'Ledger Knox কি মোবাইলে ব্যবহার করা যায়?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'হ্যাঁ! Ledger Knox একটি PWA (Progressive Web App) — Android বা iPhone থেকে ইন্সটল করে অ্যাপের মতো ব্যবহার করা যায়।',
      },
    },
  ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}

