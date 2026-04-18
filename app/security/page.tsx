'use client';

import Link from 'next/link';
import { Shield, Lock, ShieldAlert, Key, ChevronLeft, CheckCircle2 } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function SecurityPage() {
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
        <div className="max-w-4xl mx-auto space-y-32">
          
          <section className="text-center space-y-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Digital Fortress</div>
             <h1 className="text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.85]">নিরাপদ <br /><span className="text-[#92400E]">মাস্টারপিস</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-2xl mx-auto leading-relaxed">লেজার নক্স ডাটা সিকিউরিটির ক্ষেত্রে কোনো আপস করে না। আমরা আপনার তথ্যকে একটি ইনভিজিবল ভল্টে রাখতে সক্ষম।</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="p-16 bg-white border border-[#92400E]/10 rounded-[64px] space-y-8">
                <div className="w-16 h-16 bg-[#92400E]/5 text-[#92400E] rounded-3xl flex items-center justify-center">
                   <Key className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black">ডাটা এনক্রিপশন</h3>
                <p className="text-lg font-bold text-[#111827]/50 leading-relaxed">আপনার প্রতিটি পাসওয়ার্ড এবং ট্রানজেকশন AES-256 বিট এনক্রিপশনে সুরক্ষিত। আপনার ডাটা আমাদের সিস্টেমে রিড-অ্যাবল ফর্মে থাকে না।</p>
             </div>
             <div className="p-16 bg-white border border-[#92400E]/10 rounded-[64px] space-y-8">
                <div className="w-16 h-16 bg-[#92400E]/5 text-[#92400E] rounded-3xl flex items-center justify-center">
                   <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black">রিয়েল-টাইম থ্রেট মনিটরিং</h3>
                <p className="text-lg font-bold text-[#111827]/50 leading-relaxed">আমরা ইনসফোর্জ ফায়ারওয়াল এবং ডিডোস (DDoS) প্রটেকশন ব্যবহার করি। যেকোনো সন্দেহজনক এক্টিভিটি সাথে সাথে ব্লক হয়ে যায়।</p>
             </div>
          </div>

          <section className="bg-[#111827] p-20 lg:p-32 rounded-[80px] text-white space-y-12 relative overflow-hidden text-center">
             <div className="space-y-6 relative z-10">
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">বিশ্বস্ত আর্কিটেকচার</h2>
                <p className="text-xl lg:text-3xl text-white/40 font-bold max-w-2xl mx-auto">"আমরা কোডিং লেভেলে এমন সব সিকিউরিটি প্যাচ ব্যবহার করি যা রিয়াদ হোসেন হুজাইফা এর নিজস্ব সিকিউরিটি ফিলোসফি অনুযায়ী সিলেকটেড।"</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10">
                 {['SSL Layered', 'Firewall Active', 'Encrypted DB', '2FA Support'].map((txt, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                        <CheckCircle2 className="text-[#92400E] w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{txt}</span>
                    </div>
                 ))}
             </div>
          </section>

        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Designed by RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
