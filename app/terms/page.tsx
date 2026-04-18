'use client';

import Link from 'next/link';
import { FileText, CheckCircle2, ChevronLeft } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function TermsPage() {
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
        <div className="max-w-3xl mx-auto space-y-20">
          <section className="text-center space-y-8">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Compliance</div>
             <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-none">ব্যবহারের <br /><span className="text-[#92400E]">শর্তাবলী</span></h1>
             <p className="text-xl font-bold opacity-40">সর্বশেষ আপডেট: ১৭ এপ্রিল, ২০২৬</p>
          </section>

          <div className="prose prose-stone prose-2xl max-w-none space-y-16 font-medium text-[#111827]/70 leading-relaxed">
             <section className="space-y-6">
                <h2 className="text-5xl font-black text-[#111827] tracking-tight">১. একাউন্ট ব্যবহারের নিয়ম</h2>
                <p>লেজার নক্স ব্যবহারের জন্য আপনাকে একটি বৈধ ইমেইল দিয়ে একাউন্ট তৈরি করতে হবে। প্রতিটি একাউন্ট শুধুমাত্র একজন ইউজারের জন্য প্রযোজ্য। শেয়ারড একাউন্ট ব্যবহার করা শর্ত সাপেক্ষে নিষিদ্ধ হতে পারে।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-5xl font-black text-[#111827] tracking-tight">২. দায়িত্ব ও বাধ্যবাধকতা</h2>
                <p>আপনার প্রোফাইল এবং ডাটার নিরাপত্তা রক্ষার দায়িত্ব আপনার। লেজার নক্স কর্তৃপক্ষ বা রিয়াদ হোসেন হুজাইফা আপনার পাসওয়ার্ড হারানো বা ভুলের জন্য দায়ী থাকবে না। আমরা প্রতিটি ইউজারকে শক্তিশালী পাসওয়ার্ড ব্যবহারের পরামর্শ দিই।</p>
             </section>

             <section className="space-y-6">
                <h2 className="text-5xl font-black text-[#111827] tracking-tight">৩. সার্ভিসের পরিবর্তন</h2>
                <p>লিমিটেড প্রিমিয়াম ফিচারগুলো রিয়াদ হোসেন হুজাইফা এর সিদ্ধান্ত অনুযায়ী যেকোনো সময় পরিবর্তিত বা পরিমার্জিত হতে পারে। ড্যাশবোর্ডের প্রতিটি আপডেট আমরা আপনাকে নোটিফিকেশনের মাধ্যমে জানাবো।</p>
             </section>

             <div className="p-16 bg-[#111827] text-white rounded-[48px] space-y-6">
                <CheckCircle2 className="w-12 h-12 text-[#92400E]" />
                <h4 className="text-3xl font-black">আমাদের প্রতিশ্রুতি</h4>
                <p className="text-lg opacity-60">লেজার নক্স সবসময় স্বচ্ছতা বজায় রাখবে। আমরা আপনার ইউজার এক্সপেরিয়েন্সকে আরও রাজকীয় করতে নিরলস কাজ করে যাচ্ছি।</p>
             </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Designed by RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
