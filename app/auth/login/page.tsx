'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck, Sparkles, TrendingUp, PiggyBank, BarChart3, Zap, Star } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import { insforge } from '@/lib/insforge';

// ── Floating particle
function Particle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#B45309] pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [-12, 12, -12], opacity: [0.15, 0.4, 0.15], scale: [1, 1.3, 1] }}
      transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── Animated counter
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const ctrl = animate(0, target, { duration: 2, ease: 'easeOut', onUpdate: v => setVal(Math.round(v)) });
    return ctrl.stop;
  }, [target]);
  return <span>{val.toLocaleString()}{suffix}</span>;
}

// ── Typewriter
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = texts[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < full.length) {
      timer = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === full.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, texts]);
  return (
    <span className="text-[#B45309]">
      {displayed}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>|</motion.span>
    </span>
  );
}

const STATS = [{ value: 12000, suffix: '+', label: 'ব্যবহারকারী' }, { value: 5, suffix: 'M+', label: 'লেনদেন' }, { value: 99, suffix: '%', label: 'নিরাপদ' }];
const FEATURES = [
  { icon: TrendingUp, title: 'লেনদেন ট্র্যাক' },
  { icon: PiggyBank, title: 'সঞ্চয় লক্ষ্য' },
  { icon: BarChart3, title: 'বিশ্লেষণ' },
];

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic/parallax mouse tracking for left panel
  const bgX = useTransform(mouseX, [0, 1], [-20, 20]);
  const bgY = useTransform(mouseY, [0, 1], [-20, 20]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    const { error: err } = await insforge.auth.signInWithPassword({
      email: fd.get('email') as string,
      password: fd.get('password') as string,
    });
    if (err) setError('ভুল ইমেইল বা পাসওয়ার্ড। আবার চেষ্টা করুন।');
    else window.location.href = '/dashboard';
    setLoading(false);
  };

  const particles = Array.from({ length: 18 }, (_, i) => ({
    delay: i * 0.3,
    x: `${5 + (i * 13) % 90}%`,
    y: `${10 + (i * 17) % 80}%`,
    size: 4 + (i % 4) * 3,
  }));

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F9F4F0] flex flex-col lg:flex-row overflow-hidden">
      <CustomCursor />

      {/* ══ LEFT PANEL ══ */}
      <div className="hidden lg:flex w-[45%] xl:w-1/2 flex-col justify-between p-12 xl:p-16 relative overflow-hidden flex-shrink-0 bg-[#18181B]">
        {/* Effect 1: Animated aurora blobs */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-[-20%] left-[-20%] w-[700px] h-[700px] rounded-full bg-[#B45309]"
            style={{ filter: 'blur(180px)' }}
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#D97706]"
            style={{ filter: 'blur(140px)' }}
            animate={{ opacity: [0.05, 0.14, 0.05], scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#92400E]"
            style={{ filter: 'blur(100px)' }}
            animate={{ opacity: [0.04, 0.1, 0.04], rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Effect 2: Floating particles */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}

        {/* Effect 3: Animated grid mesh */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#B45309" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Effect 4: Rotating ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#B45309]/10 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#B45309]/8 pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10">
          <Link href="/" className="flex items-center gap-4">
            {/* Effect 5: Pulsing logo glow */}
            <motion.div
              className="w-12 h-12 bg-[#B45309] rounded-2xl flex items-center justify-center text-white text-2xl font-black italic shadow-2xl"
              animate={{ boxShadow: ['0 0 20px #B4530940', '0 0 50px #B4530970', '0 0 20px #B4530940'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >LK</motion.div>
            <span className="text-2xl font-black text-white tracking-tighter">Ledger Knox</span>
          </Link>
        </motion.div>

        {/* Headline with typewriter */}
        <div className="relative z-10 space-y-8">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            className="text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.9]"
          >
            আপনার অর্থের<br />
            <Typewriter texts={['স্মার্ট সঙ্গী।', 'নিরাপদ ভল্ট।', 'ডিজিটাল হিসাব।']} />
          </motion.h1>

          {/* Effect 6: Staggered feature pills */}
          <div className="space-y-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15, type: 'spring' }}
                whileHover={{ x: 6, backgroundColor: 'rgba(180,83,9,0.15)' }}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/8 cursor-default"
              >
                <motion.div
                  className="w-10 h-10 bg-[#B45309]/20 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <f.icon className="w-5 h-5 text-[#B45309]" />
                </motion.div>
                <span className="font-black text-white text-sm">{f.title}</span>
                {/* Effect 7: shimmer line */}
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Effect 8: Animated stats counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-3 gap-4"
          >
            {STATS.map((s, i) => (
              <div key={i} className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-2xl font-black text-[#B45309]">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="relative z-10 flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl bg-[#B45309]/20 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-[#B45309] font-black">R</span>
          </motion.div>
          <div>
            <p className="text-white font-black text-sm">Riyad Hossain Huzaifa</p>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Architect & Visionary</p>
          </div>
          {/* Effect 9: orbiting star */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="ml-auto">
            <Star className="w-4 h-4 text-[#B45309]/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen lg:min-h-0 px-6 py-12 sm:p-10 relative overflow-hidden">
        {/* Effect 10: Subtle bg orb */}
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #B4530912, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Link href="/" className="lg:hidden flex items-center gap-3 mb-10">
              <motion.div
                className="w-10 h-10 bg-[#B45309] rounded-xl flex items-center justify-center text-white text-lg font-black italic"
                animate={{ boxShadow: ['0 0 10px #B4530940', '0 0 30px #B4530970', '0 0 10px #B4530940'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >LK</motion.div>
              <span className="text-xl font-black text-[#18181B] tracking-tighter">Ledger Knox</span>
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-[#18181B] tracking-tight leading-tight mb-2">
              স্বাগতম<br />
              <motion.span
                className="text-[#B45309] inline-block"
                animate={{ backgroundSize: ['100%', '200%', '100%'] }}
                style={{ backgroundImage: 'linear-gradient(90deg, #B45309, #D97706, #B45309)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%' }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ফিরে আসার
              </motion.span>{' '}জন্য।
            </h2>
            <p className="text-[#18181B]/40 font-bold">আপনার একাউন্টে লগইন করুন।</p>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-5 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3"
              >
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }} className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <p className="text-rose-700 font-bold text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email field — Effect 11: glowing border on focus */}
            {[
              { name: 'email', type: focused === 'email' ? 'email' : 'email', label: 'ইমেইল', placeholder: 'hello@example.com', icon: Mail, id: 'email' },
            ].map(field => (
              <motion.div key={field.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
                <label className="text-[10px] font-black text-[#B45309] uppercase tracking-[0.2em] ml-1">{field.label}</label>
                <div className="relative group">
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={focused === field.id ? { boxShadow: '0 0 0 3px #B4530930, 0 0 20px #B4530918' } : { boxShadow: '0 0 0 0px transparent' }}
                    transition={{ duration: 0.2 }}
                  />
                  <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#18181B]/20 group-focus-within:text-[#B45309] transition-colors z-10" />
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    autoComplete="email"
                    placeholder={field.placeholder}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    className="w-full pl-14 pr-5 py-5 rounded-2xl bg-white border border-[#B45309]/10 font-black text-[#18181B] text-base outline-none transition-all placeholder:text-slate-300 relative z-[1]"
                  />
                </div>
              </motion.div>
            ))}

            {/* Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
              <label className="text-[10px] font-black text-[#B45309] uppercase tracking-[0.2em] ml-1">পাসওয়ার্ড</label>
              <div className="relative group">
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={focused === 'password' ? { boxShadow: '0 0 0 3px #B4530930, 0 0 20px #B4530918' } : { boxShadow: '0 0 0 0px transparent' }}
                  transition={{ duration: 0.2 }}
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#18181B]/20 group-focus-within:text-[#B45309] transition-colors z-10" />
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-14 pr-14 py-5 rounded-2xl bg-white border border-[#B45309]/10 font-black text-[#18181B] text-base outline-none transition-all placeholder:text-slate-300 z-[1] relative"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#18181B]/30 hover:text-[#B45309] transition-colors z-10 p-1"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Effect 12: Animated submit button with shimmer */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <motion.button
                type="submit"
                disabled={loading}
                className="relative w-full bg-[#18181B] text-white py-5 rounded-2xl font-black text-base overflow-hidden mt-2 disabled:opacity-50"
                whileHover={{ scale: 1.01, backgroundColor: '#B45309' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>লগইন করুন <ArrowRight className="w-5 h-5" /></>}
                </span>
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-[#B45309]/10" />
            <span className="text-[10px] font-black text-[#18181B]/20 uppercase tracking-widest">অথবা</span>
            <div className="flex-1 h-px bg-[#B45309]/10" />
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="space-y-3 text-center">
            <p className="text-[#18181B]/50 font-bold text-sm">
              একাউন্ট নেই?{' '}
              <Link href="/auth/signup" className="text-[#B45309] font-black hover:underline">
                সাইনআপ করুন →
              </Link>
            </p>
            <p className="text-[#18181B]/40 font-bold text-sm">
              পাসওয়ার্ড ভুলে গেছেন?{' '}
              <motion.button
                whileHover={{ color: '#18181B' }}
                type="button"
                onClick={async () => {
                  const email = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value;
                  if (!email) { alert('আগে ইমেইল দিন'); return; }
                  await insforge.auth.sendResetPasswordEmail({ email });
                  alert('✓ রিসেট লিংক পাঠানো হয়েছে!');
                }}
                className="text-[#B45309] font-black hover:underline"
              >
                রিসেট করুন
              </motion.button>
            </p>
          </motion.div>

          {/* Effect 13: trust badges with hover lift */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-5 mt-8 pt-7 border-t border-[#B45309]/8"
          >
            {[
              { icon: ShieldCheck, label: 'End-to-End Secure' },
              { icon: Sparkles, label: 'InsForge Powered' },
              { icon: Zap, label: 'Ultra Fast' },
            ].map((b, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -2, color: '#B45309' }}
                className="flex items-center gap-1.5 text-[9px] font-black text-[#18181B]/20 uppercase tracking-widest cursor-default transition-colors"
              >
                <b.icon className="w-3 h-3" /> {b.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
