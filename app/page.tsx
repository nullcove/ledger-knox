'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Plus, Minus, HelpCircle, MessageCircle, 
  ArrowRight, Search, ChevronRight, Zap, Shield, BarChart3,
  Wallet, PieChart, Star, Github, Menu, X, ArrowDown, Users, Lock, Globe,
  ShieldCheck, Heart, Sparkles, Play, MousePointer2, UserPlus, Receipt,
  CheckCircle2, CreditCard, Target, Smartphone, Globe2, LayoutDashboard,
  MessageSquare, FileText, Info, Download, Home, Settings, Bell
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import { insforge } from '@/lib/insforge';

const NAV_LINKS = [
  { name: 'ফিচার', href: '/features', icon: Sparkles },
  { name: 'ডোনেশন', href: '#donation', icon: Heart },
  { name: 'সহযোগিতা', href: '/help', icon: HelpCircle },
  { name: 'যোগাযোগ', href: '/contact', icon: MessageSquare },
];

// Helper for count-up animation
const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString('bn-BD')}</span>;
};

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auth check
    insforge.auth.getCurrentUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });

    // PWA Install Prompt Logic
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    });

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] selection:bg-[#92400E]/20 overflow-x-hidden pb-20 md:pb-0">
      <CustomCursor />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Ledger Knox',
              url: 'https://ledgerknox.nullcove.com',
              description: 'বাংলাদেশের সেরা প্রিমিয়াম ফিন্যান্সিয়াল ট্র্যাকার — সম্পূর্ণ ফ্রি।',
              inLanguage: 'bn',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://ledgerknox.nullcove.com/help',
                'query-input': 'required name=search_term_string',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Ledger Knox',
              url: 'https://ledgerknox.nullcove.com',
              description: 'প্রিমিয়াম বাংলা ফিন্যান্সিয়াল ট্র্যাকার। বাজেট, ধার-দেনা, বাজার তালিকা, রিকারিং বিল — সব এক জায়গায়।',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web, Android, iOS',
              inLanguage: 'bn',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BDT',
              },
              author: {
                '@type': 'Person',
                name: 'Riyad Hossain Huzaifa',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '120',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ledger Knox',
              url: 'https://ledgerknox.nullcove.com',
              logo: 'https://ledgerknox.nullcove.com/icons/icon-512x512.png',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                url: 'https://ledgerknox.nullcove.com/contact',
              },
            },
          ]),
        }}
      />

      
      {/* Dynamic Background Particles */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#92400E]/10 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * 100 + "%"],
                opacity: [0, 0.5, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Header */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-2 md:top-6 inset-x-0 z-50 w-full max-w-7xl mx-auto px-4 md:px-6"
      >
        <div className="bg-white/90 backdrop-blur-xl px-4 md:px-10 py-3 md:py-6 flex items-center justify-between rounded-full md:rounded-[40px] border border-[#92400E]/10 shadow-[0_8px_32px_rgba(146,64,14,0.15)] transition-all">
          <Link href="/" className="flex items-center gap-2 md:gap-3 ml-2">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="bg-[#92400E] text-white px-2 py-1 md:px-3 md:py-2 rounded-xl text-lg md:text-3xl font-black italic shadow-lg shadow-[#92400E]/30"
            >
              LK
            </motion.div>
            <span className="text-lg md:text-3xl font-black tracking-tighter text-[#111827]">Ledger Knox</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="text-sm font-black text-[#111827]/60 hover:text-[#92400E] uppercase tracking-widest transition-all">
                  {link.name}
                </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 mr-1">
            {isLoggedIn ? (
               <Link href="/dashboard" className="hidden md:flex bg-[#111827] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#92400E] transition-all">ড্যাশবোর্ড</Link>
            ) : (
               <Link href="/auth/signup" className="hidden md:flex bg-[#92400E] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#111827] transition-all">শুরু করুন</Link>
            )}
            
            {/* Luxury Animated Hamburger */}
            <motion.button 
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`lg:hidden w-14 h-14 flex flex-col items-center justify-center gap-1.5 bg-[#111827] text-white rounded-full shadow-2xl relative ${isMenuOpen ? 'z-[1001]' : 'z-[110]'}`}
            >
               <motion.span 
                 variants={{
                   closed: { rotate: 0, y: 0 },
                   open: { rotate: 45, y: 10 }
                 }}
                 className="w-7 h-1 bg-white rounded-full transition-all duration-300" 
               />
               <motion.span 
                 variants={{
                   closed: { opacity: 1 },
                   open: { opacity: 0 }
                 }}
                 className="w-7 h-1 bg-white rounded-full transition-all duration-300" 
               />
               <motion.span 
                 variants={{
                   closed: { rotate: 0, y: 0 },
                   open: { rotate: -45, y: -10 }
                 }}
                 className="w-7 h-1 bg-white rounded-full transition-all duration-300" 
               />
            </motion.button>
          </div>
        </div>

        {/* Premium Dark-Glass Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(20px)' }}
              className="fixed inset-0 z-[999] bg-[#111827] flex flex-col pt-24"
            >
              <div className="flex-1 overflow-y-auto px-8 pb-32 flex flex-col justify-center gap-12 text-center">
                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-black text-[#92400E] uppercase tracking-[1em] mb-4"
                >
                  Explore Ledger Knox
                </motion.p>
                
                {NAV_LINKS.map((link, i) => (
                  <motion.div 
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group relative inline-block"
                    >
                      <span className="text-5xl md:text-7xl font-black text-white hover:text-[#92400E] transition-all duration-500 uppercase tracking-tighter">
                        {link.name}
                      </span>
                      <motion.div 
                        className="absolute -bottom-2 left-0 right-0 h-2 bg-[#92400E] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                      />
                    </Link>
                  </motion.div>
                ))}

                <div className="space-y-6 pt-12">
                   <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)} className="block bg-white text-[#111827] p-6 rounded-full font-black text-2xl shadow-2xl hover:bg-[#92400E] hover:text-white transition-all transform active:scale-95">সফটওয়্যার শুরু করুন</Link>
                   <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="block border-2 border-white/20 text-white p-6 rounded-full font-black text-2xl backdrop-blur-md">আগের একাউন্টে ফিরুন</Link>
                </div>
              </div>
              
              {/* Bottom Decoration */}
              <div className="absolute bottom-10 left-0 right-0 text-center opacity-20">
                 <p className="text-[8px] font-black text-white uppercase tracking-[0.8em]">Developed by Riyad Hossain Huzaifa</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - The "WOW" Part */}
      <section ref={heroRef} className="relative pt-40 md:pt-64 pb-20 md:pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh] md:min-h-screen overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute top-1/4 -left-32 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#92400E]/10 animate-blob blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#D97706]/10 animate-blob blur-[80px] pointer-events-none animation-delay-4000" />
        
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center relative z-10 w-full max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative inline-block mb-8">
               <motion.div 
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-12 -left-12 md:-top-20 md:-left-20 text-[#92400E] opacity-40"
               >
                   <Sparkles className="w-12 h-12 md:w-20 md:h-20" />
               </motion.div>
               
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#92400E]/20 bg-white/50 backdrop-blur-md shadow-lg text-[#92400E] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8 animate-float">
                  <Target className="w-4 h-4" /> ১০০% রিয়েল-টাইম ফিন্যান্স ট্র্যাকার
               </div>
               
               <h1 className="text-5xl md:text-[120px] font-black tracking-tighter mb-8 leading-[0.95] relative z-20">
                 <span className="block text-[#111827] drop-shadow-2xl mb-2">সহজ হিসাব</span>
                 <span className="animate-gradient-text block">রয়্যাল ডিজাইন</span>
               </h1>
            </div>
            
            <p className="text-[#111827]/70 text-lg md:text-3xl max-w-3xl mx-auto mb-12 font-bold leading-relaxed px-4">
              Ledger Knox আপনাকে দেবে আপনার উপার্জিত অর্থের ওপর পূর্ণ নিয়ন্ত্রণ। <br className="hidden md:block" />
              <span className="text-[#92400E] font-black underline decoration-wavy underline-offset-8">স্মার্ট এনালাইটিক্স</span> আর <span className="text-[#92400E] font-black">মিলিটারি গ্রেড নিরাপত্তা</span> এখন এক সাথে।
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
              <Link href="/auth/signup" className="w-full sm:w-auto bg-[#111827] text-white px-10 py-5 rounded-[24px] font-black text-xl hover:bg-[#92400E] hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">ফ্রি শুরু করুন <ArrowRight className="group-hover:translate-x-2 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_2s_infinite]" />
              </Link>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInstall}
                className="w-full sm:w-auto bg-white border-2 border-[#92400E]/10 text-[#92400E] px-10 py-5 rounded-[24px] font-black text-xl hover:bg-[#92400E]/5 transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                <Download className="w-6 h-6" /> অ্যাপ ইন্সটল করুন
              </motion.button>
            </div>

            {/* Visual Stats Bar */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#92400E]/10 pt-12"
            >
               {[
                 { label: 'সন্তুষ্ট ইউজার', value: 1200, suffix: '+' },
                 { label: 'টোটাল এন্ট্রি', value: 45000, suffix: '+' },
                 { label: 'সেভ করা অর্থ', value: 85, suffix: 'লাখ+' },
                 { label: 'নিরাপত্তা', value: 100, suffix: '%' },
               ].map((stat, i) => (
                 <div key={i} className="text-center group">
                    <p className="text-3xl md:text-5xl font-black text-[#111827] group-hover:text-[#92400E] transition-colors"><CountUp end={stat.value} />{stat.suffix}</p>
                    <p className="text-xs md:text-sm font-black text-[#92400E]/60 uppercase tracking-widest mt-2">{stat.label}</p>
                 </div>
               ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* PWA Install Banner (Global Bottom) */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className="fixed bottom-24 md:bottom-10 inset-x-6 z-[60] max-w-lg mx-auto bg-[#111827] text-white p-6 rounded-[32px] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 bg-[#92400E]/20 blur-2xl rounded-full" />
            <div className="flex items-center gap-4 relative z-10">
               <div className="w-14 h-14 bg-[#92400E] rounded-2xl flex items-center justify-center text-2xl font-black italic border-2 border-white/20">LK</div>
               <div>
                  <h4 className="font-black text-lg">সফটওয়্যার হিসেবে ব্যবহার করুন</h4>
                  <p className="text-white/60 text-xs">আপনার ফোনে Ledger Knox ইন্সটল করুন।</p>
               </div>
            </div>
            <div className="flex gap-3 relative z-10 w-full sm:w-auto">
               <button onClick={() => setShowInstallBanner(false)} className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-white/10 font-bold hover:bg-white/20 transition-all">পরে</button>
               <button onClick={handleInstall} className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#92400E] font-black hover:bg-[#B45309] transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> ইন্সটল
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Features Showcase */}
      <section className="py-20 md:py-40 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 md:mb-32">
            <div className="space-y-6">
               <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="flex items-center gap-3 text-[#92400E] font-black text-sm uppercase tracking-widest">
                  <div className="w-12 h-px bg-[#92400E]" /> MASTER THE FLOW
               </motion.div>
               <h2 className="text-5xl md:text-9xl font-black text-[#111827] tracking-tight leading-[0.9]">
                  আপনার জীবন, <br />
                  <span className="text-[#92400E]">আমাদের হিসাব।</span>
               </h2>
            </div>
            <p className="text-[#111827]/60 text-lg md:text-2xl font-bold max-w-sm md:max-w-md border-l-4 border-[#92400E] pl-6 italic">
              "টাকা জমানো নয়, টাকা সঠিক জায়গায় ব্যবহার করাই আসল বুদ্ধিমত্তা।"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                title: 'রিয়েল-টাইম ভল্ট', 
                desc: 'প্রতিটি লেনদেন হওয়ার সাথে সাথেই আপনার ড্যাশবোর্ডে আপডেট হয়ে যাবে ইনসট্যান্টলি।',
                icon: Shield,
                color: 'bg-blue-500'
              },
              { 
                title: 'স্মার্ট রিপোর্টস', 
                desc: 'বার চার্ট, পাই চার্ট আর লাইন গ্রাফ দিয়ে দেখুন আপনার ব্যয়ের প্রকৃত চিত্র।',
                icon: BarChart3,
                color: 'bg-purple-500'
              },
              { 
                title: 'মাল্টি ডিভাইস', 
                desc: 'ফোন, ট্যাবলেট বা পিসি — সব জায়গায় একই ডাটা। একাউন্ট খুলুন আর শুরু করুন।',
                icon: Smartphone,
                color: 'bg-amber-500'
              }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title} 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -15 }}
                className="group relative p-10 md:p-12 rounded-[48px] bg-[#F9F7F5] border border-[#92400E]/5 hover:bg-white hover:shadow-2xl hover:shadow-[#92400E]/10 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 bg-white/50 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-20 h-20 bg-white rounded-[28px] shadow-sm flex items-center justify-center text-[#92400E] mb-8 group-hover:bg-[#92400E] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                   <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-[#111827] mb-4">{feature.title}</h3>
                <p className="text-lg font-bold text-[#111827]/60 leading-relaxed mb-8">{feature.desc}</p>
                <Link href="/features" className="inline-flex items-center gap-2 text-[#92400E] font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                   বিস্তারিত দেখুন <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Masterpiece Section (Huzaifa) */}
      <section className="py-24 md:py-48 px-6 bg-[#111827] text-white relative overflow-hidden">
         <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#92400E]/10 blur-[150px] rounded-full animate-pulse" />
         <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
         
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
               <div className="relative rounded-[60px] overflow-hidden border-8 border-white/5 shadow-2xl aspect-[4/5] md:aspect-square group">
                  <div className="absolute inset-0 bg-[#92400E]/20 group-hover:bg-transparent transition-colors duration-700" />
                  <img 
                    src="https://picsum.photos/800/800?grayscale" 
                    alt="Riyad Hossain Huzaifa" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 space-y-2">
                     <p className="text-[#92400E] font-black text-sm uppercase tracking-[0.5em]">The Visionary Architect</p>
                     <h3 className="text-4xl md:text-6xl font-black tracking-tight">Riyad Hossain <br /> Huzaifa</h3>
                  </div>
               </div>
               
               {/* Floating Credentials Card */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ repeat: Infinity, duration: 6 }}
                 className="absolute -top-10 -right-10 md:-right-20 p-8 md:p-10 bg-white text-[#111827] rounded-[40px] shadow-2xl border-4 border-[#92400E] space-y-4 max-w-[280px] hidden md:block"
               >
                  <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
                  <p className="text-sm font-black italic">"আমি বিশ্বাস করি সফটওয়্যার হওয়া উচিত কবিতার মতো—যা আপনার প্রটিটি সমস্যার সমাধান করবে খুব নীরবে আর সুন্দরভাবে।"</p>
                  <div className="flex gap-2">
                     <div className="w-12 h-1 bg-[#111827]/10" />
                     <div className="w-4 h-1 bg-[#92400E]" />
                  </div>
               </motion.div>
            </motion.div>

            <div className="space-y-12 relative z-10">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="space-y-6"
               >
                  <h2 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9]">
                    সফলতার <br />
                    <span className="text-[#92400E]">মাস্টারপিস।</span>
                  </h2>
                  <p className="text-white/60 text-xl font-bold leading-relaxed">
                    রিয়াদ হোসেন হুজাইফা তাঁর নিখুঁত কোডিং আর দূরদর্শী ডিজাইনের মাধ্যমে তৈরি করেছেন Ledger Knox। এটি কোনো সাধারণ ট্র্যাকার নয়, এটি একটি ফিন্যান্সিয়াল ইঞ্জিন যা আপনার টাকাকে করবে গতিশীল।
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 gap-6">
                  {[
                    { label: 'ইউজার এক্সপিরিয়েন্স', value: 'প্রিমিয়াম ও ইন্টুইটিভ' },
                    { label: 'নিরাপত্তা ব্যবস্থা', value: 'এন্ড-টু-এন্ড এনক্রিপশন' },
                    { label: 'ডেভলপমেন্ট ফিলোসফি', value: 'ক্লিন কোড ও লাক্সারি ডিজাইন' }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-6 p-6 md:p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                       <div className="w-12 h-12 bg-[#92400E]/20 text-[#92400E] rounded-2xl flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                          <p className="text-lg md:text-xl font-black">{item.value}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
               
               <div className="flex flex-wrap gap-8 items-center pt-6">
                  <a href="#" className="flex items-center gap-3 text-white/40 hover:text-[#92400E] transition-colors group">
                     <Github className="w-6 h-6" />
                     <span className="font-black text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">GitHub Profile</span>
                  </a>
                  <Link href="/contact" className="bg-white text-[#111827] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#92400E] hover:text-white transition-all">সরাসরি কথা বলুন</Link>
               </div>
            </div>
         </div>
      </section>

      {/* Donation (Gratitude) Section */}
      <section id="donation" className="py-24 md:py-40 px-6 bg-[#F9F7F5] relative overflow-hidden">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-10"
            >
               <Heart className="w-12 h-12 fill-red-500 animate-pulse" />
            </motion.div>
            <h2 className="text-5xl md:text-9xl font-black text-[#111827] tracking-tight leading-[0.9]">
               আমাদের <br />
               <span className="text-[#92400E]">পাশে দাঁড়ান।</span>
            </h2>
            <p className="text-[#111827]/60 text-xl md:text-3xl font-bold leading-relaxed">
               Ledger Knox সম্পূর্ণ বিজ্ঞাপনমুক্ত একটি প্রজেক্ট। আমরা কোনো চার্জ নেই না। আপনি চাইলে ছোট একটি ডোনেশনের মাধ্যমে আমাদের সার্ভার খরচ মেইনটেইন করতে সাহায্য করতে পারেন।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
               {[
                 { provider: 'bKash', number: '017XXXXXXXX', color: '#E2136E', bg: 'bg-[#E2136E]/5' },
                 { provider: 'Nagad', number: '01XXXXXXXXX', color: '#EC1C24', bg: 'bg-[#EC1C24]/5' }
               ].map((mod, i) => (
                 <motion.div 
                   key={mod.provider}
                   whileHover={{ y: -10 }}
                   className={`${mod.bg} p-10 rounded-[40px] border border-[#92400E]/10 space-y-6 group`}
                 >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                       <Smartphone className="w-8 h-8" style={{ color: mod.color }} />
                    </div>
                    <h4 className="text-2xl font-black text-[#111827]">{mod.provider} (Personal)</h4>
                    <p className="text-3xl font-black tracking-widest select-all">{mod.number}</p>
                    <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.3em]">Copy Number</p>
                 </motion.div>
               ))}
            </div>
            
            <p className="text-[#92400E] font-black text-sm uppercase tracking-widest animate-bounce">ধন্যবাদ আমাদের সাথে থাকার জন্য! ❤️</p>
         </div>
      </section>

      {/* Quick Access Link Grid */}
      <section className="py-20 md:py-32 px-6 border-t border-[#92400E]/10">
         <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
               {[
                 { name: 'ফিচারসমূহ', href: '/features', icon: Sparkles },
                 { name: 'ডোনেশন', href: '#donation', icon: Heart },
                 { name: 'আমাদের কথা', href: '/about', icon: Users },
                 { name: 'নিরাপত্তা', href: '/security', icon: Lock },
                 { name: 'সহযোগিতা', href: '/help', icon: MessageCircle },
                 { name: 'বিবরণী', href: '/terms', icon: FileText },
                 { name: 'প্রাইভেসি', href: '/privacy', icon: Shield },
                 { name: 'FAQ', href: '/faq', icon: Info },
                 { name: 'যোগাযোগ', href: '/contact', icon: Globe },
                 { name: 'রোডম্যাপ', href: '/roadmap', icon: Target }
               ].map((link, i) => (
                 <Link 
                   key={link.name} 
                   href={link.href}
                   className="p-8 bg-white border border-[#92400E]/5 rounded-[32px] hover:border-[#92400E]/20 hover:bg-[#92400E]/5 hover:scale-105 active:scale-95 transition-all group text-center"
                 >
                    <link.icon className="w-8 h-8 mx-auto mb-4 text-[#111827]/20 group-hover:text-[#92400E] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#111827]/60 group-hover:text-[#111827] transition-colors">{link.name}</span>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* Luxury Footer */}
      <footer className="py-20 md:py-32 px-6 bg-[#111827] text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start gap-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#92400E] text-white rounded-2xl flex items-center justify-center text-3xl font-black italic shadow-2xl shadow-[#92400E]/20">LK</div>
              <div className="space-y-1">
                 <h2 className="text-3xl font-black tracking-tight text-white">Ledger Knox</h2>
                 <p className="text-[10px] font-black uppercase tracking-[0.5em]">The Elite Financial Vault</p>
              </div>
            </div>
            <p className="text-sm font-bold text-center md:text-left max-w-sm leading-relaxed">
              Ledger Knox রিয়াদ হোসেন হুজাইফা কর্তৃক ডিজাইন ও ডেভেলপ করা হয়েছে। এটি ব্যক্তিগত আয়-ব্যয় ট্র্যাকিং করার একটি বিশেষ প্লাটফর্ম।
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden">
             {[
               { name: 'Terms', href: '/terms' },
               { name: 'Privacy', href: '/privacy' },
               { name: 'Github', href: 'https://github.com' },
               { name: 'LinkedIn', href: '#' }
             ].map(f => (
               <Link key={f.name} href={f.href} className="hover:text-white hover:tracking-[0.5em] transition-all duration-500">{f.name}</Link>
             ))}
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">&copy; 2026 Developed by Riyad Hossain Huzaifa — All Rights Reserved</p>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation (30+ Effect) */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 inset-x-0 z-[100] h-24 bg-white/90 backdrop-blur-2xl border-t border-[#92400E]/10 flex items-center justify-around px-4 mobile-bottom-nav"
      >
        {[
          { icon: Home, label: 'হোম', href: '/', active: true },
          { icon: LayoutDashboard, label: 'ড্যাশবোর্ড', href: '/dashboard' },
          { icon: Plus, label: 'এন্ট্রি', href: '/dashboard/add', main: true },
          { icon: Search, label: 'সার্চ', href: '/dashboard/search' },
          { icon: UserPlus, label: 'প্রোফাইল', href: isLoggedIn ? '/dashboard/profile' : '/auth/login' }
        ].map((btn, i) => (
          <Link key={btn.label} href={btn.href} className="flex flex-col items-center gap-2 group relative">
            {btn.main ? (
               <div className="w-16 h-16 bg-[#111827] text-white rounded-full -mt-16 flex items-center justify-center shadow-2xl border-4 border-[#F9F7F5] animate-pulse-glow group-active:scale-95 transition-all">
                  <Plus className="w-8 h-8" />
               </div>
            ) : (
               <>
                 <btn.icon className={`w-6 h-6 ${btn.active ? 'text-[#92400E]' : 'text-[#111827]/40'} group-active:scale-90 transition-all`} />
                 <span className={`text-[10px] font-black uppercase tracking-widest ${btn.active ? 'text-[#92400E]' : 'text-[#111827]/40'}`}>{btn.label}</span>
               </>
            )}
            {btn.active && !btn.main && <motion.div layoutId="mobile-nav-dot" className="absolute -bottom-1 w-1 h-1 bg-[#92400E] rounded-full" />}
          </Link>
        ))}
      </motion.nav>

      {/* CSS Effects Injection for specialized animations */}
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-30deg); }
          100% { transform: translateX(200%) skewX(-30deg); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
