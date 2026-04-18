'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Minus, HelpCircle, MessageCircle, 
  ArrowRight, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

const FAQS = [
  {
    q: 'লেজার নক্স ব্যবহারের খরচ কত?',
    a: 'লেজার নক্স ফ্রিতে ব্যবহার করা সম্ভব। তবে অ্যাডভান্সড ফিচার এবং লিমিট বাড়ানোর জন্য আমাদের সাশ্রয়ী প্রো প্ল্যান রয়েছে।'
  },
  {
    q: 'আমার ডাটা কি নিরাপদ?',
    a: 'হ্যাঁ, আপনার প্রতিটি ডাটা এনক্রিপশনে সুরক্ষিত এবং ইনসফোর্জ ক্লাউডে হোস্ট করা হয় যা হ্যাকিং রোধে প্রতিশ্রুতিবদ্ধ।'
  },
  {
    q: 'আমি কি ডাটা এক্সপোর্ট করতে পারবো?',
    a: 'অবশ্যই! ড্যাশবোর্ড থেকে যেকোনো সময় আপনার ট্রানজেকশন ডাটা CSV হিসেবে ডাউনলোড করতে পারবেন।'
  },
  {
    q: 'রিয়াদ হোসেন হুজাইফার ক্রেডিট কেন দেওয়া হয়েছে?',
    a: 'রিয়াদ হোসেন হুজাইফা এই সিস্টেমটির আর্কিটেক্ট এবং ডিজাইনার। তার দর্শন ও অক্লান্ত পরিশ্রমকে সম্মান জানাতে এই ক্রেডিট দেওয়া হয়েছে।'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#F9F7F5] selection:bg-[#92400E]/20 text-[#111827]">
      <CustomCursor />
      
      <nav className="fixed top-0 w-full z-50 h-24 flex items-center px-12 justify-between border-b border-[#92400E]/5 bg-[#F9F7F5]/80 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#92400E] text-white px-2 py-1 rounded-lg text-lg font-black italic">LK</div>
            <span className="text-xl font-black tracking-tighter">Ledger Knox</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#92400E]">
             <ChevronLeft className="w-4 h-4" /> হোম পেজ
          </Link>
      </nav>

      <main className="pt-48 pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-32">
          
          <section className="text-center space-y-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Support Portal</div>
             <h1 className="text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.85]">সহজ <br />সব <span className="text-[#92400E]">উত্তর</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-2xl mx-auto leading-relaxed">আপনার মনে কোনো প্রশ্ন থাকলে এখানে সমাধান পাওয়ার সম্ভাবনা সবচেয়ে বেশি। এছাড়া আমাদের সাপোর্ট টিম সবসময় প্রস্তুত।</p>
          </section>

          <div className="space-y-6">
             {FAQS.map((faq, i) => (
                <div key={i} className={`rounded-[32px] overflow-hidden transition-all border ${openIndex === i ? 'bg-white border-[#92400E]/20' : 'bg-transparent border-[#92400E]/5'}`}>
                   <button 
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full p-10 flex items-center justify-between text-left transition-colors"
                   >
                      <span className="text-xl lg:text-3xl font-black tracking-tight">{faq.q}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-[#92400E] text-white' : 'bg-[#111827]/5 text-[#111827]'}`}>
                         {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                   </button>
                   <AnimatePresence>
                     {openIndex === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-10 pb-10">
                           <p className="text-lg font-bold text-[#111827]/50 leading-relaxed pt-6 border-t border-[#92400E]/5">
                             {faq.a}
                           </p>
                        </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             ))}
          </div>

          <section className="bg-white p-20 rounded-[80px] border border-[#92400E]/10 flex flex-col items-center text-center space-y-8 shadow-sm">
             <div className="w-20 h-20 bg-[#92400E]/5 text-[#92400E] rounded-full flex items-center justify-center">
                <MessageCircle className="w-10 h-10" />
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl font-black">এখানে আপনার উত্তর পাননি?</h2>
                <p className="text-[#111827]/40 font-bold max-w-sm">সরাসরি রিয়াদ হোসেন হুজাইফাকে মেসেজ দিন অথবা আমাদের টিমের সাথে কথা বলুন।</p>
             </div>
             <Link href="/contact" className="bg-[#111827] text-white px-10 py-5 rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-[#92400E] transition-all">মেসেজ পাঠান</Link>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Authored by RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
