'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Globe, LayoutDashboard, ExternalLink, 
  Sparkles, ShieldCheck, Info, MessageSquare, Heart, 
  Lock, FileText, HelpCircle, ChevronRight, BarChart3,
  Search, Filter, MapPin, Globe2
} from 'lucide-react';
import { insforge } from '@/lib/insforge';

export default function OtherFunctions() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await insforge.auth.getCurrentUser();
      if (!data.user || data.user.email !== 'me@nullcove.com') {
        router.push('/dashboard');
        return;
      }
      setIsAdmin(true);
      
      // Fetch Countries
      try {
        const { data: ctData } = await insforge.database
          .from('visitor_countries')
          .select('*')
          .order('view_count', { ascending: false });
        
        setCountries(ctData || []);
      } catch (err) {
        console.error('Fetch countries failed', err);
      }
      setIsLoading(false);
    };
    checkAdmin();
  }, [router]);

  const filteredCountries = countries.filter(c => 
    (c.country_name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (c.country_code?.toLowerCase() || '').includes(search.toLowerCase())
  );

  const INTERNAL_PAGES = [
    { name: 'ফিচারসমূহ', href: '/features', icon: Sparkles, color: 'text-amber-500' },
    { name: 'নিরাপত্তা ব্যবস্থা', href: '/security', icon: ShieldCheck, color: 'text-blue-500' },
    { name: 'আমাদের সম্পর্কে', href: '/about', icon: Info, color: 'text-emerald-500' },
    { name: 'সচরাচর প্রশ্ন (FAQ)', href: '/faq', icon: HelpCircle, color: 'text-purple-500' },
    { name: 'সহযোগিতা / হেল্প', href: '/help', icon: MessageSquare, color: 'text-rose-500' },
    { name: 'ডোনেশন গাইড', href: '/support', icon: Heart, color: 'text-pink-500' },
    { name: 'যোগাযোগ', href: '/contact', icon: MessageSquare, color: 'text-teal-500' },
    { name: 'প্রাইভেসি পলিসি', href: '/privacy', icon: Lock, color: 'text-zinc-500' },
    { name: 'শর্তাবলী (Terms)', href: '/terms', icon: FileText, color: 'text-zinc-400' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F4F0] dark:bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F4F0] dark:bg-black text-[#18181B] dark:text-white/90 p-4 md:p-8 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <Link href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-amber-600 transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>ড্যাশবোর্ডে ফিরে যান</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#18181B] to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
              অন্যান্য ফাংশন ও এনালাইটিক্স
            </h1>
            <p className="text-zinc-500 mt-2">Ledger Knox-এর সব পেজ এবং গ্লোবাল ভিজিটর এনালাইটিক্স</p>
          </div>
          <div className="flex items-center gap-3 p-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-white/5">
             <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600">
               <Globe className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">এক্টিভ অ্যাডমিন</p>
               <p className="text-sm font-bold">me@nullcove.com</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section 1: All Pages Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <LayoutDashboard className="w-5 h-5 text-amber-600" />
                <h2 className="text-2xl font-bold">পেজ পোর্টাল</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTERNAL_PAGES.map((page, i) => (
                  <Link 
                    key={i} 
                    href={page.href}
                    target="_blank"
                    className="flex items-center justify-between p-6 rounded-2xl bg-[#F9F4F0] dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-amber-500/20 shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-white dark:bg-zinc-900 shadow-sm ${page.color}`}>
                        <page.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{page.name}</h3>
                        <p className="text-xs text-zinc-500">{page.href}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white shadow-xl relative overflow-hidden">
                 <div className="relative z-10">
                   <h3 className="text-zinc-400 text-sm font-bold mb-4 uppercase tracking-wider">সিস্টেম স্ট্যাটাস</h3>
                   <div className="flex items-center gap-3 text-emerald-400 font-bold mb-6">
                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                     ডিজাইন ইঞ্জিন ও ডাটাবেস ১০০% সচল
                   </div>
                   <p className="text-zinc-500 text-sm mb-6">
                     Ledger Knox-এর ব্যাকএন্ড InsForge দ্বারা চালিত এবং রিয়েল-টাইমে ডাটা সিংক্রোনাইজ হচ্ছে।
                   </p>
                 </div>
                 <BarChart3 className="absolute bottom-0 right-0 w-32 h-32 text-white/5 -mb-8 -mr-8" />
               </div>

               <div className="p-8 rounded-[2.5rem] bg-amber-500 text-white shadow-xl">
                 <h3 className="text-amber-100 text-sm font-bold mb-4 uppercase tracking-wider">অ্যাডমিন প্রিভিলেজ</h3>
                 <p className="text-3xl font-bold mb-6 italic">Full Access Granted.</p>
                 <button 
                   onClick={() => window.location.reload()}
                   className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-all flex items-center gap-2"
                 >
                   রিফ্রেশ ডাটা <BarChart3 className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>

          {/* Section 2: Country Stats Table */}
          <div className="lg:col-span-1">
             <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 p-8 shadow-sm h-full flex flex-col">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2">
                   <Globe2 className="w-5 h-5 text-amber-600" />
                   <h2 className="text-2xl font-bold">ভিজিটর লোকেশন</h2>
                 </div>
                 <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full text-xs font-bold font-serif">
                   {countries.length}
                 </span>
               </div>

               {/* Search Box */}
               <div className="relative mb-6">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                 <input 
                   type="text"
                   placeholder="দেশ খুঁজুন..."
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#F9F4F0] dark:bg-zinc-800/50 border-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
                 />
               </div>

               {/* Country List */}
               <div className="flex-1 overflow-y-auto space-y-3 max-h-[600px] pr-2 custom-scrollbar">
                 {filteredCountries.length > 0 ? (
                   filteredCountries.map((c, i) => (
                     <div 
                       key={i}
                       className="p-4 rounded-2xl bg-[#F9F4F0] dark:bg-zinc-800/30 flex items-center justify-between group hover:scale-[1.02] transition-all"
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 flex items-center justify-center text-xl font-bold text-amber-600 shadow-sm transition-transform group-hover:rotate-12">
                             {c.country_code}
                           </div>
                           <div>
                             <h4 className="font-bold text-sm">{c.country_name}</h4>
                             <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                               <MapPin className="w-2 h-2 text-rose-500" /> {c.country_code} Origin
                             </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-xl font-bold font-serif">{c.view_count.toLocaleString('bn-BD')}</p>
                           <p className="text-[10px] text-zinc-400 uppercase font-bold">ভিজিট</p>
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="py-20 text-center text-zinc-400">
                     কোনো ডাটা পাওয়া যায়নি
                   </div>
                 )}
               </div>
               
               <p className="mt-8 text-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                 Live Feed Powered by Ledger Knox
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
