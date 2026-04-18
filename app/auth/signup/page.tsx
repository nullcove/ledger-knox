'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, Key, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck, CheckCircle2, Sparkles, Star, Zap } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import { insforge } from '@/lib/insforge';

// ── Floating orb
function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: 'blur(60px)' }}
      animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── OTP digit input boxes
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const digits = value.split('').concat(Array(6).fill('')).slice(0, 6);
  return (
    <div className="flex gap-3 justify-center">
      {digits.map((d, i) => (
        <motion.input
          key={i}
          maxLength={1}
          value={d}
          whileFocus={{ scale: 1.08, boxShadow: '0 0 0 3px #B4530950' }}
          onChange={e => {
            const newVal = [...digits];
            newVal[i] = e.target.value.replace(/\D/, '');
            onChange(newVal.join(''));
            if (e.target.value && e.target.nextElementSibling) (e.target.nextElementSibling as HTMLInputElement).focus();
          }}
          onKeyDown={e => {
            if (e.key === 'Backspace' && !d && e.currentTarget.previousElementSibling)
              (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
          }}
          className="w-12 h-16 text-center text-2xl font-black bg-white border-2 border-[#B45309]/20 rounded-2xl outline-none transition-all text-[#18181B] focus:border-[#B45309]"
        />
      ))}
    </div>
  );
}

// ── Progress step indicator
function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {[1, 2].map(s => (
        <div key={s} className="flex items-center gap-2">
          <motion.div
            animate={step >= s ? { backgroundColor: '#B45309', scale: [1, 1.2, 1] } : { backgroundColor: '#e2e8f0', scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
          >
            <span className={step >= s ? 'text-white' : 'text-slate-400'}>
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </span>
          </motion.div>
          {s < 2 && (
            <motion.div
              className="h-0.5 w-16 rounded-full"
              animate={{ backgroundColor: step > s ? '#B45309' : '#e2e8f0' }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
      ))}
      <span className="text-[10px] font-black text-[#18181B]/30 uppercase tracking-widest ml-2">
        {step === 1 ? 'তথ্য দিন' : 'ভেরিফাই করুন'}
      </span>
    </div>
  );
}

const BENEFITS = [
  { text: 'সম্পূর্ণ বিনামূল্যে', emoji: '🎯' },
  { text: 'রিয়েল-টাইম সিঙ্ক', emoji: '⚡' },
  { text: 'ব্যাংক-গ্রেড নিরাপত্তা', emoji: '🔒' },
  { text: 'মোবাইল-ফার্স্ট ডিজাইন', emoji: '📱' },
];

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkStrength = (p: string) => {
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9!@#$%]/.test(p)) s++;
    setPasswordStrength(s);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    const emailVal = fd.get('email') as string;
    setEmail(emailVal);
    const { error: err } = await insforge.auth.signUp({
      email: emailVal,
      password: fd.get('password') as string,
      name: fd.get('name') as string,
    });
    if (err) setError('ত্রুটি: ' + err.message);
    else setShowOtp(true);
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await insforge.auth.verifyEmail({ email, otp });
    if (err) setError('ভুল কোড। আবার চেষ্টা করুন।');
    else window.location.href = '/dashboard';
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F4F0] flex flex-col lg:flex-row overflow-hidden">
      <CustomCursor />

      {/* ══ LEFT PANEL ══ */}
      <div className="hidden lg:flex w-[45%] xl:w-1/2 flex-col justify-between p-12 xl:p-16 relative overflow-hidden flex-shrink-0 bg-[#18181B]">

        {/* Effect 1: Multi-orb aurora */}
        <FloatingOrb x="-10%" y="-10%" size={400} color="#B45309" delay={0} />
        <FloatingOrb x="60%" y="50%" size={300} color="#D97706" delay={2} />
        <FloatingOrb x="10%" y="70%" size={200} color="#92400E" delay={4} />

        {/* Effect 2: Animated diagonal lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#B45309] to-transparent"
              style={{ top: `${i * 12}%`, width: '200%', left: '-50%', transform: 'rotate(-15deg)' }}
              animate={{ x: ['-50%', '50%', '-50%'] }}
              transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}
        </div>

        {/* Effect 3: Pulsing concentric circles */}
        <div className="absolute bottom-[-30%] right-[-30%] pointer-events-none">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#B45309]/20"
              style={{ width: i * 200, height: i * 200, top: -i * 100, left: -i * 100 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}
        </div>

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10">
          <Link href="/" className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-[#B45309] rounded-2xl flex items-center justify-center text-white text-2xl font-black italic"
              animate={{ boxShadow: ['0 0 20px #B4530940', '0 0 60px #B4530980', '0 0 20px #B4530940'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >LK</motion.div>
            <span className="text-2xl font-black text-white tracking-tighter">Ledger Knox</span>
          </Link>
        </motion.div>

        {/* Headline */}
        <div className="relative z-10 space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            className="text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.9]"
          >
            নতুন অধ্যায়ের<br />
            <motion.span
              className="inline-block"
              style={{ background: 'linear-gradient(90deg, #B45309, #D97706, #F59E0B, #B45309)', backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              সূচনা হোক।
            </motion.span>
          </motion.h1>

          {/* Effect 4: Benefits with check animation */}
          <div className="space-y-3">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.12, type: 'spring' }}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 cursor-default"
              >
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                >
                  {b.emoji}
                </motion.span>
                <span className="font-black text-white text-sm">{b.text}</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9 + i * 0.12 }}
                  className="ml-auto w-16 h-0.5 bg-gradient-to-r from-[#B45309] to-transparent rounded-full"
                />
              </motion.div>
            ))}
          </div>

          {/* Effect 5: Floating badge */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-3 px-5 py-3 bg-[#B45309]/20 border border-[#B45309]/30 rounded-full"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
              <Star className="w-4 h-4 text-[#B45309]" />
            </motion.div>
            <span className="text-white font-black text-sm">১০ মিনিটে একাউন্ট তৈরি করুন</span>
          </motion.div>
        </div>

        {/* Bottom credit */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B45309]/20 flex items-center justify-center">
            <span className="text-[#B45309] font-black">R</span>
          </div>
          <div>
            <p className="text-white font-black text-sm">Riyad Hossain Huzaifa</p>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Architect & Visionary</p>
          </div>
        </motion.div>
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen lg:min-h-0 px-6 py-12 sm:p-10 relative overflow-hidden">

        {/* Effect 6: bg decoration */}
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #B4530910, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#B45309] rounded-xl flex items-center justify-center text-white text-lg font-black italic shadow-lg shadow-[#B45309]/20">LK</div>
            <span className="text-xl font-black text-[#18181B] tracking-tighter">Ledger Knox</span>
          </Link>

          {/* Effect 7: Step progress bar */}
          <StepBar step={showOtp ? 2 : 1} />

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                className="mb-5 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3"
              >
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }} className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <p className="text-rose-700 font-bold text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!showOtp ? (
              /* ── SIGNUP FORM ── */
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-[#18181B] tracking-tight leading-tight mb-2">
                    শুরু করুন,<br />
                    <span className="text-[#B45309]">সদস্য হতে চান?</span>
                  </h2>
                  <p className="text-[#18181B]/40 font-bold text-sm">সাধারণ তথ্য দিয়ে একাউন্ট তৈরি করুন।</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  {/* Name */}
                  {[
                    { name: 'name', type: 'text', label: 'আপনার নাম', placeholder: 'পুরো নাম...', icon: User, ac: 'name' },
                    { name: 'email', type: 'email', label: 'ইমেইল', placeholder: 'hello@example.com', icon: Mail, ac: 'email' },
                  ].map((f, i) => (
                    <motion.div
                      key={f.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] font-black text-[#B45309] uppercase tracking-[0.2em] ml-1">{f.label}</label>
                      <div className="relative group">
                        <f.icon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#18181B]/20 group-focus-within:text-[#B45309] transition-colors" />
                        <input
                          name={f.name}
                          type={f.type}
                          required
                          autoComplete={f.ac}
                          placeholder={f.placeholder}
                          className="w-full pl-14 pr-5 py-5 rounded-2xl bg-white border border-[#B45309]/10 font-black text-[#18181B] outline-none focus:ring-4 focus:ring-[#B45309]/15 focus:border-[#B45309]/30 transition-all placeholder:text-slate-300"
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Password + strength */}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
                    <label className="text-[10px] font-black text-[#B45309] uppercase tracking-[0.2em] ml-1">পাসওয়ার্ড</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#18181B]/20 group-focus-within:text-[#B45309] transition-colors" />
                      <input
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        required
                        placeholder="কমপক্ষে ৬ অক্ষর"
                        onChange={e => checkStrength(e.target.value)}
                        className="w-full pl-14 pr-14 py-5 rounded-2xl bg-white border border-[#B45309]/10 font-black text-[#18181B] outline-none focus:ring-4 focus:ring-[#B45309]/15 focus:border-[#B45309]/30 transition-all placeholder:text-slate-300"
                      />
                      <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#18181B]/30 hover:text-[#B45309] transition-colors p-1">
                        {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {/* Effect 8: Password strength bar */}
                    {passwordStrength > 0 && (
                      <div className="flex gap-1.5 px-1">
                        {[1, 2, 3, 4].map(s => (
                          <motion.div
                            key={s}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: passwordStrength >= s ? 1 : 0.1 }}
                            className="flex-1 h-1 rounded-full origin-left"
                            style={{ backgroundColor: passwordStrength >= 3 ? '#10b981' : passwordStrength >= 2 ? '#f59e0b' : '#ef4444', opacity: passwordStrength >= s ? 1 : 0.15 }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                        <span className="text-[10px] font-black ml-1" style={{ color: passwordStrength >= 3 ? '#10b981' : passwordStrength >= 2 ? '#f59e0b' : '#ef4444' }}>
                          {passwordStrength >= 3 ? 'শক্তিশালী' : passwordStrength >= 2 ? 'মাঝারি' : 'দুর্বল'}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Effect 9: Shimmer submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="relative w-full bg-[#18181B] text-white py-5 rounded-2xl font-black text-base overflow-hidden mt-2 disabled:opacity-50"
                    whileHover={{ scale: 1.01, backgroundColor: '#B45309' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.2 }}
                    />
                    <span className="relative flex items-center justify-center gap-3">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>অ্যাকাউন্ট খুলুন <ArrowRight className="w-5 h-5" /></>}
                    </span>
                  </motion.button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-[#18181B]/40 font-bold text-sm">
                    ইতিমধ্যে একাউন্ট আছে?{' '}
                    <Link href="/auth/login" className="text-[#B45309] font-black hover:underline">লগইন করুন →</Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ── OTP VERIFY ── */
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div className="mb-8 text-center">
                  {/* Effect 10: Mail envelope animation */}
                  <motion.div
                    className="w-20 h-20 bg-[#B45309]/10 rounded-3xl flex items-center justify-center mx-auto mb-5"
                    animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Mail className="w-10 h-10 text-[#B45309]" />
                  </motion.div>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#18181B] tracking-tight mb-2">
                    কোড দিন!
                  </h2>
                  <p className="text-[#18181B]/40 font-bold text-sm">
                    <span className="text-[#B45309] font-black">{email}</span>-এ ৬ ডিজিটের কোড পাঠানো হয়েছে।
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                  {/* Effect 11: Split OTP boxes */}
                  <OtpInput value={otp} onChange={setOtp} />

                  <motion.button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="relative w-full bg-[#B45309] text-white py-5 rounded-2xl font-black text-base overflow-hidden disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8 }}
                    />
                    <span className="relative flex items-center justify-center gap-3">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> ভেরিফাই করুন</>}
                    </span>
                  </motion.button>

                  <div className="flex items-center justify-between text-sm">
                    <button type="button" onClick={() => setShowOtp(false)} className="text-[#18181B]/40 font-black text-xs uppercase tracking-widest hover:text-[#B45309] transition-colors">
                      ← ইমেইল পরিবর্তন
                    </button>
                    <button type="button" onClick={async () => { await insforge.auth.resendVerificationEmail({ email }); alert('✓ নতুন কোড পাঠানো হয়েছে!'); }} className="text-[#B45309] font-black text-xs uppercase tracking-widest hover:underline">
                      পুনরায় পাঠান
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex items-center justify-center gap-5 mt-8 pt-7 border-t border-[#B45309]/8"
          >
            {[{ icon: ShieldCheck, label: 'Secure' }, { icon: Sparkles, label: 'Powered' }, { icon: Zap, label: 'Fast' }].map((b, i) => (
              <motion.span key={i} whileHover={{ y: -2, color: '#B45309' }} className="flex items-center gap-1.5 text-[9px] font-black text-[#18181B]/20 uppercase tracking-widest cursor-default transition-colors">
                <b.icon className="w-3 h-3" /> {b.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
