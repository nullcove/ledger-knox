'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Shield, Lock, ShieldAlert, Key, ChevronLeft, CheckCircle2 } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F5] text-[#111827] selection:bg-[#92400E]/20">
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
        <div className="max-w-6xl mx-auto space-y-40">
          
          <section className="text-center space-y-10">
             <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Digital Fortress</motion.div>
             <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">নিরাপদ <br /><span className="text-[#92400E]">মাস্টারপিস</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-3xl mx-auto leading-relaxed">লেজার নক্স ডাটা সিকিউরিটির ক্ষেত্রে কোনো আপস করে না। আমরা আপনার তথ্যকে একটি ইনভিজিবল ভল্টে রাখতে সক্ষম। আমাদের সিকিউরিটি প্রোটোকলগুলো গ্লোবাল স্ট্যান্ডার্ড মেনে তৈরি।</p>
          </section>

          {/* Core Security Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="p-16 bg-white border border-[#92400E]/10 rounded-[64px] space-y-8 group">
                <div className="w-16 h-16 bg-[#92400E]/5 text-[#92400E] rounded-3xl flex items-center justify-center group-hover:bg-[#92400E] group-hover:text-white transition-all">
                   <Key className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black">ডাটা এনক্রিপশন (AES-256)</h3>
                <p className="text-xl font-bold text-[#111827]/50 leading-relaxed">আপনার প্রতিটি পাসওয়ার্ড এবং ট্রানজেকশন AES-256 বিট এনক্রিপশনে সুরক্ষিত। এটি পৃথিবীর অন্যতম শক্তিশালী এনক্রিপশন স্ট্যান্ডার্ড যা মিলিটারি এবং ব্যাংকগুলো ব্যবহার করে থাকে। আপনার ডাটা আমাদের সিস্টেমে কোনোভাবেই রিড-অ্যাবল ফর্মে থাকে না।</p>
             </motion.div>
             <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="p-16 bg-white border border-[#92400E]/10 rounded-[64px] space-y-8 group">
                <div className="w-16 h-16 bg-[#92400E]/5 text-[#92400E] rounded-3xl flex items-center justify-center group-hover:bg-[#92400E] group-hover:text-white transition-all">
                   <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black">সবসময় নজরদারি</h3>
                <p className="text-xl font-bold text-[#111827]/50 leading-relaxed">আমরা ইনসফোর্জ ফায়ারওয়াল এবং রিয়েল-টাইম ডিডোস (DDoS) প্রটেকশন ব্যবহার করি। যেকোনো সন্দেহজনক এক্টিভিটি বা হ্যাকিং এর চেষ্টা সাথে সাথে আমাদের অটোমেটেড সিস্টেম ব্লক করে দেয় এবং অ্যাডমিনকে এলার্ট পাঠায়।</p>
             </motion.div>
          </div>

          {/* Technical Security Layers */}
          <section className="bg-[#111827] p-20 lg:p-32 rounded-[80px] text-white space-y-20 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[#92400E]/5 pointer-events-none" />
             <div className="max-w-4xl space-y-8 relative z-10 text-center mx-auto">
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">৩ স্তরের নিরাপত্তা লেয়ার।</h2>
                <p className="text-xl lg:text-2xl text-white/40 font-bold max-w-2xl mx-auto leading-relaxed">"আমরা কোডিং লেভেলে এমন সব সিকিউরিটি প্যাচ ব্যবহার করি যা Nullcove এর নিজস্ব সিকিউরিটি ফিলোসফি অনুযায়ী সিলেকটেড।"</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {[
                  { title: 'অ্যাপ লেভেল', desc: 'প্রতিটি সেশন এবং টোকেন ভ্যালিডেশন যা অননুমোদিত এক্সেস রোধ করে।' },
                  { title: 'নেটওয়ার্ক লেয়ার', desc: 'SSL/TLS 1.3 এনক্রিপশন যা ডাটা ট্রান্সফারের সময় হ্যাকিং প্রতিরোধ করে।' },
                  { title: 'ডাটাবেজ আর্কিটেকচার', desc: 'আইসোলেটেড ডাটাবেজ কন্টেইনার যেখানে কোনো ডিরেক্ট পাবলিক এক্সেস নেই।' }
                ].map((layer, i) => (
                  <div key={i} className="p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                     <Lock className="text-[#92400E] w-8 h-8 mb-6" />
                     <h4 className="text-2xl font-black mb-4">{layer.title}</h4>
                     <p className="text-lg font-bold opacity-40">{layer.desc}</p>
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5 relative z-10">
                  {['SSL Layered', 'Firewall Active', 'Encrypted DB', '2FA Support', 'Bot Protection', 'CSRF Guard', 'Rate Limiting', 'Daily Backups'].map((txt, i) => (
                     <div key={i} className="flex flex-col items-center gap-4">
                         <CheckCircle2 className="text-[#92400E] w-6 h-6" />
                         <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-center">{txt}</span>
                     </div>
                  ))}
             </div>
          </section>

          {/* Privacy Awareness */}
          <section className="bg-white p-20 rounded-[80px] border border-[#92400E]/10 flex flex-col md:flex-row items-center gap-20 shadow-sm">
             <div className="w-40 h-40 bg-[#92400E] rounded-full flex items-center justify-center shrink-0 shadow-2xl shadow-[#92400E]/20">
                <Shield className="w-20 h-20 text-white" />
             </div>
             <div className="space-y-6">
                <h3 className="text-4xl font-black tracking-tight">আপনার গোপনীয়তা, আমাদের গর্ব।</h3>
                <p className="text-xl font-bold text-[#111827]/50 leading-relaxed">আমরা কখনও আমাদের ইউজারদের ইমেইল বা ফোন নাম্বার কোনো মার্কেটিং এজেন্সির কাছে বিক্রি করি না। Ledger Knox এর মূল ইনকাম সোর্স হলো আপনাদের ভালোবাসা এবং সাপোর্ট। তাই আমরা আপনার আস্থার অমর্যাদা করি না।</p>
                <div className="pt-6">
                   <Link href="/privacy" className="text-[#92400E] font-black uppercase tracking-widest text-sm hover:underline underline-offset-8">বিস্তারিত প্রাইভেসি পলিসি পড়ুন</Link>
                </div>
             </div>
          </section>

        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Designed by NULLCOVE &copy; 2026</p>
      </footer>
    </div>
  );
}
