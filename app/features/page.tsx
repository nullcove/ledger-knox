'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Zap, Shield, BarChart3, Users, Globe2, 
  Smartphone, Wallet, PieChart, Star,
  CheckCircle2, ArrowRight, Layers, Clock, Cloud, ChevronLeft
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

const FEATURES = [
  {
    title: 'রিয়েল-টাইম ট্র্যাকিং',
    desc: 'যেকোনো ডিভাইস থেকে ইনপুট দেওয়া মাত্রই আপনার সম্পদ ভল্টে আপডেট হয়ে যায়।',
    icon: Zap,
    color: 'text-amber-600 bg-amber-50'
  },
  {
    title: 'নিরাপদ ক্লাউড সলিউশন',
    desc: 'ইনসফোর্জ ক্লাউডের মাধ্যমে আপনার ডাটা থাকে হ্যাকিংমুক্ত ও সম্পুর্ণ এনক্রিপ্টেড।',
    icon: Shield,
    color: 'text-indigo-600 bg-indigo-50'
  },
  {
    title: 'স্মার্ট অ্যানালিটিক্স',
    desc: 'স্বয়ংক্রিয়ভাবে আপনার খরচের ধরণ বুঝতে সাহায্য করে আমাদের কাস্টম বিল্ট চার্ট।',
    icon: BarChart3,
    color: 'text-emerald-600 bg-emerald-50'
  },
  {
    title: 'ডিজিটাল ওয়ালেট',
    desc: 'বিকাশ, নগদ এবং ব্যাংক অ্যাকাউন্ট এক জায়গায় ম্যানেজ করার প্রিমিয়াম সুযোগ।',
    icon: Wallet,
    color: 'text-pink-600 bg-pink-50'
  },
  {
    title: 'রিকারিং বিল রিমাইন্ডার',
    desc: 'মাসিক বিলগুলো ভুলে যাওয়া এখন ইতিহাস। লেজার নক্স আপনাকে দিবে সময়মতো এলার্ট।',
    icon: Clock,
    color: 'text-blue-600 bg-blue-50'
  },
  {
    title: 'গ্লোবাল এক্সেস',
    desc: 'পৃথিবীর যেকোনো প্রান্ত থেকে আপনি আপনার পোর্টালে জয়েন করতে পারবেন।',
    icon: Globe2,
    color: 'text-purple-600 bg-purple-50'
  }
];

export default function FeaturesPage() {
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
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Architectural Features</div>
             <h1 className="text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.85]">অতুলনীয় <br />সব <span className="text-[#92400E]">ক্ষমতা</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-2xl mx-auto leading-relaxed">আমরা এমন সব টুল এবং আর্কিটেকচার তৈরি করেছি যা ফিন্যান্সিয়াল ট্র্যাকিং এর গ্লোবাল স্ট্যান্ডার্ডকে ছাড়িয়ে যাবে।</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {FEATURES.map((f, i) => (
                <div 
                   key={i}
                   className="p-16 bg-white rounded-[64px] border border-[#92400E]/5 shadow-sm space-y-10 hover:border-[#92400E]/30 transition-all hover:scale-105"
                >
                   <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center ${f.color} shadow-sm`}>
                      <f.icon className="w-8 h-8" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-3xl font-black">{f.title}</h3>
                      <p className="text-lg font-bold text-[#111827]/40 leading-relaxed">{f.desc}</p>
                   </div>
                </div>
             ))}
          </div>

          <section className="bg-[#111827] p-20 lg:p-32 rounded-[80px] text-white flex flex-col md:flex-row items-center gap-20 relative overflow-hidden group">
             <Star className="absolute -left-12 -bottom-12 w-64 h-64 text-[#92400E] opacity-10 group-hover:scale-110 transition-transform" />
             <div className="lg:w-1/2 space-y-10 relative z-10">
                <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-tight">ভবিষ্যৎ উপযোগী প্রযুক্তি</h2>
                <p className="text-2xl text-white/40 font-bold leading-relaxed">আমরা প্রতিদিন আমাদের এলগরিদম আপডেট করি যাতে আপনার ডাটা থাকে নির্ভুল এবং দ্রুততম। রিয়াদ হোসেন হুজাইফার তত্ত্বাবধানে আমরা করছি নিরাপদ ডিজিটাল ডমিনেট।</p>
                <div className="flex flex-wrap gap-6 pt-10">
                   {['অটো-ব্যাকআপ', 'স্মার্ট ডাইজেস্ট', 'কাস্টম গোলস'].map((tag, i) => (
                      <span key={i} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-[#92400E]">{tag}</span>
                   ))}
                </div>
             </div>
             <div className="lg:w-1/2 relative z-10">
                <div className="rounded-[48px] overflow-hidden border-8 border-white shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" className="opacity-70 mix-blend-screen" alt="Tech" />
                </div>
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
