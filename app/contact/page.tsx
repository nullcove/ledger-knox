'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Phone, Mail, MapPin, Send, MessageSquare, 
  ChevronLeft, Github, CheckCircle2, Loader2, Sparkles, User
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import { insforge } from '@/lib/insforge';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const { error: dbError } = await insforge.database.from('messages').insert({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as string,
    });

    if (!dbError) {
        // Also send email via Edge Function
        await insforge.functions.invoke('send-contact-email', {
          body: {
            name: formData.get('name'),
            userEmail: formData.get('email'),
            type: formData.get('type'),
            message: formData.get('message'),
          }
        });
        
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
    } else {
        alert('ত্রুটি হয়েছে: ' + dbError.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] selection:bg-[#92400E]/20 text-[#111827]">
      <CustomCursor />
      
      {/* Minimal Header */}
      <nav className="fixed top-0 w-full z-50 h-24 flex items-center px-12 justify-between border-b border-[#92400E]/5 bg-[#F9F7F5]/80 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#92400E] text-white px-2 py-1 rounded-lg text-lg font-black italic">LK</div>
            <span className="text-xl font-black tracking-tighter">Ledger Knox</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#92400E] hover:gap-4 transition-all">
             <ChevronLeft className="w-4 h-4" /> হোম পেজ
          </Link>
      </nav>

      <main className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            
            {/* Info Side */}
            <div className="space-y-16">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">যোগাযোগ কেন্দ্র</div>
                  <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85]">আমাদের সাথে <br /><span className="text-[#92400E]">কথা বলুন</span></h1>
                  <p className="text-xl text-[#111827]/40 font-bold max-w-md leading-relaxed">যেকোনো প্রশ্ন বা ফিডব্যাক সরাসরি আমাদের পাঠান। রিয়াদ হোসেন হুজাইফা ব্যক্তিগতভাবে প্রতিটি মেসেজ রিভিউ করেন।</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-[#92400E] uppercase tracking-widest">কল করুন</p>
                     <p className="text-2xl font-black">01910112001</p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-[#92400E] uppercase tracking-widest">ইমেইল</p>
                     <p className="text-2xl font-black">developer@nullcove.com</p>
                  </div>
               </div>

               <div className="p-10 bg-[#111827] rounded-[48px] text-white space-y-6 relative overflow-hidden group">
                  <Sparkles className="absolute -right-4 -top-4 w-32 h-32 opacity-10 text-[#92400E] group-hover:rotate-12 transition-transform" />
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#92400E]">Designed by Architect</p>
                  <h3 className="text-4xl font-black">Riyad Hossain Huzaifa</h3>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Github className="w-5 h-5" /></div>
                  </div>
               </div>
            </div>

            {/* Form Side */}
            <div className="glass-card p-12 lg:p-20 rounded-[80px] border border-[#92400E]/10 relative">
               {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-8">
                     <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                        <CheckCircle2 className="w-12 h-12" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-4xl font-black">মেসেজ পাঠানো হয়েছে!</h4>
                        <p className="text-[#111827]/40 font-bold">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
                     </div>
                     <button onClick={() => setIsSuccess(false)} className="text-[#92400E] font-black text-sm uppercase tracking-widest hover:underline">আরেকটি পাঠাতে চান?</button>
                  </motion.div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-[#92400E] uppercase tracking-widest ml-1">নাম</label>
                           <input name="name" required placeholder="আপনার নাম..." className="w-full bg-[#111827]/5 border border-[#92400E]/10 p-5 rounded-3xl font-black focus:bg-white focus:ring-4 focus:ring-[#92400E]/5 outline-none transition-all" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-[#92400E] uppercase tracking-widest ml-1">ইমেইল</label>
                           <input name="email" type="email" required placeholder="ইমেইল দিন..." className="w-full bg-[#111827]/5 border border-[#92400E]/10 p-5 rounded-3xl font-black focus:bg-white focus:ring-4 focus:ring-[#92400E]/5 outline-none transition-all" />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#92400E] uppercase tracking-widest ml-1">বিষয়ের ধরন</label>
                        <select name="type" className="w-full bg-[#111827]/5 border border-[#92400E]/10 p-5 rounded-3xl font-black focus:bg-white outline-none appearance-none">
                           <option value="contact">সাধারণ জিজ্ঞাসা</option>
                           <option value="complaint">কমপ্লেইন করুন</option>
                           <option value="feature">ফিচার রিকোয়েস্ট</option>
                        </select>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#92400E] uppercase tracking-widest ml-1">মেসেজ</label>
                        <textarea name="message" required rows={6} placeholder="আপনার কথা লিখুন..." className="w-full bg-[#111827]/5 border border-[#92400E]/10 p-8 rounded-[40px] font-black focus:bg-white outline-none resize-none transition-all"></textarea>
                     </div>

                     <button type="submit" disabled={isSubmitting} className="w-full bg-[#111827] text-white py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 hover:bg-[#92400E] transition-all disabled:opacity-50 group">
                        {isSubmitting ? <Loader2 className="w-7 h-7 animate-spin" /> : <>সাবমিট করুন <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></>}
                     </button>
                  </form>
               )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Handcrafted by RIYAD HOSSAIN HUZAIFA &copy; 2026</p>
      </footer>
    </div>
  );
}
