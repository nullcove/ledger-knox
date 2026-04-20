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
  MessageSquare, FileText, Info, Download, Home, Settings, Bell,
  ShoppingCart, Briefcase, Calculator, Smartphone as MobileIcon, Tag as CategoryIcon
} from 'lucide-react';

import CustomCursor from '@/components/CustomCursor';
import { insforge } from '@/lib/insforge';

const NAV_LINKS = [
  { name: 'ফিচার', href: '/features', icon: Sparkles },
  { name: 'ডোনেশন', href: '/support', icon: Heart },
  { name: 'আমাদের সম্পর্কে', href: '/about', icon: Users },
  { name: 'নিরাপত্তা', href: '/security', icon: Lock },
  { name: 'সচরাচর প্রশ্ন', href: '/faq', icon: Info },
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
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // 1. Increment total views for 'home'
        await insforge.database.rpc('increment_site_stats', { path_name: 'home' });

        // 2. Track Country (Lightweight fetch with safety)
        const res = await fetch('https://ipapi.co/json/');
        const contentType = res.headers.get("content-type");
        
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          if (data && data.country_code) {
             await insforge.database.rpc('track_country_visit', { 
               c_code: data.country_code, 
               c_name: data.country_name 
             });
          }
        }
      } catch (e) {
        // Fail silently to ensure lag-free experience
        console.error('Tracking failed silently:', e);
      }
    };
    trackVisitor();
  }, []);

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
              author: {
                '@type': 'Person',
                name: 'Nullcove',
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
                className="bg-[#92400E] text-white px-2 py-1 md:px-3 md:py-2 rounded-xl text-xl md:text-2xl font-black italic shadow-lg shadow-[#92400E]/30"
                title="Ledger Knox - বাংলাদেশের সেরা ফিন্যান্স ট্র্যাকারের লোগো"
              >
                LK
              </motion.div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-[#111827]">Ledger Knox</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="text-base font-black text-[#111827]/60 hover:text-[#92400E] uppercase tracking-widest transition-all">
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
                 <p className="text-[8px] font-black text-white uppercase tracking-[0.8em]">Developed by Nullcove</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - The "WOW" Part */}
      <section ref={heroRef} className="relative pt-40 md:pt-64 pb-20 md:pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh] md:min-h-screen overflow-hidden">
        
        {/* Visually Hidden SEO Content (Keyword Rich) */}
        <div className="sr-only">
          <h1>Ledger Knox — বাংলাদেশের সেরা আয় ব্যয়ের হিসাব রাখার অ্যাপ।</h1>
          <p>
            আপনার প্রতিদিনের খরচের হিসাব, মাসিক বাজেট এবং সঞ্চয় ম্যানেজমেন্টের জন্য ব্যবহার করুন লেজার নক্স। 
            এটি একটি পাওয়ারফুল ফিন্যান্সিয়াল ট্র্যাকার যা আপনার টাকার হিসাব রাখবে নিখুঁতভাবে। 
            ডিজিটাল ক্যাশবুক এবং ধার দেনার হিসাব এখন আপনার হাতের মুঠোয়।
          </p>
          <ul>
            <li>সেরা টাকা ট্র্যাকিং অ্যাপ বাংলাদেশ</li>
            <li>অনলাইন হিসাব নিকাশ সফটওয়্যার</li>
            <li>khorocher hisab app bangla</li>
            <li>daily expense manager with bkash integration</li>
          </ul>
        </div>

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
               
               <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.95] relative z-20">
                 <span className="block text-[#111827] drop-shadow-2xl mb-2">স্মার্ট আয় ব্যয়ের হিসাব</span>
                 <span className="animate-gradient-text block">মানি ম্যানেজার ও ট্র্যাকার</span>
               </h1>
            </div>
            
            <p className="text-[#111827]/70 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-bold leading-relaxed px-4">
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
               <h2 className="text-4xl md:text-6xl font-black text-[#111827] tracking-tight leading-[0.9]">
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
                title: 'ডিজিটাল ক্যাশবুক', 
                desc: 'প্রতিটি লেনদেন হওয়ার সাথে সাথেই আপনার ড্যাশবোর্ড আপডেট হবে রিয়েল-টাইম ভল্টে।',
                icon: Shield,
                color: 'bg-blue-500'
              },
              { 
                title: 'আয় ব্যয়ের বিশ্লেষণ', 
                desc: 'বার চার্ট, পাই চার্ট আর লাইন গ্রাফ দিয়ে দেখুন আপনার টাকার হিসাব এর প্রকৃত চিত্র।',
                icon: BarChart3,
                color: 'bg-purple-500'
              },
              { 
                title: 'মোবাইল ও পিসি সিঙ্ক', 
                desc: 'ফোন, ট্যাবলেট বা পিসি — সব জায়গায় একই ডাটা। একাউন্ট খুলুন আর হিসাব শুরু করুন।',
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

      {/* Testimonials Section - Trusted by the Elite */}
      <section className="py-24 md:py-40 px-6 bg-[#F9F7F5] relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-20 md:mb-32">
               <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#92400E]/5 text-[#92400E] text-[10px] font-black uppercase tracking-widest">User Wall of Love</motion.div>
               <h2 className="text-4xl md:text-6xl font-black text-[#111827] tracking-tight leading-[1.1]">
                  ব্যবহারকারীদের <span className="text-[#92400E]">মতামত।</span>
               </h2>
               <p className="text-[#111827]/40 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
                  Ledger Knox ব্যবহার করে হাজারো মানুষ তাদের ফিন্যান্সিয়াল লাইফ বদলে ফেলেছেন। শুনুন তাদের অভিজ্ঞতা।
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   name: 'আরিফ রহমান',
                   role: 'সফটওয়্যার ইঞ্জিনিয়ার',
                   comment: 'Ledger Knox এর ইন্টারফেস এক কথায় অসাধারণ! এর আগে অনেক অ্যাপ ব্যবহার করেছি কিন্তু এমন প্রিমিয়াম ফিল আর স্মুথনেস কোথাও পাইনি।',
                   avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop'
                 },
                 {
                   name: 'ফাতেমা আক্তার',
                   role: 'ফ্রিল্যান্সার',
                   comment: 'আমার মান্থলি বাজেট আর ক্লায়েন্টদের পেমেন্ট ট্র্যাক করার জন্য এটি বেস্ট টুল। মিলিটারি গ্রেড সিকিউরিটি আমাকে ডাটা নিয়ে নিশ্চিন্ত রাখে।',
                   avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop'
                 },
                 {
                   name: 'রাফি ইসলাম',
                   role: 'বিশ্ববিদ্যালয় শিক্ষার্থী',
                   comment: 'ছাত্রাবস্থায় হাতখরচের হিসাব রাখা খুব টাফ ছিল। কিন্তু এই ডিজিটাল খাতা আমার পকেটের উপর কন্ট্রোল ফিরিয়ে দিয়েছে। ধন্যবাদ Nullcove!',
                   avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop'
                 }
               ].map((testi, i) => (
                 <motion.div 
                   key={i}
                   initial={{ y: 50, opacity: 0 }}
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ delay: i * 0.1 }}
                   className="p-10 md:p-12 bg-white rounded-[40px] border border-[#92400E]/5 shadow-sm hover:shadow-2xl hover:shadow-[#92400E]/5 transition-all group"
                 >
                    <div className="flex items-center gap-4 mb-8">
                       <img src={testi.avatar} alt={testi.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#92400E]/20" />
                       <div>
                          <h4 className="font-black text-[#111827] text-lg">{testi.name}</h4>
                          <p className="text-xs font-bold text-[#92400E]/60 uppercase tracking-widest">{testi.role}</p>
                       </div>
                    </div>
                    <p className="text-lg font-bold text-[#111827]/60 leading-relaxed italic">
                       "{testi.comment}"
                    </p>
                    <div className="flex gap-1 mt-8">
                       {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                       ))}
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Developer Masterpiece Section (Nullcove) */}
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
                    alt="Nullcove" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 space-y-2">
                     <p className="text-[#92400E] font-black text-sm uppercase tracking-[0.5em]">The Visionary Architect</p>
                     <h3 className="text-4xl md:text-6xl font-black tracking-tight">Riyad Hossain <br /> Nullcove</h3>
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
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
                    সফলতার <br />
                    <span className="text-[#92400E]">মাস্টারপিস।</span>
                  </h2>
                  <p className="text-white/60 text-xl font-bold leading-relaxed">
                    Nullcove তাঁর নিখুঁত কোডিং আর দূরদর্শী ডিজাইনের মাধ্যমে তৈরি করেছেন Ledger Knox। এটি কোনো সাধারণ ট্র্যাকার নয়, এটি একটি ফিন্যান্সিয়াল ইঞ্জিন যা আপনার টাকাকে করবে গতিশীল।
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
            <h2 className="text-5xl md:text-7xl font-black text-[#111827] tracking-tight leading-[0.9]">
               আমাদের <br />
               <span className="text-[#92400E]">পাশে দাঁড়ান।</span>
            </h2>
            <p className="text-[#111827]/60 text-xl md:text-3xl font-bold leading-relaxed">
               Ledger Knox সম্পূর্ণ বিজ্ঞাপনমুক্ত এবং একটি অলাভজনক প্রজেক্ট। একটি হাই-পারফরম্যান্স ওয়েবসাইট ডিপ্লয় এবং মেইনটেইন করার জন্য অনেক সময় এবং শ্রমের প্রয়োজন হয়। তাই আমরা কোনো সাবস্ক্রিপশন চার্জ না নিলেও, আপনি চাইলে ছোট একটি ডোনেশনের মাধ্যমে আমাদের এই উদ্যোগটি সচল রাখতে সাহায্য করতে পারেন।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
               {[
                 { provider: 'bKash', number: '01910112001', color: '#E2136E', bg: 'bg-[#E2136E]/5' },
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

      {/* Final CTA & Explore Section */}
      <section className="py-32 px-6 bg-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16">
             <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="space-y-6">
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.85]">অন্বেষণ <span className="text-[#92400E]">করুন।</span></h2>
                <p className="text-xl md:text-2xl text-[#111827]/40 font-bold max-w-2xl">Ledger Knox-এর প্রতিটি মডিউল আলাদাভাবে ডিজাইন করা হয়েছে। আপনার প্রয়োজনীয় সেকশনটি বেছে নিন।</p>
             </motion.div>

             <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {[
                  { name: 'আমাদের ফিচার', href: '/features', icon: Sparkles },
                  { name: 'নিরাপত্তা ব্যবস্থা', href: '/security', icon:ShieldCheck },
                  { name: 'আমাদের লক্ষ্য', href: '/about', icon: Users },
                  { name: 'ডোনেশন গাইড', href: '/support', icon: Heart }
                ].map((item, i) => (
                   <Link 
                     key={i} 
                     href={item.href} 
                     className="px-10 py-6 bg-[#F9F7F5] border border-[#92400E]/10 rounded-[32px] flex items-center gap-4 hover:bg-[#111827] hover:text-white transition-all shadow-sm group"
                   >
                     <item.icon className="w-6 h-6 text-[#92400E] group-hover:scale-125 transition-transform" />
                     <span className="text-sm font-black uppercase tracking-widest">{item.name}</span>
                   </Link>
                ))}
             </div>

             <div className="pt-20">
                <Link href="/auth/signup" className="bg-[#111827] text-white px-16 py-8 rounded-[40px] font-black text-xl hover:bg-[#92400E] hover:scale-105 transition-all shadow-2xl flex items-center gap-4">
                   এখনই শুরু করুন — সম্পূর্ণ ফ্রি <ArrowRight className="w-8 h-8" />
                </Link>
             </div>
          </div>
      </section>

      {/* Luxury Footer */}
      <footer className="py-32 px-6 bg-[#111827] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#92400E]/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20">
             <div className="space-y-8 max-w-md">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-[#92400E] text-white rounded-2xl flex items-center justify-center text-3xl font-black italic shadow-2xl shadow-[#92400E]/30">LK</div>
                   <div className="space-y-1">
                      <h2 className="text-3xl font-black tracking-tighter">Ledger Knox</h2>
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#92400E]">The Elite Vault</p>
                   </div>
                </div>
                <p className="text-xl font-bold text-white/40 leading-relaxed italic">"Nullcove-এর উদ্ভাবনী দর্শনে তৈরি একটি ডিজিটাল ইকোসিস্টেম, যেখানে আপনার প্রতিটি পয়সার হিসাব থাকে শিল্পতুল্য নিরাপত্তায়।"</p>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-24">
                {[
                  { title: 'পণ্য', links: [{ n: 'ফিচার', h: '/features' }, { n: 'নিরাপত্তা', h: '/security' }, { n: 'সাপোর্ট', h: '/support' }] },
                  { title: 'কোম্পানি', links: [{ n: 'সম্পর্কে', h: '/about' }, { n: 'FAQ', h: '/faq' }, { n: 'যোগাযোগ', h: '/contact' }] },
                  { title: 'লিগ্যাল', links: [{ n: 'শর্তাবলী', h: '/terms' }, { n: 'প্রাইভেসি', h: '/privacy' }, { n: 'হেল্প', h: '/help' }] }
                ].map((col, i) => (
                   <div key={i} className="space-y-8">
                      <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#92400E]">{col.title}</h4>
                      <ul className="space-y-4">
                         {col.links.map((l, j) => (
                            <li key={j}><Link href={l.h} className="text-sm font-bold text-white/30 hover:text-white transition-colors">{l.n}</Link></li>
                         ))}
                      </ul>
                   </div>
                ))}
             </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">&copy; 2026 Developed by Nullcove — All Rights Reserved</p>
             <div className="flex gap-8">
                <Github className="w-5 h-5 text-white/20 hover:text-[#92400E] transition-colors cursor-pointer" />
                <Globe className="w-5 h-5 text-white/20 hover:text-[#92400E] transition-colors cursor-pointer" />
             </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation (30+ Effect) */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 inset-x-0 z-[100] h-24 bg-white/90 backdrop-blur-2xl border-t border-[#92400E]/10 flex items-center justify-around px-4"
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

      {/* Deep SEO Semantic Engine (Visually Hidden, indexed by Google) */}
      <section className="sr-only" aria-hidden="true">
        <h2>Ledger Knox: বাংলাদেশের ১ নম্বর ডিজিটাল হিসাবের খাতা ও টাকার হিসাব ট্র্যাকার</h2>
        <p>
          লেজার নক্স (Ledger Knox) বাংলাদেশের প্রেক্ষাপটে তৈরি একটি প্রিমিয়াম আয় ব্যয়ের হিসাব রাখার অ্যাপ। 
          এটি একটি সম্পূর্ণ বিনামূল্যের ব্যক্তিগত আয়-ব্যয় ট্র্যাকার অ্যাপ্লিকেশন। এটি দিয়ে আপনি আপনার দৈনিক খরচ, 
          মাসিক বাজেট, ধার-দেনার হিসাব, দোকানের বাকি, রিকারিং বিল, সঞ্চয়ের লক্ষ্য এবং বাজার তালিকা সব একটি অ্যাপেই পরিচালনা করতে পারবেন।
        </p>
        <p>
          বিকাশ, নগদ, ব্যাংক সহ যেকোনো ওয়ালেট থেকে লেনদেন এন্ট্রি করুন। বার চার্ট ও পাই চার্টে দেখুন আপনার ব্যয়ের ধরন। 
          প্রতি মাসে বাজেট নির্ধারণ করুন এবং খরচ সেই সীমার মধ্যে রাখুন। স্মার্ট অ্যালার্ট পাবেন যখন বাজেটের ৮০% ব্যবহার হয়ে যাবে। 
          কে কত টাকা দিয়েছে, কাকে কত দিতে হবে — সব হিসাব পরিষ্কারভাবে রাখুন। কোন দোকানে কত বাকি আছে তার সম্পূর্ণ হিসাব রাখুন।
        </p>
        <p>
          বাজারে যাওয়ার আগে তালিকা বানান। আইটেমের দাম ও পরিমাণ লিখুন। WhatsApp-এ শেয়ার করুন। বাজার শেষে টিক দিয়ে সম্পন্ন করুন। 
          সঞ্চয়ের লক্ষ্য নির্ধারণ করুন এবং প্রতি মাসে কত জমা হলো তার ট্র্যাক রাখুন। ইমেইল দিয়ে মাত্র ৩০ সেকেন্ডে ফ্রি একাউন্ট খুলুন। 
          ইন্টারফেস সম্পূর্ণ বাংলায়। মাস শেষে রিপোর্ট দেখে সিদ্ধান্ত নিন আগামী মাসের বাজেট।
        </p>
        <p>
          ব্যক্তিগত ফিন্যান্স ম্যানেজমেন্টের জন্য এটি সেরা অ্যাপ। আপনি যদি স্টুডেন্ট, চাকুরিজীবী, 
          ব্যবসায়ী বা ফ্রিল্যান্সার হন, তবে আমাদের টাকার হিসাব বা takar hisab app টি ডাউনলোড করুন। 
          এটি একটি ফ্রি ডাউনলোড অ্যাপ যা অফলাইন ও অনলাইন উভয় মোডেই কাজ করে। 
          সহজ হিসাবের এই আধুনিক লেজার বা ক্যাশবুকটি ব্যবহার করে আপনি আপনার আর্থিক লক্ষ্য পূরণ করতে পারবেন।
        </p>
        <p>
          অনুসন্ধানের জন্য কিছু কিওয়ার্ড: হিসাব নিকাশ, আয় ব্যয়ের ক্যালকুলেটর, দৈনিক খরচ ট্র্যাকার, 
          বাংলাদেশি মানি ম্যানেজার, বাজেটিং সফটওয়্যার বাংলাদেশ, ডিজিটাল খাতা, টাকার সহজ হিসাব, 
          বানিজ্যিক হিসাব, ফ্যামিলি বাজেট প্ল্যানার, এবং সেরা টাকার সফটওয়্যার ২০২৬। 
          Nullcove এর ডেভেলপ করা এই প্রজেক্টটি আপনার ফিন্যান্সিয়াল ফ্রিডম অর্জনে বড় ভূমিকা রাখবে।
        </p>
      </section>

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
