'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin, Phone, ChevronLeft, Send, Sparkles, Github, Globe } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

export default function ContactPage() {
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
        <div className="max-w-7xl mx-auto space-y-40">
          
          <section className="text-center space-y-10">
             <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">Connect With Us</motion.div>
             <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">যোগাযোগ <br /><span className="text-[#92400E]">করুন।</span></h1>
             <p className="text-2xl text-[#111827]/40 font-bold max-w-3xl mx-auto leading-relaxed">আপনার যেকোনো প্রশ্ন, অভিযোগ বা পরামর্শের জন্য আমরা সবসময় প্রস্তুত। Ledger Knox-কে আরও উন্নত করতে আপনার ফিডব্যাক আমাদের জন্য অমূল্য।</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             {/* Contact Info Cards */}
             <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { icon: Mail, title: 'ইমেইল করুন', content: 'support@nullcove.com', desc: '২৪ ঘণ্টার মধ্যে উত্তর।' },
                     { icon: MessageSquare, title: 'লাইভ চ্যাট', content: 'মেসেঞ্জার সাপোর্ট', desc: 'দ্রুত সমাধানের জন্য।' },
                     { icon: Github, title: 'গিটহাব', content: 'github.com/nullcove', desc: 'ওপেন সোর্স কন্ট্রিবিউশন।' },
                     { icon: Globe, title: 'হেডকোয়ার্টার', content: 'Dhaka, Bangladesh', desc: 'আমাদের কাজের কেন্দ্রস্থল।' }
                   ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -30 }} 
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 bg-white border border-[#92400E]/10 rounded-[48px] space-y-6 hover:shadow-2xl hover:shadow-[#92400E]/5 transition-all group"
                      >
                         <div className="w-12 h-12 bg-[#92400E]/5 text-[#92400E] rounded-2xl flex items-center justify-center group-hover:bg-[#92400E] group-hover:text-white transition-all">
                            <item.icon className="w-6 h-6" />
                         </div>
                         <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#92400E] mb-2">{item.title}</h4>
                            <p className="text-lg font-black text-[#111827]">{item.content}</p>
                            <p className="text-xs font-bold text-[#111827]/40 mt-1">{item.desc}</p>
                         </div>
                      </motion.div>
                   ))}
                </div>
                
                <div className="p-16 bg-[#111827] text-white rounded-[64px] relative overflow-hidden group">
                   <Sparkles className="absolute -right-4 -top-4 w-40 h-40 text-[#92400E] opacity-10 group-hover:rotate-12 transition-transform" />
                   <h3 className="text-4xl font-black mb-8 relative z-10">পার্টনারশিপ?</h3>
                   <p className="text-xl font-bold opacity-60 relative z-10 leading-relaxed mb-10">আপনি যদি কোনো ফিনটেক সংস্থা বা স্টার্টআপ হন এবং আমাদের সাথে কাজ করতে আগ্রহী হন, তবে সরাসরি ইমেইলে "Partnership" লিখে নক করুন। আমরা নতুন আইডিয়াকে সবসময় স্বাগত জানাই।</p>
                   <Link href="mailto:partners@nullcove.com" className="inline-flex items-center gap-4 bg-[#92400E] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest relative z-10">মেইল করুন <Send className="w-4 h-4" /></Link>
                </div>
             </div>

             {/* Contact Form */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               whileInView={{ opacity: 1, scale: 1 }}
               className="p-12 md:p-20 bg-white border border-[#92400E]/10 rounded-[80px] shadow-sm space-y-12"
             >
                <div className="space-y-4">
                   <h2 className="text-5xl font-black tracking-tight">বার্তা পাঠান।</h2>
                   <p className="text-xl font-bold text-[#111827]/40">আমরা আপনার প্রতিটি মেসেজ অত্যন্ত গুরুত্ব সহকারে পড়ি।</p>
                </div>
                <form className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-[#92400E]">নাম</label>
                      <input type="text" placeholder="সঠিক নাম" className="w-full bg-[#F9F7F5] border-none rounded-2xl p-6 font-bold text-lg focus:ring-2 focus:ring-[#92400E] transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-[#92400E]">ইমেইল</label>
                      <input type="email" placeholder="example@mail.com" className="w-full bg-[#F9F7F5] border-none rounded-2xl p-6 font-bold text-lg focus:ring-2 focus:ring-[#92400E] transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-[#92400E]">বার্তা</label>
                      <textarea placeholder="আপনার কথাগুলো এখানে লিখুন..." rows={5} className="w-full bg-[#F9F7F5] border-none rounded-2xl p-6 font-bold text-lg focus:ring-2 focus:ring-[#92400E] transition-all resize-none"></textarea>
                   </div>
                   <button className="w-full bg-[#111827] text-white py-6 rounded-3xl font-black text-lg hover:bg-[#92400E] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4">
                      পাঠিয়ে দিন <Send className="w-5 h-5" />
                   </button>
                </form>
             </motion.div>
          </div>

        </div>
      </main>

      <footer className="py-12 border-t border-[#92400E]/5 text-center">
         <p className="text-[10px] font-black text-[#111827]/20 uppercase tracking-[0.4em]">Designed by NULLCOVE &copy; 2026</p>
      </footer>
    </div>
  );
}
