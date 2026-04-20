'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, AlertCircle, Scale, ChevronLeft } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function TermsPage() {
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
             <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Legal Agreement</motion.div>
             <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">ব্যবহারের <br /><span className="text-[#92400E]">শর্তাবলী।</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-2xl mx-auto leading-relaxed">Ledger Knox ব্যবহার করার মাধ্যমে আপনি আমাদের এই শর্তাবলীর সাথে একমত পোষণ করছেন।</p>
          </section>

          <div className="prose prose-xl prose-[#111827] max-w-none space-y-16 font-bold text-[#111827]/60 leading-relaxed">
             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">১. একাউন্ট এবং ব্যবহারকারী</h2>
                <p>আমাদের সেবা পাওয়ার জন্য আপনাকে অবশ্যই সত্য এবং সঠিক তথ্য দিয়ে একাউন্ট তৈরি করতে হবে। আপনার একাউন্টের নিরাপত্তা রক্ষার দায়িত্ব সম্পূর্ণ আপনার। যেকোনো সন্দেহজনক এক্টিভিটি দেখলে সাথে সাথে আমাদের অবহিত করুন।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">২. সফটওয়্যার লাইসেন্স</h2>
                <p>Ledger Knox আপনাকে এই প্ল্যাটফর্ম ব্যবহারের একটি পার্সোনাল এবং নন-কোটেশন লাইসেন্স প্রদান করে। আপনি আমাদের কোড রিভার্স-ইঞ্জিনিয়ার করার বা ডিজাইন কন্টেন্ট চুরি করার অনুমতি রাখেন না। সমস্থ ডিজাইন এবং আর্কিটেকচার Nullcove এর স্বত্বাধিকারী।</p>
             </section>

             <section className="bg-[#111827] p-12 rounded-[48px] text-white space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-[#92400E]/20 blur-3xl rounded-full" />
                <div className="flex items-center gap-4 text-[#92400E] relative z-10">
                   <AlertCircle className="w-10 h-10" />
                   <h3 className="text-3xl font-black">সীমাবদ্ধতা</h3>
                </div>
                <div className="space-y-4 opacity-70 relative z-10">
                   <p>আমরা আমাদের সেবার মান সর্বোচ্চ রাখার চেষ্টা করি, তবে অনিবার্য কোনো যান্ত্রিক ত্রুটি বা সার্ভার ডাউনটাইমের জন্য আমরা দীর্ঘমেয়াদী লাইবেলিটি বহন করি না। আপনার ডাটা আমাদের ক্লাউডে ব্যাকআপ থাকলেও, আমরা আপনাকে নিয়মিত নিজের হিসাব রিভিউ করার পরামর্শ দিই।</p>
                </div>
             </section>

             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">৩. নিষিদ্ধ ব্যবহার</h2>
                <p>আমাদের সিস্টেম অপব্যবহার করা, অযথা সার্ভারে অতিরিক্ত রিকোয়েস্ট পাঠানো বা কোনো প্রকার ম্যালওয়্যার ছড়িয়ে দেওয়ার চেষ্টা করলে আপনার একাউন্ট স্থায়ীভাবে বাতিল করা হতে পারে। সুস্থ এবং সৃজনশীল ব্যবহারের মাধ্যমে আমরা একটি টেকসই ইকোসিস্টেম গড়ে তুলতে চাই।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827]">৪. পরিসমাপ্তি (Termination)</h2>
                <p>আপনি চাইলে যেকোনো সময় আপনার একাউন্ট ডিলিট করার মাধ্যমে এই শর্তাবলী থেকে বিদায় নিতে পারেন। একইভাবে, আমরা যদি শর্তভঙ্গের কোনো প্রমাণ পাই, তবে নির্দিষ্ট নোটিশের মাধ্যমে আপনার সেবা বন্ধ করার অধিকার রাখি।</p>
             </section>

             <section className="space-y-6 pb-20">
                <h2 className="text-4xl font-black text-[#111827]">৫. আইন ও বিচারব্যবস্থা</h2>
                <p>এই শর্তাবলী বাংলাদেশের প্রচলিত আইন অনুযায়ী পরিচালিত হবে। কোনো বিবাদ দেখা দিলে তা ঢাকা, বাংলাদেশ এর উপযুক্ত বিচার ব্যবস্থার মাধ্যমে সমাধান করা হবে। আমরা সবসময় আলোচনার মাধ্যমে সমস্যা সমাধানে বিশ্বাসী।</p>
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
