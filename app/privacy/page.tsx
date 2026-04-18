'use client';

import Link from 'next/link';
import { Shield, Lock, Eye, ChevronLeft } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F5] text-[#111827] selection:bg-[#92400E]/20">
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
        <div className="max-w-3xl mx-auto space-y-20">
          <section className="text-center space-y-8">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Legal Document</div>
             <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-none">প্রাইভেসি <br /><span className="text-[#92400E]">পলিসি</span></h1>
             <p className="text-xl font-bold opacity-40">সর্বশেষ আপডেট: ১৭ এপ্রিল, ২০২৬</p>
          </section>

          <div className="prose prose-stone prose-2xl max-w-none space-y-16 font-medium text-[#111827]/70 leading-relaxed">
             <section className="space-y-6">
                <h2 className="text-5xl font-black text-[#111827] tracking-tight">১. ডাটা সংগ্রহ</h2>
                <p>আমরা শুধুমাত্র আপনার একাউন্ট তৈরির জন্য প্রয়োজনীয় তথ্য সংগ্রহ করি। এর মধ্যে রয়েছে আপনার নাম, ইমেইল এবং আপনার ইনপুট দেওয়া ফিন্যান্সিয়াল ডাটা। আপনার অনুমতি ছাড়া কোনো ডাটা থার্ড-পার্টিকে দেওয়া হয় না।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-5xl font-black text-[#111827] tracking-tight">২. ডাটা ব্যবহার</h2>
                <p>আপনার ব্যক্তিগত হিসাব বিশ্লেষণের জন্য এবং অ্যাপ্লিকেশনের ফিচারগুলো সঠিকভাবে কাজ করার জন্য ডাটা ব্যবহার করা হয়। লেজার নক্স সিস্টেমে রিয়াদ হোসেন হুজাইফা এর স্থাপত্যশৈলী অনুযায়ী ডাটা হাইলি সিকিউরড।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-5xl font-black text-[#111827] tracking-tight">৩. সিকিউরিটি লেভেল</h2>
                <p>আমরা ইনসফোর্জ ইনফ্রাস্ট্রাকচার ব্যবহার করি, যা ইন্ডাস্ট্রি স্ট্যান্ডার্ড সিকিউরিটি নিশ্চিত করে। আপনার প্রতিটি ট্রানজেকশন এনক্রিপ্টেড এবং নিরাপদ ভল্টে সংরক্ষিত।</p>
             </section>

             <section className="p-16 bg-white border border-[#92400E]/10 rounded-[48px] space-y-4">
                <Shield className="w-12 h-12 text-[#92400E] mb-4" />
                <h4 className="text-3xl font-black">আমাদের অঙ্গীকার</h4>
                <p className="text-lg opacity-60">রিয়াদ হোসেন হুজাইফা ব্যক্তিগতভাবে আমাদের সিস্টেমের ডাটা ইন্টিগ্রিটি মনিটর করেন। আপনার তথ্য ১০০% গোপন রাখা আমাদের প্রধান অগ্রাধিকার।</p>
             </section>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Authored & Credited to RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
