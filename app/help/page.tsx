'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  BookOpen, HelpCircle, LifeBuoy, Monitor, 
  Settings, Shield, Smartphone, Zap, Search,
  ArrowRight, ChevronLeft
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

const HELP_CATEGORIES = [
  { title: 'শুরু করা', desc: 'কিভাবে একাউন্ট খুলবেন এবং সেটআপ করবেন।', icon: Zap },
  { title: 'অ্যাকাউন্ট', desc: 'প্রোফাইল এবং সিকিউরিটি সেটিংস।', icon: Settings },
  { title: 'লেনদেন', desc: 'কিভাবে আয়-ব্যয় এবং ওয়ালেট ম্যানেজ করবেন।', icon: BookOpen },
  { title: 'নিরাপত্তা', desc: 'ডাটা এনক্রিপশন এবং প্রাইভেসি সেটিংস।', icon: Shield },
  { title: 'মোবাইল এক্সেস', desc: 'মোবাইল থেকে ড্যাশবোর্ড ব্যবহারের গাইড।', icon: Smartphone },
  { title: 'বিল সাপোর্ট', desc: 'সাবস্ক্রিপশন এবং পেমেন্ট সংক্রান্ত তথ্য।', icon: HelpCircle },
];

export default function HelpPage() {
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
        <div className="max-w-6xl mx-auto space-y-32">
          
          <section className="text-center space-y-12">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Client Success</div>
             <h1 className="text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.85]">আমরা এখানে <br /><span className="text-[#92400E]">আপনার জন্য</span></h1>
             <div className="relative max-w-2xl mx-auto group">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#111827]/20 group-focus-within:text-[#92400E] transition-all" />
                <input 
                   placeholder="আপনার সমস্যার কথা লিখুন..." 
                   className="w-full pl-16 pr-8 py-8 rounded-[40px] bg-white border border-[#92400E]/10 font-black text-lg shadow-sm outline-none focus:ring-8 focus:ring-[#92400E]/5 transition-all" 
                />
             </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {HELP_CATEGORIES.map((cat, i) => (
                <div key={i} className="p-12 bg-white border border-[#92400E]/5 rounded-[48px] hover:border-[#92400E]/30 transition-all cursor-pointer group shadow-sm">
                   <div className="w-16 h-16 bg-[#F9F7F5] text-[#92400E] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#92400E] group-hover:text-white transition-all shadow-sm">
                      <cat.icon className="w-7 h-7" />
                   </div>
                   <h4 className="text-3xl font-black mb-4">{cat.title}</h4>
                   <p className="text-lg font-bold text-[#111827]/40 leading-relaxed mb-10">{cat.desc}</p>
                   <p className="inline-flex items-center gap-3 text-[10px] font-black text-[#92400E] uppercase tracking-widest group-hover:gap-6 transition-all">গাইড পড়ুন <ArrowRight className="w-4 h-4" /></p>
                </div>
             ))}
          </div>

          <section className="bg-[#111827] p-20 lg:p-32 rounded-[80px] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
             <div className="space-y-6 relative z-10">
                <h2 className="text-5xl lg:text-7xl font-black italic flex items-center gap-4"><LifeBuoy className="text-[#92400E] w-12 h-12" /> সাপোর্ট টিম</h2>
                <p className="text-white/40 font-bold max-w-sm text-xl lg:text-2xl">আমাদের সাপোর্ট টিম সপ্তাহের ৭ দিনই আপনার সেবায় নিয়োজিত। যেকোনো টেকনিক্যাল ইস্যুতে সরাসরি যোগাযোগ করুন।</p>
             </div>
             <Link href="/contact" className="bg-white text-[#111827] px-12 py-6 rounded-[32px] font-black text-lg uppercase tracking-widest hover:bg-[#92400E] hover:text-white transition-all relative z-10 shadow-2xl">সাপোর্ট রিকোয়েস্ট পাঠান</Link>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Designed & Developed by RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
