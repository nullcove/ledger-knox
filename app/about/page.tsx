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
        <div className="max-w-5xl mx-auto space-y-32">
          
          <section className="text-center space-y-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">আমাদের গল্প</div>
             <h1 className="text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.85]">একটি স্বপ্ন, <br />নিখুঁত <span className="text-[#92400E]">বাস্তবায়ন</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-2xl mx-auto leading-relaxed">Ledger Knox শুধুমাত্র ডাটা ট্র্যাক করে না, এটি আপনার অর্থনৈতিক জীবনকে দেয় একটি প্রিমিয়াম কাঠামো। রিয়াদ হোসেন হুজাইফা এর অক্লান্ত পরিশ্রমের ফল এই প্রজেক্ট।</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="p-16 bg-white border border-[#92400E]/10 rounded-[64px] space-y-8 shadow-sm">
                <div className="w-16 h-16 bg-[#92400E]/5 text-[#92400E] rounded-3xl flex items-center justify-center">
                   <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black">আমাদের লক্ষ্য</h3>
                <p className="text-lg font-bold text-[#111827]/50 leading-relaxed">বাঙালির ফিন্যান্সিয়াল ট্র্যাকিংকে বিশ্বমানের স্তরে নিয়ে যাওয়া। আমরা চাই প্রতিটি ইউজার তার কষ্টের টাকার সঠিক হিসাব রাখুক লাক্সারি ইন্টারফেসে।</p>
             </div>
             <div className="p-16 bg-[#111827] text-white rounded-[64px] space-y-8 shadow-2xl relative overflow-hidden group">
                <Sparkles className="absolute -right-4 -top-4 w-40 h-40 text-[#92400E] opacity-10 group-hover:rotate-12 transition-transform" />
                <div className="w-16 h-16 bg-white/5 text-[#92400E] rounded-3xl flex items-center justify-center">
                   <Users className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black text-white">কেন লক্স?</h3>
                <p className="text-lg font-bold text-white/50 leading-relaxed">নিরাপত্তা, আভিজাত্য এবং গতি - এই তিনটি বিষয়কে মাথায় রেখে আমরা আমাদের আর্কিটেকচার সাজিয়েছি।</p>
             </div>
          </div>

          <section className="bg-white p-20 rounded-[80px] border border-[#92400E]/10 flex flex-col items-center text-center space-y-12 shadow-sm">
             <div className="w-32 h-32 bg-[#92400E] rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-[#92400E]/50">R</div>
             <div className="space-y-6">
                <h4 className="text-xs font-black text-[#92400E] uppercase tracking-[0.5em]">Visionary & Founder</h4>
                <h2 className="text-6xl font-black tracking-tight">Riyad Hossain Huzaifa</h2>
                <p className="text-xl font-bold italic text-[#111827]/40 max-w-2xl mx-auto">"আমার লক্ষ্য ছিল এমন কিছু তৈরি করা যা সাধারণ মানুষকে একটি রাজকীয় অনুভূতি দেবে তাদের বাজেট ম্যানেজমেন্টের সময়।"</p>
             </div>
             <div className="flex gap-10 opacity-30 pt-10">
                <div className="text-xs font-black uppercase tracking-widest">HUZAIFA VERSE</div>
                <div className="text-xs font-black uppercase tracking-widest">PREMIUM UI/UX</div>
                <div className="text-xs font-black uppercase tracking-widest">EST. 2026</div>
             </div>
          </section>

        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Developed by RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
