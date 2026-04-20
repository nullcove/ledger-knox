'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Heart, Users, CheckCircle2, Award, 
  ArrowRight, ShieldCheck, Star, Sparkles, ChevronLeft
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function AboutPage() {
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
        <div className="max-w-6xl mx-auto space-y-40">
          
          <section className="text-center space-y-10">
             <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">আমাদের গল্প</motion.div>
             <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">একটি স্বপ্ন, <br />নিখুঁত <span className="text-[#92400E]">বাস্তবায়ন</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-3xl mx-auto leading-relaxed">Ledger Knox শুধুমাত্র একটি সফটওয়্যার নয়, এটি একটি বিপ্লব। বাংলাদেশের সাধারণ মানুষের জন্য ফিন্যান্সিয়াল ডিসিপ্লিন ফিরিয়ে আনাই আমাদের প্রধান লক্ষ্য।</p>
          </section>

          {/* Vision & Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="p-16 bg-white border border-[#92400E]/10 rounded-[64px] space-y-8 shadow-sm group">
                <div className="w-16 h-16 bg-[#92400E]/5 text-[#92400E] rounded-3xl flex items-center justify-center group-hover:bg-[#92400E] group-hover:text-white transition-colors">
                   <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black">আমাদের লক্ষ্য</h3>
                <p className="text-xl font-bold text-[#111827]/50 leading-relaxed">বাঙালির ফিন্যান্সিয়াল ট্র্যাকিং এবং ব্যক্তিগত আয় ব্যয়ের হিসাব রাখাকে বিশ্বমানের স্তরে নিয়ে যাওয়া। আমরা চাই প্রতিটি ইউজার তার কষ্টের টাকার সঠিক হিসাব রাখুক লাক্সারি ইন্টারফেসে, কোনো বিজ্ঞাপন ছাড়াই। আমাদের লক্ষ্য ২০২৭ সালের মধ্যে ১ কোটি বাঙালির প্রতিদিনের সঙ্গী হওয়া।</p>
             </motion.div>
             <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="p-16 bg-[#111827] text-white rounded-[64px] space-y-8 shadow-2xl relative overflow-hidden group">
                <Sparkles className="absolute -right-4 -top-4 w-40 h-40 text-[#92400E] opacity-10 group-hover:rotate-12 transition-transform" />
                <div className="w-16 h-16 bg-white/5 text-[#92400E] rounded-3xl flex items-center justify-center">
                   <Users className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black text-white">কেন লক্স?</h3>
                <p className="text-xl font-bold text-white/50 leading-relaxed">নিরাপত্তা, আভিজাত্য এবং গতি - এই তিনটি বিষয়কে মাথায় রেখে আমরা আমাদের আর্কিটেকচার সাজিয়েছি। আমরা বিশ্বাস করি আপনার পার্সোনাল ডাটা শুধু আপনারই থাকা উচিত। তাই আমরা কোনো থার্ড পার্টি ট্র্যাকার বা এড নেটওয়ার্ক ব্যবহার করি না।</p>
             </motion.div>
          </div>

          {/* Founding Narrative Section */}
          <section className="bg-white p-20 rounded-[80px] border border-[#92400E]/10 flex flex-col items-center text-center space-y-12 shadow-sm relative overflow-hidden">
             <div className="absolute inset-0 bg-[#92400E]/5 opacity-20 pointer-events-none" />
             <div className="w-32 h-32 bg-[#92400E] rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-[#92400E]/50 z-10">R</div>
             <div className="space-y-6 z-10">
                <h4 className="text-xs font-black text-[#92400E] uppercase tracking-[0.5em]">Visionary & Founder</h4>
                <h2 className="text-6xl font-black tracking-tight text-[#111827]">Nullcove</h2>
                <p className="text-2xl font-bold italic text-[#111827]/60 max-w-3xl mx-auto leading-relaxed">"আমি যখন Ledger Knox তৈরি শুরু করি, আমার মাথায় শুধু একটি চিন্তা ছিল—কিভাবে একটি সাধারণ হিসাবের খাতা থেকে ইউজারকে একটি 'রাজকীয়' অনুভূতি দেওয়া যায়। কোডিং আর ডিজাইনকে এক করে আমরা আজ এখানে পৌঁছেছি।"</p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-10 border-t border-[#92400E]/5">
                {[
                  { value: '20+', label: 'Iterative Builds' },
                  { value: '1000+', label: 'Coffee Cups' },
                  { value: 'Infinite', label: 'Passion' },
                  { value: 'Zero', label: 'Ads Ever' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                     <p className="text-3xl font-black text-[#92400E]">{stat.value}</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#111827]/40">{stat.label}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Project Roadmap 2026 */}
          <section className="space-y-20">
             <div className="text-center space-y-6">
                <h2 className="text-5xl font-black tracking-tighter">আমাদের <span className="text-[#92400E]">রোডম্যাপ।</span></h2>
                <p className="text-xl font-bold text-[#111827]/40">আমরা থেমে নেই, প্রতিনিয়ত উদ্ভাবন করছি নতুন সব ফিচার।</p>
             </div>
             <div className="relative border-l-4 border-[#92400E]/10 ml-10 space-y-20">
                {[
                  { q: 'Q2 2026', title: 'স্মার্ট নোটিফিকেশন ইঞ্জিন', desc: 'আপনার খরচের ধরণ বুঝে স্বয়ংক্রিয়ভাবে রিমাইন্ডার দিবে আমাদের AI ইঞ্জিন।' },
                  { q: 'Q3 2026', title: 'কমিউনিটি বেঞ্চমার্কিং', desc: 'নিজেদের খরচের ধরণ অন্যান্য স্মার্ট ইউজারদের সাথে তুলনা করার সুযোগ (অ্যানোনিমাস)।' },
                  { q: 'Q4 2026', title: 'Ledger Knox API', desc: 'ডেভেলপারদের জন্য উন্মুক্ত করা হবে আমাদের সিকিউর ফিন্যান্সিয়াল ইঞ্জিন।' }
                ].map((item, i) => (
                  <div key={i} className="relative pl-12 group">
                     <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-white border-4 border-[#92400E] group-hover:scale-125 transition-transform" />
                     <p className="text-[#92400E] font-black text-sm mb-2">{item.q}</p>
                     <h4 className="text-2xl font-black mb-4">{item.title}</h4>
                     <p className="text-lg font-bold text-[#111827]/50 max-w-2xl">{item.desc}</p>
                  </div>
                ))}
             </div>
          </section>

        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Developed by NULLCOVE &copy; 2026</p>
      </footer>
    </div>
  );
}
