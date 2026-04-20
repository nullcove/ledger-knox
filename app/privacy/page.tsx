'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, Database, ChevronLeft, ArrowRight } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F5] selection:bg-[#92400E]/20 text-[#111827]">
      <CustomCursor />
      
      <nav className="fixed top-0 w-full z-50 h-24 flex items-center px-12 justify-between border-b border-[#92400E]/5 bg-[#F9F7F5]/80 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#92400E] text-white px-2 py-1 rounded-xl text-lg md:text-2xl font-black italic shadow-lg shadow-[#92400E]/30">LK</div>
            <span className="text-xl font-black tracking-tighter">Ledger Knox</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#92400E]">
             <ChevronLeft className="w-4 h-4" /> হোম পেজ
          </Link>
      </nav>

      <main className="pt-48 pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          
          <section className="text-center space-y-10">
             <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Privacy & Integrity</motion.div>
             <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">গোপনীয়তা <br /><span className="text-[#92400E]">নীতি।</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-2xl mx-auto leading-relaxed">আপনার তথ্যের গোপনীয়তা রক্ষা করা আমাদের কাছে শুধু একটি পলিসি নয়, এটি একটি নৈতিক দায়িত্ব।</p>
          </section>

          <div className="prose prose-xl prose-[#111827] max-w-none space-y-16 font-bold text-[#111827]/60 leading-relaxed">
             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">১. তথ্য সংগ্রহ ও ব্যবহার</h2>
                <p>আমরা শুধুমাত্র আপনার একাউন্ট পরিচালনার জন্য প্রয়োজনীয় তথ্য সংগ্রহ করি। এর মধ্যে রয়েছে আপনার নাম, ইমেইল এবং আপনার ইনপুট দেওয়া ফিন্যান্সিয়াল ডাটা। আপনার অনুমতি ছাড়া আমরা কোনো থার্ড পার্টি অ্যাপ বা সার্ভিসের সাথে আপনার ব্যক্তিগত ডাটা শেয়ার করি না।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">২. ডাটা এনক্রিপশন</h2>
                <p>আপনার প্রতিটি ট্রানজেকশন AES-256 বিট সিস্টেমে এনক্রিপ্ট করা থাকে। এর মানে হলো আপনার ডাটা যখন আমাদের সার্ভারে ট্রান্সফার হয়, তখন তা কোনো হ্যাকারের পক্ষে পড়া অসম্ভব। এটি একটি মিলিটারি-গ্রেড সুরক্ষা ব্যবস্থা যা আপনার টাকার হিসাবকে রাখে অভেদ্য।</p>
             </section>

             <section className="bg-white p-12 rounded-[48px] border border-[#92400E]/10 space-y-8">
                <div className="flex items-center gap-4 text-[#92400E]">
                   <ShieldCheck className="w-10 h-10" />
                   <h3 className="text-3xl font-black">আমাদের অঙ্গীকার</h3>
                </div>
                <ul className="space-y-4">
                   <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-[#92400E] mt-3" /><span>আমরা কখনও আপনার ডাটা বিক্রি করি না।</span></li>
                   <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-[#92400E] mt-3" /><span>কোনো লুকানো ট্র্যাকার বা এড নেটওয়ার্ক আমরা ব্যবহার করি না।</span></li>
                   <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-[#92400E] mt-3" /><span>আপনার চাইলে যেকোনো সময় আপনার একাউন্ট স্থায়ীভাবে ডিলিট করতে পারেন।</span></li>
                </ul>
             </section>

             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">৩. কুকিজ (Cookies) নীতি</h2>
                <p>আমরা শুধুমাত্র আপনার ইউজার সেশন বজায় রাখার জন্য প্রয়োজনীয় কুকিজ ব্যবহার করি। এটি আপনাকে বারবার লগইন করার ঝামেলা থেকে মুক্তি দেয়। আমাদের কুকিজ আপনার ডিভাইসে কোনো অপ্রয়োজনীয় ট্র্যাকিং করে না।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">৪. আপনার অধিকার</h2>
                <p>আপনি আপনার ডাটা যেকোনো সময় দেখা, পরিবর্তন বা ডিলিট করার পূর্ণ অধিকার রাখেন। আমাদের "Settings" সেকশন থেকে আপনি খুব সহজেই আপনার প্রোফাইল এবং ডাটা ম্যানেজ করতে পারবেন। কোনো জটিলতা দেখা দিলে সরাসরি "Contact Support" অপশন ব্যবহার করুন।</p>
             </section>

             <section className="space-y-6 pb-20">
                <h2 className="text-4xl font-black text-[#111827]">৫. পলিসি পরিবর্তন</h2>
                <p>ভবিষ্যতে কোনো ফিচার আপডেট বা সিকিউরিটি পলিসি পরিবর্তন হলে আমরা ইমেইলের মাধ্যমে আপনাকে অবহিত করব। নতুন কোনো পরিবর্তন আপনার প্রাইভেসিকে ক্ষুন্ন করবে না, বরং আরও উন্নত করবে বলে আমরা বিশ্বাস করি।</p>
             </section>
          </div>

        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Designed by NULLCOVE &copy; 2026</p>
      </footer>
    </div>
  );
}
