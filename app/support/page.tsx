'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Heart, Smartphone, ArrowRight, ChevronLeft, 
  Sparkles, ShieldCheck, Zap, Globe, Star,
  Coffee, Shield, Rocket, Target, Users,
  Code, LineChart, Lock, Server, MessageSquare,
  Gift, HeartHandshake, EyeOff, LayoutDashboard,
  Cpu, Database, Cloud, Activity
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import { useState } from 'react';

export default function SupportPage() {
  const [copied, setCopied] = useState(false);
  const bKashNumber = '01910112001';

  const handleCopy = () => {
    navigator.clipboard.writeText(bKashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] selection:bg-[#92400E]/20 text-[#111827]">
      <CustomCursor />
      
      <nav className="fixed top-0 w-full z-50 h-24 flex items-center px-12 justify-between border-b border-[#92400E]/5 bg-[#F9F7F5]/80 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#92400E] text-white px-2 py-1 rounded-lg text-lg font-black italic">LK</div>
            <span className="text-xl font-black tracking-tighter text-[#111827]">Ledger Knox</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#92400E]">
             <ChevronLeft className="w-4 h-4" /> হোম পেজ
          </Link>
      </nav>

      <main className="pt-48 pb-32 px-6">
        <div className="max-w-6xl mx-auto space-y-40">
          
          {/* Section 2: Why We Need Support (Design Dense Grid) */}
          <section className="space-y-16">
             <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter">আমাদের অপারেশনাল খরচ</h2>
                <div className="w-16 h-1 bg-[#92400E] rounded-full" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Server, title: 'ক্লাউড ইনফ্রা', desc: 'রিয়েল-টাইম ডাটা আপডেট ও হোস্টিং খরচ।', active: true },
                  { icon: Database, title: 'ডাটাবেস সিকিউরিটি', desc: 'মিলিটারি-গ্রেড এনক্রিপশন ও ব্যাকআপ সার্ভিস।', active: true },
                  { icon: Cpu, title: 'AI এপিআই খরচ', desc: 'স্মার্ট সাজেশন ও অ্যানালিটিক্স প্রসেসিং পাওয়ার।', active: true },
                  { icon: Globe, title: 'সিডিএন নেটওয়ার্ক', desc: 'সারা দেশ জুড়ে হাই-স্পিড এক্সেস নিশ্চিত করা।', active: true }
                ].map((item, i) => (
                  <div key={i} className="p-10 bg-white rounded-[40px] border border-[#92400E]/5 shadow-sm space-y-4 hover:border-[#92400E]/30 transition-all group">
                     <div className="w-12 h-12 bg-[#92400E]/5 text-[#92400E] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-black">{item.title}</h3>
                     <p className="text-sm font-bold text-[#111827]/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Section 3: The Story (Info-Rich, Normal Font) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start border-y border-[#92400E]/10 py-24">
             <div className="space-y-8">
                <h2 className="text-4xl font-black tracking-tight leading-tight">সবুজ বাংলাদেশের <br /><span className="text-[#92400E]">ডিজিটাল লেজার।</span></h2>
                <p className="text-lg font-bold text-[#111827]/60 leading-relaxed text-justify">
                  Nullcove যখন এই প্রজেক্টটি শুরু করেন, তখন তাঁর সামনে একটিই লক্ষ্য ছিল—এমন একটি টুল তৈরি করা যা বাংলাদেশের মধ্যবিত্ত পরিবারগুলোর প্রতিদিনের আর্থিক হিসাবকে সুন্দর করে তুলবে। রাত জেগে কোডিং আর প্রতিনিয়ত ডিবাগিং করতে গিয়ে তিনি কখনোই চান নি এটি কোনো পেইড সার্ভিস হোক। 
                </p>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-[#92400E]/5 rounded-2xl border-l-4 border-[#92400E]">
                      <h4 className="text-xl font-black text-[#92400E]">১০,০০০+</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#111827]/40">Active Users</p>
                   </div>
                   <div className="p-6 bg-[#92400E]/5 rounded-2xl border-l-4 border-[#92400E]">
                      <h4 className="text-xl font-black text-[#92400E]">১০০%</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#111827]/40">Ad-Free Experience</p>
                   </div>
                </div>
             </div>
             
             <div className="space-y-8">
                <div className="p-10 bg-[#111827] text-white rounded-[56px] space-y-6">
                   <h4 className="text-2xl font-black text-[#92400E]">কেন আপনার ডোনেশন প্রয়োজন?</h4>
                   <ul className="space-y-4 text-sm font-bold text-white/40 leading-relaxed">
                      <li className="flex gap-4">
                        <div className="w-5 h-5 flex-shrink-0 bg-[#92400E] rounded-full flex items-center justify-center text-white text-[10px]">১</div>
                        <span>লেজার নক্স কোনো প্রোফিট-মেকিং কোম্পানি নয়।</span>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-5 h-5 flex-shrink-0 bg-[#92400E] rounded-full flex items-center justify-center text-white text-[10px]">২</div>
                        <span>উন্নত ক্লাউড টেকনোলজি ব্যবহার করায় এর অপারেটিং কস্ট বেশ বেশি।</span>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-5 h-5 flex-shrink-0 bg-[#92400E] rounded-full flex items-center justify-center text-white text-[10px]">৩</div>
                        <span>আপনার ছোট একটি সাপোর্টে আমরা এই প্লাটফর্মটি সারাজীবন ফ্রি রাখতে পারব।</span>
                      </li>
                   </ul>
                </div>
             </div>
          </section>

          {/* Section 4: Step by Step Guide (NEW) */}
          <section className="space-y-16">
             <div className="text-center space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-widest">কিভাবে পাশে দাঁড়াবেন?</h2>
                <div className="w-12 h-1 bg-[#92400E] mx-auto" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { step: '০১', title: 'নাম্বার কপি করুন', desc: 'নিচের বিকাশ পার্সোনাল নাম্বারটি কপি করে নিন।' },
                  { step: '০২', title: 'অ্যামাউন্ট পাঠান', desc: 'বিকাশ অ্যাপ থেকে আপনার সামর্থ্য অনুযায়ী ডোনেশন ট্র্যান্সফার করুন।' },
                  { step: '০৩', title: 'অনুপ্রেরণা দিন', desc: 'আপনার এই কন্ট্রিবিউশন আমাদের আগামীর পথকে সহজ করবে।' }
                ].map((item, i) => (
                  <div key={i} className="text-center space-y-6 relative p-12">
                     <span className="text-8xl font-black text-[#92400E]/5 absolute top-0 left-1/2 -translate-x-1/2 leading-none">{item.step}</span>
                     <div className="relative z-10 space-y-4">
                        <h4 className="text-xl font-black">{item.title}</h4>
                        <p className="text-sm font-bold text-[#111827]/40 leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Section 5: The Contribution Card (Refined Size) */}
          <div className="flex flex-col items-center space-y-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={handleCopy}
                className="w-full max-w-2xl bg-[#111827] text-white p-16 md:p-24 rounded-[64px] shadow-2xl relative overflow-hidden group cursor-pointer"
              >
                  <div className="absolute top-0 right-0 p-32 bg-[#92400E]/20 blur-[100px]" />
                  <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                     <div className="w-16 h-16 bg-[#E2136E] rounded-2xl flex items-center justify-center shadow-xl mb-4 group-hover:rotate-6 transition-transform">
                        <Smartphone className="w-8 h-8 text-white" />
                     </div>
                     <div className="space-y-2">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#92400E]">বিকাশ পার্সোনাল</h2>
                        <p className="text-5xl md:text-7xl font-black tracking-tight">{bKashNumber}</p>
                     </div>
                     <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#E2136E] transition-all">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] font-mono text-white/60 group-hover:text-white">
                           {copied ? 'নাম্বারটি কপি হয়েছে!' : 'কপি করতে ট্যাপ করুন'}
                        </p>
                     </div>
                  </div>
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-10 opacity-30 text-[9px] font-black uppercase tracking-[0.4em]">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> Secure Payment
                 </div>
                 <div className="flex items-center gap-2">
                    <Heart className="w-3 h-3" /> Community Support
                 </div>
                 <div className="flex items-center gap-2">
                    <Star className="w-3 h-3" /> Verified by Nullcove
                 </div>
              </div>
          </div>

          {/* Section 6: Future Goals (Roadmap) */}
          <section className="space-y-12 bg-white p-12 md:p-20 rounded-[64px] border border-[#92400E]/5">
             <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight">আগামীর পথনকশা — ২০২৬</h3>
                <p className="text-sm font-bold text-[#111827]/30 italic leading-relaxed">আপনার সাপোর্ট পেলে আমরা এই মাসে যে মডিউলগুলোতে ফোকাস করব:</p>
             </div>
             
             <div className="space-y-8">
                {[
                  { name: 'স্মার্ট ফিন্যান্সিয়াল ডাটা ব্যাকআপ', progress: 85 },
                  { name: 'এআই ভিত্তিক অটো-ক্যাটগরি', progress: 60 },
                  { name: 'ডিজিটাল রিসিপ্ট স্ক্যানার', progress: 30 }
                ].map((road, i) => (
                  <div key={i} className="space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span>{road.name}</span>
                        <span className="text-[#92400E]">{road.progress}%</span>
                     </div>
                     <div className="w-full h-2 bg-[#92400E]/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          whileInView={{ width: `${road.progress}%` }} 
                          transition={{ duration: 1.5 }}
                          className="h-full bg-[#92400E]" 
                        />
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Final Section: Gratitude & Close */}
          <section className="text-center space-y-12">
             <div className="space-y-6">
                <blockquote className="text-2xl md:text-4xl font-black italic text-[#111827] leading-tight">
                  "মানুষের উপকারে আসা প্রতিটি কোড-ই সার্থক পরিশ্রম।"
                </blockquote>
                <div className="space-y-1">
                   <p className="text-[#92400E] font-black text-xl tracking-widest">— Nullcove</p>
                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#111827]/20">Architect of Ledger Knox</p>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/dashboard" className="px-10 py-5 bg-[#111827] text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-[#92400E] transition-all flex items-center justify-center gap-3 group">
                  ড্যাশবোর্ডে ফিরুন <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className="px-10 py-5 border-2 border-[#111827]/10 text-[#111827] rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-[#111827]/5 transition-all text-center">
                  রাসরি যোগাযোগ করুন
                </Link>
             </div>
          </section>

        </div>
      </main>

      <footer className="py-20 bg-[#111827] text-white/40">
        <div className="max-w-7xl mx-auto px-12 flex flex-col items-center space-y-10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#92400E] text-white rounded-xl flex items-center justify-center text-xl font-black italic">LK</div>
              <h2 className="text-xl font-black text-white tracking-tight">Ledger Knox</h2>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center max-w-sm">
             Designed & Developed with Passion by <br />
             <span className="text-white">Nullcove</span> — 2026
           </p>
        </div>
      </footer>
    </div>
  );
}
