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
    a: 'লেজার নক্স (Ledger Knox) একটি সম্পূর্ণ ফ্রি বাংলা ফিন্যান্সিয়াল ট্র্যাকার। কোনো লুকানো চার্জ ছাড়াই আপনার টাকা এবং খরচের হিসাব (khorocher hisab) রাখতে পারবেন। তবে হাই-এন্ড ইউজারদের জন্য আমাদের সাশ্রয়ী ফিউচার প্লাগিন রয়েছে।'
  },
  {
    q: 'আয় ব্যয়ের হিসাব কিভাবে রাখা শুরু করবো?',
    a: 'খুব সাধারণ! জাস্ট সাইন-আপ করুন এবং ড্যাশবোর্ড থেকে আপনার প্রতিদিনের খরচ এবং আয় এন্ট্রি দিন। এটি একটি অটোমেটেড ডিজিটাল ক্যাশবুক হিসেবে কাজ করবে যা আপনার সঞ্চয় অ্যাপ এর অভাব পূরণ করবে।'
  },
  {
    q: 'আমার ডাটা কি নিরাপদ?',
    a: 'অবশ্যই। আমরা AES-256 বিট এন্ড-টু-এন্ড এনক্রিপশন ব্যবহার করি। আপনার ডাটা শুধু আপনার ডিভাইসেই রিড-অ্যাবল থাকে।'
  },
  {
    q: 'বিকাশ বা নগদের সাথে কি অটো-সিঙ্ক হয়?',
    a: 'বর্তমানে সিকিউরিটি কারণে আমরা সরাসরি ব্যাংক বা MFS এক্সেস করি না। তবে আপনি খুব সহজে ম্যানুয়ালি এন্ট্রি দিতে পারেন যা আপনার ডিজিটাল ক্যাশবুকে সেভ হয়ে থাকবে।'
  },
  {
    q: 'আমি কি মাল্টিপল ডিভাইসে ব্যবহার করতে পারি?',
    a: 'হ্যাঁ! আপনি আপনার একাউন্ট ব্যবহার করে ফোন, ট্যাবলেট এবং পিসিতে একই সাথে ডাটা সিঙ্ক করতে পারবেন।'
  },
  {
    q: 'আমার ডাটা যদি ডিলিট হয়ে যায়?',
    a: 'আমাদের সিস্টেমে অটোমেটিক ক্লাউড ব্যাকআপ সচল থাকে। আপনি নতুন ডিভাইস থেকে লগইন করলেই আপনার সব ডটা ফিরে পাবেন।'
  },
  {
    q: 'আমি কি ডার্ক মোড ব্যবহার করতে পারব?',
    a: 'লেজার নক্স এর ইন্টারফেস ডিফল্টভাবে একটি লাক্সারি লাইট থিমে ডিজাইন করা হয়েছে। ডার্ক মোড ফিচারটি আমাদের পরবর্তী আপডেটে আসছে।'
  },
  {
    q: 'সিস্টেমে কি লিমিট আছে কতগুলো এন্ট্রি দেওয়া যাবে?',
    a: 'না, কোনো লিমিট নেই। আপনি যত খুশি ট্রানজেকশন এন্ট্রি দিতে পারেন।'
  },
  {
    q: 'আমি কি ডাটা এক্সপোর্ট করতে পারব?',
    a: 'হ্যাঁ, খুব শীঘ্রই আমরা CSV এবং PDF এক্সপোর্ট ফিচার যুক্ত করছি যা আপনার ইয়ারলি অডিট বা হিসাব নিকাশে সাহায্য করবে।'
  },
  {
    q: 'পাসওয়ার্ড ভুলে গেলে কি করব?',
    a: 'লগইন পেজে "Forget Password" অপশন ব্যবহার করে আপনার রেজিস্টার্ড ইমেইলের মাধ্যমে পাসওয়ার্ড রিসেট করতে পারবেন।'
  },
  {
    q: 'সঞ্চয় লক্ষ্য (Savings Goal) কিভাবে সেট করব?',
    a: 'ড্যাশবোর্ড এর "Goals" সেকশন থেকে আপনার টার্গেট এমাউন্ট সেট করুন। আপনি যখনই সেভিংস সেকশনে এন্ট্রি দেবেন, সিস্টেম অটোমেটিক আপনার প্রোগ্রেস আপডেট করবে।'
  },
  {
    q: 'অফলাইনে কি কাজ করে?',
    a: 'প্রাথমিক ডাটা লড হওয়ার পর আপনি ইন্টারন্টে ছাড়াই এন্ট্রি দিতে পারবেন, যা পরবর্তীতে অনলাইন হওয়ার সাথে সাথেই সিঙ্ক হয়ে যাবে।'
  },
  {
    q: 'Nullcove কে?',
    a: 'Nullcove হলো এই প্রজেক্টের প্রধান আর্কিটেক্ট এবং ডেভেলপার (Riyad Hossain)। তিনি ডিজাইন এবং কোডিং এর মাধ্যমে একটি নিখুঁত প্ল্যাটফর্ম তৈরির লক্ষ্য কাজ করছেন।'
  },
  {
    q: 'আমি কি ক্যাটাগরি কাস্টমাইজ করতে পারব?',
    a: 'হ্যাঁ, সেটিংস মেনু থেকে আপনি নিজের পছন্দমতো খরচের ক্যাটাগরি (যেমন: বাজার, উপহার, ভ্রমণ) তৈরি করতে পারবেন।'
  },
  {
    q: 'এটি কি শুধুমাত্র ব্যক্তিগত হিসাবের জন্য?',
    a: 'ব্যক্তিগত হিসাবের পাশাপাশি ছোট ব্যবসার "বাকি খাতা" বা ক্যাশবুক হিসেবেও এটি দারুণ কার্যকর।'
  },
  {
    q: 'ধার-দেনা ট্র্যাকার কিভাবে কাজ করে?',
    a: 'কাকে কত টাকা দিলেন বা কার থেকে কত নিলেন তা আলাদাভাবে সেভ করে রাখতে পারেন। পাওনা টাকা আদায় হলে সেটি এক ক্লিকেই আপডেট করা যায়।'
  },
  {
    q: 'প্রিমিয়াম ভার্সন কি আসবে?',
    a: 'বর্তমানে আমাদের সব ফিচার ফ্রিতে পাওয়া যাচ্ছে। ভবিষ্যতে কিছু স্পেশাল এন্টারপ্রাইজ ফিচার আসলে তা জানানো হবে।'
  },
  {
    q: 'কিভাবে কন্টাক্ট করব?',
    a: 'যেকোনো প্রয়োজনে আমাদের সাপোর্ট পেজ বা সরাসরি ইমেইলে যোগাযোগ করতে পারেন।'
  },
  {
    q: 'একাউন্ট ডিলিট করা কি সম্ভব?',
    a: 'হ্যাঁ, আপনার সেটিংস থেকে আপনি চাইলে স্থায়ীভাবে আপনার একাউন্ট এবং ডাটা ডিলিট করতে পারবেন।'
  },
  {
    q: 'ইনসফোর্জ (InsForge) কি?',
    a: 'ইনসফোর্জ হলো আমাদের ব্যাকএন্ড ইনফ্রাস্ট্রাকচার পার্টনার যা আপনার ডাটা ম্যানেজমেন্ট এবং অথেন্টিকেশন হ্যান্ডেল করে।'
  },
  {
    q: 'সফটওয়্যারটি কি আপডেট হবে?',
    a: 'হ্যাঁ, আমরা নিয়মিত সিকিউরিটি প্যাচ এবং নতুন ফিচার আপডেট পুশ করি।'
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
             <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">সহজ <br />সব <span className="text-[#92400E]">উত্তর</span></h1>
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
                <p className="text-[#111827]/40 font-bold max-w-sm">সরাসরি Nullcoveকে মেসেজ দিন অথবা আমাদের টিমের সাথে কথা বলুন।</p>
             </div>
             <Link href="/contact" className="bg-[#111827] text-white px-10 py-5 rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-[#92400E] transition-all">মেসেজ পাঠান</Link>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Authored by NULLCOVE &copy; 2026</p>
      </footer>
    </div>
  );
}
