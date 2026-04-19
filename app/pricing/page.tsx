'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Check, X, Zap, Star, Shield, 
  ChevronRight, ArrowRight, HelpCircle, ChevronLeft
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

const PLANS = [
  {
    name: 'মৌলিক (Free)',
    price: '৳০',
    desc: 'ব্যক্তিগত ব্যবহারের জন্য সেরা।',
    features: ['আনলিমিটেড ট্রানজেকশন', '৪টি ডিজিটাল ওয়ালেট', 'বেসিক অ্যানালিটিক্স', 'ক্লাউড সিঙ্ক'],
    cta: 'শুরু করুন',
    featured: false,
  },
  {
    name: 'প্রো (Vault)',
    price: '৳৯৯',
    desc: 'অ্যাডভান্সড সেভিংস ট্র্যাকার।',
    features: ['আনলিমিটেড ওয়ালেট', 'স্মার্ট গোল ট্র্যাকিং', 'টিম কোলাবরেশন', 'বাজেট অ্যালার্ট', 'প্রায়োরিটি সাপোর্ট'],
    cta: 'সাবস্ক্রাইব করুন',
    featured: true,
  },
  {
    name: 'এলিট (SaaS)',
    price: '৳২৯৯',
    desc: 'সকল ফিচার আনলক করুন।',
    features: ['কাস্টম ইনভয়েসিং', 'ট্যাক্স রিপোর্ট ডকার', 'এপিআই এক্সেস', 'ডেডিকেটেড হোস্টিং'],
    cta: 'যোগাযোগ করুন',
    featured: false,
  }
];

export default function PricingPage() {
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
        <div className="max-w-7xl mx-auto space-y-32">
          
          <section className="text-center space-y-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Pricing Model</div>
             <h1 className="text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.85]">আপনার জন্য <br />সঠিক <span className="text-[#92400E]">প্ল্যান</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-2xl mx-auto leading-relaxed">স্বচ্ছ প্রাইসিং, কোনো লুকানো ফি নেই। আপনার অর্থনৈতিক লক্ষ্যের সাথে মিল রেখে প্ল্যানটি বেছে নিন।</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {PLANS.map((p, i) => (
                <div key={i} className={`p-16 rounded-[64px] border border-[#92400E]/10 flex flex-col items-center text-center space-y-12 shadow-sm relative overflow-hidden transition-all hover:scale-105 ${p.featured ? 'bg-[#111827] text-white shadow-2xl shadow-[#92400E]/10' : 'bg-white'}`}>
                   {p.featured && (
                       <div className="absolute top-0 right-0 bg-[#92400E] text-white px-8 py-3 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">Most Popular</div>
                   )}
                   <div className="space-y-4">
                       <h3 className="text-2xl font-black">{p.name}</h3>
                       <p className={`text-sm font-bold ${p.featured ? 'text-white/40' : 'text-[#111827]/40'}`}>{p.desc}</p>
                   </div>
                   <div className="flex items-end gap-1">
                       <span className={`text-7xl font-black ${p.featured ? 'text-[#F9F7F5]' : 'text-[#111827]'}`}>{p.price}</span>
                       <span className="text-xs font-black uppercase tracking-widest opacity-40">/মাস</span>
                   </div>
                   <ul className="space-y-6 w-full text-left font-bold text-sm">
                       {p.features.map((f, fi) => (
                           <li key={fi} className="flex items-center gap-4">
                               <Check className={`w-5 h-5 ${p.featured ? 'text-[#92400E]' : 'text-[#92400E]'}`} />
                               <span className={p.featured ? 'text-white/80' : 'text-[#111827]/70'}>{f}</span>
                           </li>
                       ))}
                   </ul>
                   <Link href="/auth/signup" className={`w-full py-6 rounded-[32px] font-black text-xs uppercase tracking-widest transition-all ${p.featured ? 'bg-[#92400E] hover:bg-white hover:text-[#111827] text-white shadow-xl' : 'bg-[#111827] text-white hover:bg-[#92400E] shadow-sm'}`}>
                       {p.cta}
                   </Link>
                </div>
             ))}
          </div>

          {/* Support Bar */}
          <div className="bg-[#111827] p-16 rounded-[80px] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
              <Star className="absolute -right-4 -top-4 w-40 h-40 opacity-10 text-[#92400E] group-hover:scale-110 transition-transform" />
              <div className="space-y-4">
                 <h2 className="text-5xl font-black">আমাদের কি কোনো ছাড় আছে?</h2>
                 <p className="text-white/40 font-bold max-w-sm">স্টুডেন্ট এবং ছোট ব্যবসার জন্য বিশেষ ডিসকাউন্ট সচল আছে। আমাদের সাপোর্টে মেসেজ দিন।</p>
              </div>
              <Link href="/help" className="bg-[#92400E] text-white px-10 py-5 rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#111827] transition-all">হেল্প সেন্টারে যান</Link>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Designed by RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
