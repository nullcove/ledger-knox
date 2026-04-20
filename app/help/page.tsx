'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { HelpCircle, BookOpen, MessageCircle, FileText, ChevronLeft, ArrowRight, Smartphone, Settings, ShieldCheck, Download } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function HelpPage() {
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
        <div className="max-w-6xl mx-auto space-y-40">
          
          <section className="text-center space-y-10">
             <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Support Center</motion.div>
             <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">সহায়তা <br /><span className="text-[#92400E]">কেন্দ্র।</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-3xl mx-auto leading-relaxed">আপনার Ledger Knox যাত্রা সহজ করতে প্রতিটি ধাপে আমরা আছি আপনার পাশে। গাইডলাইন থেকে শুরু করে সরাসরি সাপোর্ট — সব পাবেন এখানে।</p>
          </section>

          {/* Quick Start Guide */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { title: 'শুরু করবেন যেভাবে', desc: 'একাউন্ট খোলা থেকে শুরু করে প্রথম লেনদেন এন্ট্রি দেওয়ার ধাপসমূহ।', icon: Smartphone, color: 'bg-blue-500' },
               { title: 'সেটিং কাস্টমাইজেশন', desc: 'আপনার বাজেট সীমা এবং কারেন্সি সেটিংস ম্যানেজ করার পদ্ধতি।', icon: Settings, color: 'bg-purple-500' },
               { title: 'ডাটা সিকিউরিটি', desc: 'আপনার একাউন্ট কিভাবে হ্যাকারদের হাত থেকে রক্ষা করবেন তার টিপস।', icon: ShieldCheck, color: 'bg-emerald-500' },
               { title: 'এপ্লিকেশন ইনস্টল', desc: 'ফোন বা ডেক্সটপে Ledger Knox ইনস্টল করার সহজ নিয়ম।', icon: Download, color: 'bg-[#92400E]' }
             ].map((item, i) => (
                <motion.div 
                   key={i} 
                   initial={{ y: 30, opacity: 0 }} 
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ delay: i * 0.1 }}
                   className="p-10 bg-white border border-[#92400E]/10 rounded-[48px] hover:shadow-2xl hover:shadow-[#92400E]/10 transition-all flex flex-col justify-between group"
                >
                   <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform`}>
                      <item.icon className="w-8 h-8" />
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-2xl font-black">{item.title}</h4>
                      <p className="text-sm font-bold text-[#111827]/50 leading-relaxed">{item.desc}</p>
                   </div>
                </motion.div>
             ))}
          </section>

          {/* Detailed Tutorials Placeholder */}
          <section className="bg-white p-20 md:p-32 rounded-[80px] border border-[#92400E]/10 flex flex-col lg:flex-row gap-20 items-center">
             <div className="lg:w-1/2 space-y-10">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">বিস্তারিত শিখুন।</h2>
                <div className="space-y-8">
                   {[
                     'বাজেট এবং খরচের সমন্বয় কিভাবে করবেন?',
                     'লেনদেনের ইতিহাস কিভাবে এক্সপোর্ট করবেন?',
                     'বিকাশ/নগদ এর ট্রানজেকশন আইডি দিয়ে ট্র্যাক করা।',
                     'পারিবারিক বাজেট ম্যানেজমেন্ট এর সেরা পদ্ধতি।'
                   ].map((text, i) => (
                      <div key={i} className="flex items-center justify-between p-6 border-b border-[#92400E]/5 group hover:bg-[#92400E]/5 transition-all rounded-xl cursor-default">
                         <span className="text-xl font-bold opacity-70 group-hover:opacity-100">{text}</span>
                         <ArrowRight className="w-6 h-6 text-[#92400E] opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                   ))}
                </div>
             </div>
             <div className="lg:w-1/2 bg-[#111827] rounded-[60px] p-20 text-white flex flex-col items-center text-center space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#92400E]/10 blur-[80px] rounded-full" />
                <BookOpen className="w-32 h-32 text-[#92400E] relative z-10" />
                <h3 className="text-4xl font-black relative z-10">ইউজার ম্যানুয়াল</h3>
                <p className="text-lg font-bold opacity-40 relative z-10">আপনার যদি কোনো সফটওয়্যার সম্পর্কিত জটিলতা থাকে, তবে আমাদের সম্পূর্ণ গাইড ডাউনলোড করতে পারেন।</p>
                <button className="bg-white text-[#111827] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#92400E] hover:text-white transition-all relative z-10 shadow-2xl">গাইড ডাউনলোড করুন</button>
             </div>
          </section>

          {/* Contact Support CTA */}
          <section className="text-center space-y-12 pb-20">
             <h2 className="text-4xl md:text-6xl font-black tracking-tight">এখনও সমাধান পাননি?</h2>
             <p className="text-2xl font-bold text-[#111827]/40 max-w-2xl mx-auto">আমাদের সাপোর্ট টিম সপ্তাহের ৭ দিন ২৪ ঘণ্টা আপনার সেবায় নিয়োজিত। যেকোনো কারিগরি সমস্যার জন্য আজই যোগাযোগ করুন।</p>
             <div className="flex flex-wrap justify-center gap-8 pt-10">
                <Link href="/contact" className="flex items-center gap-4 p-8 bg-white border border-[#92400E]/10 rounded-[32px] hover:scale-105 transition-all shadow-sm">
                   <div className="w-12 h-12 bg-[#92400E]/5 text-[#92400E] rounded-2xl flex items-center justify-center"><MessageCircle className="w-6 h-6" /></div>
                   <div className="text-left">
                      <p className="font-black">লাইভ চ্যাট</p>
                      <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Response in 5m</p>
                   </div>
                </Link>
                <a href="mailto:support@nullcove.com" className="flex items-center gap-4 p-8 bg-white border border-[#92400E]/10 rounded-[32px] hover:scale-105 transition-all shadow-sm">
                   <div className="w-12 h-12 bg-[#92400E]/5 text-[#92400E] rounded-2xl flex items-center justify-center"><HelpCircle className="w-6 h-6" /></div>
                   <div className="text-left">
                      <p className="font-black">ইমেইল সাপোর্ট</p>
                      <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Response in 12h</p>
                   </div>
                </a>
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
