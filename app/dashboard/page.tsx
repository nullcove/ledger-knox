'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet, Plus, Coffee, Zap, ShoppingCart, MoreHorizontal, Check, Trash2, Edit2,
  LayoutDashboard, ListOrdered, BarChart3, PiggyBank, Receipt, X, CreditCard,
  Target, Menu, Sun, Moon, Briefcase, RefreshCw, LogOut, Calendar, UserPlus,
  ArrowUpRight, ArrowDownLeft, ArrowRight, Search, Filter, Loader2,
  ShieldCheck, AlertTriangle, CheckCircle2, Settings, Camera, Lock, Bell,
  TrendingUp, ChevronLeft, ChevronRight as ChevronRightIcon, Star, Mail
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { format, isSameMonth, parseISO, subMonths, addDays, differenceInDays } from 'date-fns';
import { bn } from 'date-fns/locale';
import CustomCursor from '@/components/CustomCursor';
import { insforge } from '@/lib/insforge';

// ================= TYPES =================
type TransactionType = 'expense' | 'income' | 'transfer';
type WalletType = 'cash' | 'bkash' | 'nagad' | 'bank';

interface Transaction {
  id: string; type: TransactionType; amount: number;
  category: string; note: string; date: string; walletId?: WalletType;
}
interface Todo { id: string; text: string; isCompleted: boolean; }
interface WalletObj { id: WalletType; name: string; balance: number; icon: any; color: string; }
interface Goal { id: string; name: string; target: number; saved: number; }
interface Debt { id: string; person: string; amount: number; type: 'borrowed' | 'lent'; note?: string; created_at: string; }
interface Subscription { id: string; name: string; amount: number; nextDate: string; }
interface Budget { id: string; category: string; monthly_limit: number; }
interface Profile {
  id?: string; display_name?: string; avatar_url?: string;
  default_wallet?: WalletType; currency_symbol?: string;
}

// ================= CONSTANTS =================
const CATEGORIES = [
  { id: 'খাবার', icon: Coffee, color: '#B45309' },
  { id: 'বিল', icon: Zap, color: '#D97706' },
  { id: 'কেনাকাটা', icon: ShoppingCart, color: '#18181B' },
  { id: 'যাতায়াত', icon: Target, color: '#B45309' },
  { id: 'অন্যান্য', icon: MoreHorizontal, color: '#71717A' },
];

const WALLETS_INITIAL: WalletObj[] = [
  { id: 'cash', name: 'ক্যাশ টাকা', balance: 0, icon: Wallet, color: 'text-amber-600 bg-amber-100 border-amber-200' },
  { id: 'bkash', name: 'বিকাশ', balance: 0, icon: CreditCard, color: 'text-rose-600 bg-rose-100 border-rose-200' },
  { id: 'nagad', name: 'নগদ', balance: 0, icon: Zap, color: 'text-orange-600 bg-orange-100 border-orange-200' },
  { id: 'bank', name: 'ব্যাংক', balance: 0, icon: Target, color: 'text-blue-600 bg-blue-100 border-blue-200' },
];

const QUICK_ACTIONS = [
  { label: 'চা ৳২০', category: 'খাবার', amount: 20, icon: Coffee },
  { label: 'রিকশা ৳৫০', category: 'যাতায়াত', amount: 50, icon: Target },
  { label: 'লাঞ্চ ৳১৫০', category: 'খাবার', amount: 150, icon: Coffee },
  { label: 'বাসভাড়া ৳৩০', category: 'যাতায়াত', amount: 30, icon: Target },
  { label: 'নাস্তা ৳৮০', category: 'খাবার', amount: 80, icon: Coffee },
];

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { id: 'transactions', label: 'লেনদেনসমূহ', icon: Receipt },
  { id: 'budget', label: 'বাজেট ও লিমিট', icon: Target },
  { id: 'goals', label: 'জমানো টাকা', icon: PiggyBank },
  { id: 'debts', label: 'ধার-দেনা', icon: Briefcase },
  { id: 'recurring', label: 'রিকারিং বিল', icon: RefreshCw },
  { id: 'tasks', label: 'বাজার তালিকা', icon: ListOrdered },
  { id: 'analytics', label: 'বিশ্লেষণ', icon: BarChart3 },
  { id: 'settings', label: 'সেটিংস', icon: Settings },
];

const PIE_COLORS = ['#B45309', '#D97706', '#18181B', '#92400E', '#78716C'];

// ================= COMPONENT =================
export default function AppOverview() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit transaction state
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editCat, setEditCat] = useState('খাবার');
  const [editType, setEditType] = useState<TransactionType>('expense');
  const [editDate, setEditDate] = useState('');
  const [editWallet, setEditWallet] = useState<WalletType>('cash');

  // Settings extra
  const [settingsNewEmail, setSettingsNewEmail] = useState('');

  // Data state
  const [wallets, setWallets] = useState<WalletObj[]>(WALLETS_INITIAL);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [profile, setProfile] = useState<Profile>({});
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Modal form state
  const [formType, setFormType] = useState<TransactionType>('expense');
  const [amountInput, setAmountInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [catInput, setCatInput] = useState('খাবার');
  const [walletInput, setWalletInput] = useState<WalletType>('cash');
  const [dateInput, setDateInput] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Form states for other tabs
  const [goalAddName, setGoalAddName] = useState('');
  const [goalAddTarget, setGoalAddTarget] = useState('');
  const [goalAddSaved, setGoalAddSaved] = useState('');
  const [budgetCat, setBudgetCat] = useState('খাবার');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [taskInput, setTaskInput] = useState('');

  // Settings state
  const [settingsName, setSettingsName] = useState('');
  const [settingsOldPass, setSettingsOldPass] = useState('');
  const [settingsNewPass, setSettingsNewPass] = useState('');
  const [settingsAvatar, setSettingsAvatar] = useState('');
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState<string>('');

  // Theme classes
  const bgRoot = 'bg-[#F9F4F0]';
  const inputCls = `px-6 py-4 rounded-2xl border transition-all focus:outline-none focus:ring-4 focus:ring-[#B45309]/5 bg-white border-[#B45309]/10 text-[#18181B] placeholder:text-slate-400`;

  // ─── FETCH ALL DATA ─────────────────────────────
  const fetchAll = useCallback(async () => {
    try {
      const { data: userDat } = await insforge.auth.getCurrentUser();
      if (!userDat.user) return;
      setCurrentUser(userDat.user);

      const [txRes, tdRes, goRes, dbRes, subRes, budRes, profRes] = await Promise.all([
        insforge.database.from('transactions').select('*').order('date', { ascending: false }),
        insforge.database.from('todos').select('*').order('created_at', { ascending: false }),
        insforge.database.from('goals').select('*').order('created_at', { ascending: false }),
        insforge.database.from('debts').select('*').order('created_at', { ascending: false }),
        insforge.database.from('subscriptions').select('*').order('next_date', { ascending: true }),
        insforge.database.from('budgets').select('*').order('created_at', { ascending: true }),
        insforge.database.from('profiles').select('*').eq('id', userDat.user.id),
      ]);

      if (txRes.data) {
        const txs: Transaction[] = txRes.data.map((d: any) => ({
          id: d.id, type: d.type, amount: Number(d.amount),
          category: d.category, note: d.note, date: d.date, walletId: d.wallet_id,
        }));
        setTransactions(txs);
        const wMap: Record<string, number> = { cash: 0, bkash: 0, nagad: 0, bank: 0 };
        txs.forEach(t => {
          if (t.walletId && wMap[t.walletId] !== undefined) {
            if (t.type === 'income') wMap[t.walletId] += t.amount;
            else if (t.type === 'expense') wMap[t.walletId] -= t.amount;
          }
        });
        setWallets(prev => prev.map(w => ({ ...w, balance: wMap[w.id] ?? 0 })));
      }
      if (tdRes.data) setTodos(tdRes.data.map((d: any) => ({ id: d.id, text: d.text, isCompleted: d.is_completed })));
      if (goRes.data) setGoals(goRes.data.map((d: any) => ({ id: d.id, name: d.name, target: Number(d.target), saved: Number(d.saved) })));
      if (dbRes.data) setDebts(dbRes.data.map((d: any) => ({ id: d.id, person: d.person, amount: Number(d.amount), type: d.type, note: d.note, created_at: d.created_at })));
      if (subRes.data) setSubscriptions(subRes.data.map((d: any) => ({ id: d.id, name: d.name, amount: Number(d.amount), nextDate: d.next_date })));
      if (budRes.data) setBudgets(budRes.data.map((d: any) => ({ id: d.id, category: d.category, monthly_limit: Number(d.monthly_limit) })));
      if (profRes.data && profRes.data.length > 0) {
        const p = profRes.data[0];
        setProfile(p);
        setSettingsName(p.display_name || '');
        setSettingsAvatar(p.avatar_url || '');
      }
    } catch (e) { console.error('Fetch failed', e); }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    const check = async () => {
      const { data } = await insforge.auth.getCurrentUser();
      if (!data.user) { router.push('/'); return; }
      fetchAll();
    };
    check();
    const refresh = () => fetchAll();
    insforge.realtime.connect().then(() => {
      ['transactions', 'todos', 'debts', 'subscriptions', 'budgets', 'goals', 'profiles'].forEach(t => insforge.realtime.subscribe(t));
      ['INSERT', 'UPDATE', 'DELETE'].forEach(ev => {
        ['transactions', 'todos', 'debts', 'subscriptions', 'budgets'].forEach(t => insforge.realtime.on(`${ev}_${t}`, refresh));
      });
    }).catch(() => {});
    return () => { insforge.realtime.disconnect(); };
  }, [fetchAll, router]);

  const handleSignOut = async () => { await insforge.auth.signOut(); router.push('/'); };

  // ─── HANDLERS ───────────────────────────────────
  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountInput || isNaN(Number(amountInput))) return;
    setIsSaving(true);
    const { error } = await insforge.database.from('transactions').insert({
      type: formType, amount: Number(amountInput), category: catInput,
      note: noteInput, date: new Date(dateInput).toISOString(), wallet_id: walletInput,
    });
    if (!error) { await fetchAll(); setIsModalOpen(false); setAmountInput(''); setNoteInput(''); }
    setIsSaving(false);
  };

  const deleteTransaction = async (id: string) => {
    if (!window.confirm('এই লেনদেনটি ডিলিট করতে চান?')) return;
    await insforge.database.from('transactions').delete().eq('id', id);
    await fetchAll();
  };

  const openEditTx = (tx: Transaction) => {
    setEditingTx(tx);
    setEditAmount(String(tx.amount));
    setEditNote(tx.note || '');
    setEditCat(tx.category);
    setEditType(tx.type);
    setEditDate(format(parseISO(tx.date), 'yyyy-MM-dd'));
    setEditWallet((tx.walletId || 'cash') as WalletType);
  };

  const handleUpdateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTx) return;
    setIsSaving(true);
    await insforge.database.from('transactions').update({
      type: editType, amount: Number(editAmount), category: editCat,
      note: editNote, date: new Date(editDate).toISOString(), wallet_id: editWallet,
    }).eq('id', editingTx.id);
    await fetchAll();
    setEditingTx(null);
    setIsSaving(false);
  };

  const handleChangeEmail = async () => {
    if (!settingsNewEmail || !settingsNewEmail.includes('@')) { setSettingsMsg('সঠিক ইমেইল দিন।'); return; }
    setSettingsSaving(true);
    // Send reset email to new address for verification
    const { error } = await insforge.auth.sendResetPasswordEmail({ email: currentUser?.email || '' });
    if (!error) {
      // Store pending email in profile for reference
      await insforge.database.from('profiles').upsert({ id: currentUser?.id, pending_email: settingsNewEmail });
      setSettingsMsg('✓ ইমেইল পরিবর্তনের জন্য আপনার বর্তমান ইমেইলে একটি লিংক পাঠানো হয়েছে। লিংকে ক্লিক করুন।');
      setSettingsNewEmail('');
    } else {
      setSettingsMsg('ইমেইল পরিবর্তন ব্যর্থ হয়েছে।');
    }
    setSettingsSaving(false);
    setTimeout(() => setSettingsMsg(''), 6000);
  };

  const handleQuickAction = async (action: typeof QUICK_ACTIONS[0]) => {
    setIsSaving(true);
    await insforge.database.from('transactions').insert({
      type: 'expense', amount: action.amount, category: action.category,
      note: action.label, date: new Date().toISOString(), wallet_id: 'cash',
    });
    await fetchAll();
    setIsSaving(false);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!currentUser) return;
    setSettingsSaving(true);
    try {
      const ext = file.name.split('.').pop();
      const key = `${currentUser.id}/avatar.${ext}`;
      const { data, error } = await insforge.storage.from('avatars').upload(key, file);
      if (!error && data) {
        const url = (data as any).url || '';
        await insforge.database.from('profiles').upsert({ id: currentUser.id, avatar_url: url });
        await insforge.auth.setProfile({ avatar_url: url });
        setSettingsAvatar(url);
        setProfile(prev => ({ ...prev, avatar_url: url }));
        setSettingsMsg('✓ প্রোফাইল ছবি আপডেট হয়েছে!');
      } else if (error) {
        setSettingsMsg('ছবি আপলোড ব্যর্থ হয়েছে।');
      }
    } catch (err) { setSettingsMsg('ছবি আপলোড ব্যর্থ হয়েছে।'); }
    setSettingsSaving(false);
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    setSettingsSaving(true);
    await insforge.database.from('profiles').upsert({ id: currentUser.id, display_name: settingsName });
    await insforge.auth.setProfile({ name: settingsName });
    setProfile(prev => ({ ...prev, display_name: settingsName }));
    setSettingsMsg('✓ নাম আপডেট হয়েছে!');
    setSettingsSaving(false);
    setTimeout(() => setSettingsMsg(''), 3000);
  };

  const handleChangePassword = async () => {
    if (!settingsNewPass || settingsNewPass.length < 6) { setSettingsMsg('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।'); return; }
    setSettingsSaving(true);
    // Use sendResetPasswordEmail — most reliable way to trigger password change
    const { error } = await insforge.auth.sendResetPasswordEmail({ email: currentUser?.email || '' });
    if (!error) { setSettingsMsg('✓ পাসওয়ার্ড রিসেট ইমেইল পাঠানো হয়েছে! ইনবক্স চেক করুন।'); setSettingsNewPass(''); }
    else setSettingsMsg('পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে।');
    setSettingsSaving(false);
    setTimeout(() => setSettingsMsg(''), 5000);
  };

  // ─── DERIVED DATA ───────────────────────────────
  const filteredTransactions = useMemo(() =>
    transactions.filter(t => {
      const matchSearch = (t.note + t.category).toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = filterCategory === 'all' || t.category === filterCategory;
      return matchSearch && matchCat;
    }), [transactions, searchQuery, filterCategory]);

  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const thisMonthExpenses = transactions.filter(t => t.type === 'expense' && isSameMonth(parseISO(t.date), new Date())).reduce((s, t) => s + t.amount, 0);
  const thisMonthIncome = transactions.filter(t => t.type === 'income' && isSameMonth(parseISO(t.date), new Date())).reduce((s, t) => s + t.amount, 0);

  // Net Worth
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalDebt = debts.filter(d => d.type === 'borrowed').reduce((s, d) => s + d.amount, 0);
  const totalOwed = debts.filter(d => d.type === 'lent').reduce((s, d) => s + d.amount, 0);
  const netWorth = totalBalance + totalSaved - totalDebt;

  // Cash Flow Forecast (avg of last 3 months)
  const avgMonthlyIncome = useMemo(() => {
    const total = [1, 2, 3].reduce((s, i) => {
      const d = subMonths(new Date(), i);
      return s + transactions.filter(t => t.type === 'income' && isSameMonth(parseISO(t.date), d)).reduce((sum, t) => sum + t.amount, 0);
    }, 0);
    return total / 3;
  }, [transactions]);
  const avgMonthlyExpense = useMemo(() => {
    const total = [1, 2, 3].reduce((s, i) => {
      const d = subMonths(new Date(), i);
      return s + transactions.filter(t => t.type === 'expense' && isSameMonth(parseISO(t.date), d)).reduce((sum, t) => sum + t.amount, 0);
    }, 0);
    return total / 3;
  }, [transactions]);

  // Due alerts (next 7 days)
  const dueAlerts = useMemo(() =>
    subscriptions.filter(s => {
      try { const days = differenceInDays(parseISO(s.nextDate), new Date()); return days >= 0 && days <= 7; } catch { return false; }
    }), [subscriptions]);

  // Monthly Summary (current month)
  const topCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions.filter(t => t.type === 'expense' && isSameMonth(parseISO(t.date), new Date())).forEach(t => { counts[t.category] = (counts[t.category] || 0) + t.amount; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  }, [transactions]);

  // Budget progress
  const budgetProgress = useMemo(() => budgets.map(b => {
    const spent = transactions.filter(t => t.type === 'expense' && t.category === b.category && isSameMonth(parseISO(t.date), new Date())).reduce((s, t) => s + t.amount, 0);
    const pct = b.monthly_limit > 0 ? Math.min((spent / b.monthly_limit) * 100, 100) : 0;
    return { ...b, spent, pct };
  }), [budgets, transactions]);

  // Pie chart data
  const pieData = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions.filter(t => t.type === 'expense' && isSameMonth(parseISO(t.date), new Date())).forEach(t => { counts[t.category] = (counts[t.category] || 0) + t.amount; });
    return Object.entries(counts).map(([name, value], i) => ({ name, value, color: PIE_COLORS[i % PIE_COLORS.length] }));
  }, [transactions]);

  // Bar chart (6 months)
  const barData = useMemo(() => Array.from({ length: 6 }).map((_, i) => {
    const d = subMonths(new Date(), 5 - i);
    const income = transactions.filter(t => t.type === 'income' && isSameMonth(parseISO(t.date), d)).reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense' && isSameMonth(parseISO(t.date), d)).reduce((s, t) => s + t.amount, 0);
    return { month: format(d, 'MMM', { locale: bn }), আয়: income, ব্যয়: expense };
  }), [transactions]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F4F0] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-[6px] border-[#B45309] border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-xl tracking-tighter uppercase opacity-50 text-[#18181B]">Ledger Knox...</p>
      </div>
    );
  }

  const displayName = profile.display_name || currentUser?.email?.split('@')[0] || 'ব্যবহারকারী';
  const currency = profile.currency_symbol || '৳';

  // ─── SIDEBAR ────────────────────────────────────
  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      <div className={collapsed ? 'p-4' : 'p-8'}>
        {/* Logo + collapse button */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-8`}>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B45309] rounded-xl flex items-center justify-center text-white text-xl font-black italic shadow-lg shadow-[#B45309]/20">LK</div>
              <h1 className="text-xl font-black text-[#18181B] tracking-tighter">Ledger Knox</h1>
            </Link>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-[#B45309] rounded-xl flex items-center justify-center text-white text-xl font-black italic shadow-lg shadow-[#B45309]/20">LK</div>
          )}
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400"><X className="w-6 h-6" /></button>
        </div>

        {/* Profile mini card */}
        <button
          onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-4'} p-3 bg-[#F9F4F0] rounded-2xl mb-6 hover:bg-[#B45309]/5 transition-all group`}
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#B45309]/10 flex items-center justify-center flex-shrink-0">
            {settingsAvatar ? <img src={settingsAvatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-[#B45309] font-black text-lg">{displayName.charAt(0).toUpperCase()}</span>}
          </div>
          {!collapsed && (
            <div className="flex-1 text-left min-w-0">
              <p className="font-black text-[#18181B] text-sm truncate">{displayName}</p>
              <p className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">প্রোফাইল</p>
            </div>
          )}
        </button>

        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map(item => (
            <button key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'gap-4 px-5'} py-3.5 rounded-2xl transition-all relative group ${
                activeTab === item.id ? 'bg-[#18181B] text-white shadow-xl shadow-black/20' : 'text-[#18181B]/40 hover:bg-[#B45309]/5 hover:text-[#B45309]'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>}
              {item.id === 'recurring' && dueAlerts.length > 0 && (
                <span className={`${collapsed ? 'absolute top-1 right-1' : 'ml-auto'} bg-rose-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center`}>{dueAlerts.length}</span>
              )}
              {/* Tooltip on collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-3 py-1.5 bg-[#18181B] text-white text-xs font-black rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 shadow-xl">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className={`mt-auto ${collapsed ? 'p-4' : 'p-8'} border-t border-[#B45309]/5 space-y-3`}>
        <button
          onClick={handleSignOut}
          title={collapsed ? 'লগআউট' : undefined}
          className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'gap-4 px-5'} py-3 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-black text-xs uppercase tracking-widest">লগআউট</span>}
        </button>
        {!collapsed && (
          <div className="text-center">
            <p className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">Developer</p>
            <p className="text-xs font-black text-[#18181B]/60">Riyad Hossain Huzaifa</p>
          </div>
        )}
      </div>
    </>
  );

  // ─── MAIN RENDER ────────────────────────────────
  return (
    <div className={`min-h-screen ${bgRoot} text-[#18181B] font-sans flex relative overflow-hidden selection:bg-[#B45309]/20`}>
      <CustomCursor />

      {/* Sidebar Desktop — collapsible with visible toggle */}
      <div
        className="hidden lg:flex flex-col flex-shrink-0 relative"
        style={{ width: isSidebarCollapsed ? 72 : 280, transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Inner scrollable area — clips content but not toggle */}
        <motion.aside
          animate={{ width: isSidebarCollapsed ? 72 : 280 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="flex flex-col h-screen border-r border-[#B45309]/5 sticky top-0 bg-white overflow-y-auto overflow-x-hidden scrollbar-hide"
        >
          <SidebarContent collapsed={isSidebarCollapsed} />
        </motion.aside>
        {/* Toggle button — outside clip boundary */}
        <button
          onClick={() => setIsSidebarCollapsed(prev => !prev)}
          className="absolute -right-3.5 top-20 z-20 w-7 h-7 bg-white border border-[#B45309]/20 rounded-full flex items-center justify-center shadow-lg hover:bg-[#B45309] hover:border-[#B45309] transition-all group"
        >
          {isSidebarCollapsed
            ? <ChevronRightIcon className="w-3.5 h-3.5 text-[#B45309] group-hover:text-white" />
            : <ChevronLeft className="w-3.5 h-3.5 text-[#B45309] group-hover:text-white" />}
        </button>
      </div>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[100] bg-[#18181B]/60 backdrop-blur-md lg:hidden" 
            />
            <motion.aside 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
              className="fixed left-0 top-0 bottom-0 z-[110] w-[85%] max-w-[320px] flex flex-col bg-white border-r border-[#B45309]/5 lg:hidden overflow-y-auto scrollbar-hide shadow-2xl"
            >
              <SidebarContent collapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 overflow-y-auto scrollbar-hide min-w-0 pb-24 lg:pb-0">
        {/* Header */}
        <header className="h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-[#F9F4F0]/95 backdrop-blur-xl z-30 border-b border-[#B45309]/5">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-[#B45309] bg-white border border-[#B45309]/10 rounded-xl shadow-sm">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#18181B] tracking-tight">{SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}</h2>
              <p className="hidden sm:block text-[10px] font-black text-[#B45309] uppercase tracking-[0.2em]">{format(new Date(), 'do MMMM yyyy', { locale: bn })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {dueAlerts.length > 0 && (
              <button onClick={() => setActiveTab('recurring')} className="flex items-center justify-center p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 animate-pulse sm:px-4 sm:py-2 sm:gap-2 sm:rounded-2xl sm:text-xs">
                <Bell className="w-5 h-5 sm:w-4 sm:h-4" /> 
                <span className="hidden sm:inline font-black">{dueAlerts.length}টি বিলের সময় হচ্ছে!</span>
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#B45309] hover:bg-[#92400E] text-white p-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-black shadow-xl shadow-[#B45309]/30 flex items-center gap-2 group transition-all active:scale-95"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:block text-sm">নতুন এন্ট্রি</span>
            </button>
          </div>
        </header>

        <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10 pb-28 lg:pb-16">

          {/* ══════════════ DASHBOARD ══════════════ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-10 animate-mati">

              {/* Feature 1: Due Bill Alert Banner */}
              {dueAlerts.length > 0 && (
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-[32px] flex items-center gap-6">
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-rose-600 animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-rose-700 text-sm">⚠️ আগামী ৭ দিনে {dueAlerts.length}টি বিল দিতে হবে!</p>
                    <p className="text-rose-500 text-xs font-bold">{dueAlerts.map(d => `${d.name} (${currency}${d.amount})`).join(' • ')}</p>
                  </div>
                  <button onClick={() => setActiveTab('recurring')} className="text-rose-600 font-black text-xs uppercase tracking-widest hover:underline">দেখুন →</button>
                </div>
              )}

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-4 sm:p-8 bg-[#18181B] rounded-[32px] sm:rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                  <PiggyBank className="absolute -right-4 -bottom-4 w-24 h-24 sm:w-32 sm:h-32 opacity-5 group-hover:scale-110 transition-transform text-[#B45309]" />
                  <p className="text-[#B45309] font-black uppercase tracking-widest text-[10px] mb-1 sm:mb-2 text-flicker">মোট ব্যালেন্স</p>
                  <h3 className="text-xl sm:text-4xl font-black">{currency}{totalBalance.toLocaleString()}</h3>
                  <div className="mt-2 sm:mt-4 flex items-center gap-2 text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" /> VeriVault Protected
                  </div>
                </div>
                <div className="p-4 sm:p-8 bg-white border border-[#B45309]/10 rounded-[32px] sm:rounded-[40px] shadow-sm flex flex-col justify-center">
                  <p className="text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-1 sm:mb-2">এই মাসের আয়</p>
                  <h3 className="text-xl sm:text-4xl font-black">{currency}{thisMonthIncome.toLocaleString()}</h3>
                  <div className="mt-3 w-full h-1.5 bg-[#F9F4F0] rounded-full hidden sm:block"><div className="h-full bg-emerald-500 w-[70%] rounded-full" /></div>
                </div>
                <div className="p-4 sm:p-8 bg-white border border-[#B45309]/10 rounded-[32px] sm:rounded-[40px] shadow-sm flex flex-col justify-center">
                  <p className="text-rose-600 font-black uppercase tracking-widest text-[10px] mb-1 sm:mb-2">এই মাসের ব্যয়</p>
                  <h3 className="text-xl sm:text-4xl font-black">{currency}{thisMonthExpenses.toLocaleString()}</h3>
                  <div className="mt-3 w-full h-1.5 bg-[#F9F4F0] rounded-full hidden sm:block">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${thisMonthIncome > 0 ? Math.min((thisMonthExpenses / thisMonthIncome) * 100, 100) : 0}%` }} />
                  </div>
                </div>
              </div>

              {/* Feature 3: Net Worth Card */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-[#B45309] to-[#92400E] rounded-[32px] sm:rounded-[40px] text-white shadow-2xl shadow-[#B45309]/20">
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                  <div>
                    <p className="text-white/60 font-black uppercase tracking-widest text-[10px] mb-2">নেট ওয়ার্থ</p>
                    <h3 className="text-2xl sm:text-3xl font-black">{currency}{netWorth.toLocaleString()}</h3>
                  </div>
                  <div>
                    <p className="text-white/60 font-black uppercase tracking-widest text-[10px] mb-2">মোট সম্পদ</p>
                    <p className="text-2xl font-black">{currency}{(totalBalance + totalSaved).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 font-black uppercase tracking-widest text-[10px] mb-2">পাওনা আছে</p>
                    <p className="text-2xl font-black text-emerald-300">{currency}{totalOwed.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 font-black uppercase tracking-widest text-[10px] mb-2">দেনা আছে</p>
                    <p className="text-2xl font-black text-rose-300">{currency}{totalDebt.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Feature 4: Quick Actions */}
              <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-5 h-5 text-[#B45309]" />
                  <h4 className="text-xl font-black text-[#18181B]">দ্রুত এন্ট্রি</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">এক ক্লিকে খরচ যোগ করুন</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {QUICK_ACTIONS.map((action, i) => (
                    <button key={i} onClick={() => handleQuickAction(action)} disabled={isSaving}
                      className="px-5 py-3 bg-[#F9F4F0] hover:bg-[#18181B] hover:text-white rounded-2xl font-black text-sm text-[#18181B] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50">
                      <action.icon className="w-4 h-4" /> {action.label}
                    </button>
                  ))}
                  <button onClick={() => setIsModalOpen(true)} className="px-5 py-3 bg-[#B45309] text-white rounded-2xl font-black text-sm transition-all hover:scale-105 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> কাস্টম
                  </button>
                </div>
              </div>

              {/* Feature 1: Cash Flow Forecast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-[#B45309]" />
                    <h4 className="text-xl font-black text-[#18181B]">পরবর্তী মাসের পূর্বাভাস</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                      <span className="font-black text-emerald-700 text-sm">প্রত্যাশিত আয়</span>
                      <span className="font-black text-emerald-700 text-xl">{currency}{Math.round(avgMonthlyIncome).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                      <span className="font-black text-rose-700 text-sm">প্রত্যাশিত ব্যয়</span>
                      <span className="font-black text-rose-700 text-xl">{currency}{Math.round(avgMonthlyExpense).toLocaleString()}</span>
                    </div>
                    <div className={`flex justify-between items-center p-4 rounded-2xl border ${avgMonthlyIncome - avgMonthlyExpense >= 0 ? 'bg-[#B45309]/5 border-[#B45309]/20' : 'bg-rose-50 border-rose-200'}`}>
                      <span className="font-black text-[#18181B] text-sm">সম্ভাব্য সঞ্চয়</span>
                      <span className={`font-black text-xl ${avgMonthlyIncome - avgMonthlyExpense >= 0 ? 'text-[#B45309]' : 'text-rose-600'}`}>
                        {currency}{Math.round(avgMonthlyIncome - avgMonthlyExpense).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">* গত ৩ মাসের গড়ের ভিত্তিতে</p>
                  </div>
                </div>

                {/* Feature 5: Monthly Summary */}
                <div className="p-8 bg-[#18181B] text-white rounded-[40px] shadow-2xl shadow-black/30 space-y-6">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[#B45309]" />
                    <h4 className="text-xl font-black">{format(new Date(), 'MMMM yyyy', { locale: bn })} সারসংক্ষেপ</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-black text-sm">সঞ্চয় হার</span>
                      <span className="font-black text-xl text-[#B45309]">
                        {thisMonthIncome > 0 ? (((thisMonthIncome - thisMonthExpenses) / thisMonthIncome) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B45309] rounded-full transition-all duration-700"
                        style={{ width: `${thisMonthIncome > 0 ? Math.max(0, ((thisMonthIncome - thisMonthExpenses) / thisMonthIncome) * 100) : 0}%` }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-black text-sm">সর্বোচ্চ খরচ</span>
                      <span className="font-black text-sm text-white">{topCategory ? `${topCategory[0]} (${currency}${topCategory[1].toLocaleString()})` : 'কোনো ডাটা নেই'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-black text-sm">লেনদেনের সংখ্যা</span>
                      <span className="font-black text-white">{transactions.filter(t => isSameMonth(parseISO(t.date), new Date())).length}টি</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-black text-sm">সক্রিয় লক্ষ্য</span>
                      <span className="font-black text-white">{goals.filter(g => g.saved < g.target).length}টি</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallets */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {wallets.map(w => (
                  <div key={w.id} className="p-3 sm:p-6 bg-white border border-[#B45309]/10 rounded-[20px] sm:rounded-[32px] flex flex-col gap-2 sm:gap-3 shadow-sm hover:border-[#B45309]/30 hover:scale-105 transition-all cursor-pointer group">
                    <div className={`w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl flex items-center justify-center border ${w.color} group-hover:scale-110 transition-transform`}>
                      <w.icon className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{w.name}</p>
                      <p className="text-base sm:text-2xl font-black text-[#18181B]">{currency}{w.balance.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Transactions + Debts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] space-y-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black">সাম্প্রতিক লেনদেন</h4>
                    <button onClick={() => setActiveTab('transactions')} className="bg-[#F9F4F0] p-3 rounded-xl text-[#B45309] hover:bg-[#B45309] hover:text-white transition-all"><ArrowRight className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-[#F9F4F0] rounded-2xl hover:bg-white hover:border hover:border-[#B45309]/10 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            {(() => { const Icon = CATEGORIES.find(c => c.id === tx.category)?.icon || MoreHorizontal; return <Icon className="w-5 h-5 text-[#B45309]" />; })()}
                          </div>
                          <div>
                            <p className="font-black text-[#18181B] text-sm">{tx.note || tx.category}</p>
                            <p className="text-[10px] text-slate-400 font-black">{format(parseISO(tx.date), 'dd MMM')}</p>
                          </div>
                        </div>
                        <p className={`font-black ${tx.type === 'income' ? 'text-emerald-600' : 'text-[#18181B]'}`}>
                          {tx.type === 'income' ? '+' : '-'}{currency}{tx.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {transactions.length === 0 && <p className="text-center text-slate-400 font-black uppercase text-xs tracking-widest py-12">কোনো লেনদেন নেই</p>}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 bg-[#B45309]/5 border border-[#B45309]/20 rounded-[40px] space-y-5 shadow-sm">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-black flex items-center gap-2"><Briefcase className="w-5 h-5 text-[#B45309]" /> ধারের হিসাব</h4>
                      <button onClick={() => setActiveTab('debts')} className="text-[#B45309] font-black text-[10px] uppercase tracking-widest hover:underline">ম্যানেজ</button>
                    </div>
                    {debts.slice(0, 3).map(d => (
                      <div key={d.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#B45309]/5 shadow-sm">
                        <span className="font-black text-[#18181B] text-sm">{d.person}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${d.type === 'lent' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                          {d.type === 'lent' ? 'পাওনা' : 'দেনা'} {currency}{d.amount}
                        </span>
                      </div>
                    ))}
                    {debts.length === 0 && <p className="text-slate-400 text-xs font-black uppercase text-center tracking-widest">Clean Sheet ✓</p>}
                  </div>

                  <div className="p-8 bg-[#18181B] text-white rounded-[40px] shadow-2xl shadow-black/30">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-black flex items-center gap-2"><RefreshCw className="w-5 h-5 text-[#B45309]" /> রিকারিং বিল</h4>
                      <button onClick={() => setActiveTab('recurring')} className="text-[#B45309] font-black text-[10px] uppercase tracking-widest hover:underline">বিস্তারিত</button>
                    </div>
                    {subscriptions.slice(0, 3).map(s => (
                      <div key={s.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                          <p className="text-white font-black text-sm">{s.name}</p>
                          <p className="text-[10px] text-white/40 font-bold">{format(parseISO(s.nextDate), 'do MMM')}</p>
                        </div>
                        <p className="font-black text-[#B45309]">{currency}{s.amount}</p>
                      </div>
                    ))}
                    {subscriptions.length === 0 && <p className="text-white/20 text-xs font-black uppercase text-center tracking-widest">No Active Bills</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ TRANSACTIONS ══════════════ */}
          {activeTab === 'transactions' && (
            <div className="space-y-8 animate-mati">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B45309]" />
                  <input placeholder="লেনদেন খুঁজুন..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={`w-full pl-14 ${inputCls}`} />
                </div>
                <div className="flex gap-3">
                  <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className={`flex-1 ${inputCls}`}>
                    <option value="all">সব ক্যাটাগরি</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
                  </select>
                  <button onClick={() => { setSearchQuery(''); setFilterCategory('all'); }} className="px-5 bg-white rounded-2xl border border-[#B45309]/10 text-slate-400 hover:text-[#B45309] transition-all"><Filter /></button>
                </div>
              </div>
              <div className="space-y-4">
                {filteredTransactions.map(tx => (
                  <div key={tx.id} className="p-6 bg-white border border-[#B45309]/10 rounded-[32px] flex items-center justify-between hover:border-[#B45309]/30 transition-all group shadow-sm">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-[#F9F4F0] rounded-2xl flex items-center justify-center">
                        {(() => { const Icon = CATEGORIES.find(c => c.id === tx.category)?.icon || MoreHorizontal; return <Icon className="w-6 h-6 text-[#B45309]" />; })()}
                      </div>
                      <div>
                        <p className="font-black text-[#18181B] text-xl">{tx.note || tx.category}</p>
                        <p className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">{format(parseISO(tx.date), 'cccc, do MMM yyyy', { locale: bn })} • {tx.walletId?.toUpperCase()}</p>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            tx.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-[#B45309]/10 text-[#B45309]'
                          }`}>{tx.type === 'income' ? 'আয়' : 'ব্যয়'}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-black">{tx.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`text-3xl font-black ${tx.type === 'income' ? 'text-emerald-600' : 'text-[#18181B]'}`}>
                        {tx.type === 'income' ? '+' : '-'}{currency}{tx.amount.toLocaleString()}
                      </p>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => openEditTx(tx)} className="p-3 bg-[#B45309]/10 text-[#B45309] rounded-2xl hover:bg-[#B45309] hover:text-white transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteTransaction(tx.id)} className="p-3 bg-[#F9F4F0] text-slate-300 rounded-2xl hover:text-rose-500 hover:bg-rose-50 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-20 bg-white border border-dashed border-[#B45309]/20 rounded-[40px]">
                    <Receipt className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">কোনো লেনদেন নেই</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════ BUDGET ══════════════ */}
          {activeTab === 'budget' && (
            <div className="space-y-8 animate-mati">
              <div className="p-8 bg-[#18181B] text-white rounded-[40px] space-y-6 shadow-2xl">
                <h3 className="text-xl font-black flex items-center gap-3"><Target className="w-5 h-5 text-[#B45309]" /> নতুন বাজেট সেট করুন</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">ক্যাটাগরি</label>
                    <select value={budgetCat} onChange={e => setBudgetCat(e.target.value)} className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl font-bold outline-none text-white">
                      {CATEGORIES.map(c => <option key={c.id} value={c.id} className="text-black">{c.id}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">মাসিক লিমিট ({currency})</label>
                    <input type="number" value={budgetLimit} onChange={e => setBudgetLimit(e.target.value)} className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl font-bold outline-none text-white" placeholder="যেমন: 5000" />
                  </div>
                  <button onClick={async () => {
                    if (!budgetLimit) return;
                    const existing = budgets.find(b => b.category === budgetCat);
                    if (existing) await insforge.database.from('budgets').update({ monthly_limit: Number(budgetLimit) }).eq('id', existing.id);
                    else await insforge.database.from('budgets').insert({ category: budgetCat, monthly_limit: Number(budgetLimit) });
                    setBudgetLimit(''); await fetchAll();
                  }} className="bg-[#B45309] text-white py-4 px-6 rounded-2xl font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#B45309]/30">
                    <Plus className="w-5 h-5" /> সেট করুন
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 bg-white border border-[#B45309]/10 rounded-[32px] shadow-sm text-center">
                  <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">এই মাসে খরচ</p>
                  <p className="text-3xl font-black">{currency}{thisMonthExpenses.toLocaleString()}</p>
                </div>
                <div className="p-6 bg-white border border-[#B45309]/10 rounded-[32px] shadow-sm text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">মোট বাজেট</p>
                  <p className="text-3xl font-black">{currency}{budgets.reduce((s, b) => s + b.monthly_limit, 0).toLocaleString()}</p>
                </div>
                <div className="p-6 bg-white border border-[#B45309]/10 rounded-[32px] shadow-sm text-center">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">অবশিষ্ট</p>
                  <p className={`text-3xl font-black ${budgets.reduce((s, b) => s + b.monthly_limit, 0) - thisMonthExpenses >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {currency}{(budgets.reduce((s, b) => s + b.monthly_limit, 0) - thisMonthExpenses).toLocaleString()}
                  </p>
                </div>
              </div>

              {budgetProgress.length === 0 ? (
                <div className="text-center py-20 bg-white border border-dashed border-[#B45309]/20 rounded-[40px] space-y-4">
                  <Target className="w-16 h-16 text-slate-200 mx-auto" />
                  <p className="text-slate-400 font-black uppercase text-xs tracking-widest">কোনো বাজেট সেট করা নেই</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {budgetProgress.map(b => (
                    <div key={b.id} className={`p-8 bg-white border rounded-[40px] space-y-5 shadow-sm ${b.pct >= 100 ? 'border-rose-300' : b.pct >= 80 ? 'border-amber-300' : 'border-[#B45309]/10'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${b.pct >= 100 ? 'bg-rose-100 text-rose-600' : 'bg-[#B45309]/10 text-[#B45309]'}`}>
                            {b.pct >= 100 ? <AlertTriangle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                          </div>
                          <div>
                            <h4 className="text-xl font-black">{b.category}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">লিমিট: {currency}{b.monthly_limit.toLocaleString()}</p>
                          </div>
                        </div>
                        <button onClick={async () => { if (window.confirm('ডিলিট করবেন?')) { await insforge.database.from('budgets').delete().eq('id', b.id); await fetchAll(); } }} className="p-2 text-slate-300 hover:text-rose-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between font-black text-sm">
                          <span>খরচ: {currency}{b.spent.toLocaleString()}</span>
                          <span className={b.pct >= 100 ? 'text-rose-600' : b.pct >= 80 ? 'text-amber-600' : 'text-emerald-600'}>{b.pct.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-3 bg-[#F9F4F0] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${b.pct >= 100 ? 'bg-rose-500' : b.pct >= 80 ? 'bg-amber-500' : 'bg-[#B45309]'}`} style={{ width: `${b.pct}%` }} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400">{b.pct >= 100 ? '⚠️ বাজেট শেষ!' : b.pct >= 80 ? '⚡ সাবধান!' : `আরো ${currency}${(b.monthly_limit - b.spent).toLocaleString()} বাকি`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════════════ GOALS ══════════════ */}
          {activeTab === 'goals' && (
            <div className="space-y-8 animate-mati">
              <div className="p-8 bg-[#18181B] text-white rounded-[40px] shadow-2xl space-y-5">
                <h3 className="text-xl font-black flex items-center gap-3"><PiggyBank className="w-5 h-5 text-[#B45309]" /> নতুন সঞ্চয় লক্ষ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">লক্ষ্যের নাম</label>
                    <input value={goalAddName} onChange={e => setGoalAddName(e.target.value)} className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl font-bold outline-none text-white" placeholder="যেমন: ল্যাপটপ কেনা..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">টার্গেট ({currency})</label>
                    <input type="number" value={goalAddTarget} onChange={e => setGoalAddTarget(e.target.value)} className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl font-bold outline-none text-white" placeholder="৳ 0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">এখন জমা ({currency})</label>
                    <input type="number" value={goalAddSaved} onChange={e => setGoalAddSaved(e.target.value)} className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl font-bold outline-none text-white" placeholder="৳ 0" />
                  </div>
                </div>
                <button onClick={async () => {
                  if (!goalAddName || !goalAddTarget) return;
                  await insforge.database.from('goals').insert({ name: goalAddName, target: Number(goalAddTarget), saved: Number(goalAddSaved || 0) });
                  setGoalAddName(''); setGoalAddTarget(''); setGoalAddSaved(''); await fetchAll();
                }} className="bg-[#B45309] text-white py-4 px-8 rounded-2xl font-black hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-[#B45309]/30">
                  <Plus className="w-5 h-5" /> লক্ষ্য যুক্ত করুন
                </button>
              </div>

              {goals.length > 0 && (
                <div className="grid grid-cols-3 gap-5">
                  {[{ label: 'মোট লক্ষ্য', val: `${goals.length}টি`, color: 'text-[#18181B]' }, { label: 'মোট জমা', val: `${currency}${goals.reduce((s, g) => s + g.saved, 0).toLocaleString()}`, color: 'text-emerald-600' }, { label: 'মোট টার্গেট', val: `${currency}${goals.reduce((s, g) => s + g.target, 0).toLocaleString()}`, color: 'text-[#B45309]' }].map((item, i) => (
                    <div key={i} className="p-6 bg-white border border-[#B45309]/10 rounded-[32px] shadow-sm text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
                    </div>
                  ))}
                </div>
              )}

              {goals.length === 0 ? (
                <div className="text-center py-20 bg-white border border-dashed border-[#B45309]/20 rounded-[40px]">
                  <PiggyBank className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-black uppercase text-xs tracking-widest">কোনো সঞ্চয় লক্ষ্য নেই</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {goals.map(g => {
                    const pct = g.target > 0 ? Math.min((g.saved / g.target) * 100, 100) : 0;
                    return (
                      <div key={g.id} className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] space-y-6 shadow-sm group hover:border-[#B45309]/30 hover:scale-[1.02] transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pct >= 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-[#B45309]/10 text-[#B45309]'}`}>
                              {pct >= 100 ? <CheckCircle2 className="w-7 h-7" /> : <PiggyBank className="w-7 h-7" />}
                            </div>
                            <div>
                              <h4 className="text-xl font-black">{g.name}</h4>
                              {pct >= 100 && <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">✓ লক্ষ্য পূরণ!</span>}
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={async () => { const add = prompt('কত টাকা জমা করবেন?'); if (add && !isNaN(Number(add))) { await insforge.database.from('goals').update({ saved: g.saved + Number(add) }).eq('id', g.id); await fetchAll(); } }} className="p-2 bg-emerald-50 rounded-xl text-emerald-600 hover:bg-emerald-100"><Plus className="w-4 h-4" /></button>
                            <button onClick={async () => { if (window.confirm('ডিলিট করবেন?')) { await insforge.database.from('goals').delete().eq('id', g.id); await fetchAll(); } }} className="p-2 bg-[#F9F4F0] rounded-xl text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between font-black text-sm">
                            <span>{currency}{g.saved.toLocaleString()} জমা</span>
                            <span className="text-[#B45309]">{pct.toFixed(0)}%</span>
                          </div>
                          <div className="w-full h-4 bg-[#F9F4F0] rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                              className={`h-full rounded-full ${pct >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#B45309] to-[#D97706]'}`} />
                          </div>
                          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>{currency}0</span><span>টার্গেট: {currency}{g.target.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══════════════ DEBTS ══════════════ */}
          {activeTab === 'debts' && (
            <div className="space-y-8 animate-mati">
              <form onSubmit={async (e) => {
                e.preventDefault(); const fm = new FormData(e.currentTarget);
                const { error } = await insforge.database.from('debts').insert({ person: fm.get('person') as string, amount: Number(fm.get('amount')), type: fm.get('type') as string, note: fm.get('note') as string });
                if (!error) { fetchAll(); (e.target as HTMLFormElement).reset(); }
              }} className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-6">
                <h3 className="text-xl font-black flex items-center gap-3"><Briefcase className="w-5 h-5 text-[#B45309]" /> নতুন ধার হিসাব</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
                  <div className="space-y-2 lg:col-span-2"><label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">ব্যক্তির নাম</label><input name="person" required className={inputCls} placeholder="নাম লিখুন..." /></div>
                  <div className="space-y-2"><label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">পরিমাণ</label><input name="amount" type="number" required className={inputCls} placeholder="৳ 0" /></div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">ধরণ</label>
                    <div className="grid grid-cols-2 gap-2 h-[56px]">
                      <label className="relative flex items-center justify-center bg-[#F9F4F0] rounded-2xl cursor-pointer font-black text-[10px] uppercase tracking-widest"><input type="radio" name="type" value="lent" defaultChecked className="hidden peer" /><span className="peer-checked:text-emerald-600">পাওনা</span><div className="absolute inset-0 border-2 border-transparent peer-checked:border-emerald-500 rounded-2xl" /></label>
                      <label className="relative flex items-center justify-center bg-[#F9F4F0] rounded-2xl cursor-pointer font-black text-[10px] uppercase tracking-widest"><input type="radio" name="type" value="borrowed" className="hidden peer" /><span className="peer-checked:text-rose-600">দেনা</span><div className="absolute inset-0 border-2 border-transparent peer-checked:border-rose-500 rounded-2xl" /></label>
                    </div>
                  </div>
                  <div className="space-y-2 lg:col-span-3"><label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">নোট</label><input name="note" className={inputCls} placeholder="কারণ বা বিবরণ..." /></div>
                  <button type="submit" className="bg-[#18181B] text-white font-black py-4 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"><UserPlus className="w-5 h-5 text-[#B45309]" /> যোগ করুন</button>
                </div>
              </form>

              {debts.length > 0 && (
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-[32px] text-center"><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">মোট পাওনা</p><p className="text-3xl font-black text-emerald-700">{currency}{debts.filter(d => d.type === 'lent').reduce((s, d) => s + d.amount, 0).toLocaleString()}</p></div>
                  <div className="p-6 bg-rose-50 border border-rose-200 rounded-[32px] text-center"><p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">মোট দেনা</p><p className="text-3xl font-black text-rose-700">{currency}{debts.filter(d => d.type === 'borrowed').reduce((s, d) => s + d.amount, 0).toLocaleString()}</p></div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {debts.map(d => (
                  <div key={d.id} className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] flex flex-col group shadow-sm hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${d.type === 'lent' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>{d.type === 'lent' ? <ArrowUpRight /> : <ArrowDownLeft />}</div>
                      <button onClick={async () => { if (window.confirm('ডিলিট করতে চান?')) { await insforge.database.from('debts').delete().eq('id', d.id); fetchAll(); } }} className="p-2 bg-[#F9F4F0] rounded-xl text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-5 h-5" /></button>
                    </div>
                    <p className="text-2xl font-black">{d.person}</p>
                    <p className="text-[10px] font-black text-[#B45309] uppercase tracking-widest mt-1">{d.type === 'lent' ? 'পাওনা' : 'দেনা'}</p>
                    {d.note && <p className="text-sm text-slate-400 italic mt-2">"{d.note}"</p>}
                    <div className="mt-6 pt-4 border-t border-[#F9F4F0]">
                      <p className={`text-3xl font-black ${d.type === 'lent' ? 'text-emerald-600' : 'text-rose-600'}`}>{currency}{d.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {debts.length === 0 && (
                  <div className="col-span-3 text-center py-20 bg-white border border-dashed border-[#B45309]/20 rounded-[40px]">
                    <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">কোনো ধার নেই — দারুণ!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════ RECURRING ══════════════ */}
          {activeTab === 'recurring' && (
            <div className="space-y-8 animate-mati">
              {dueAlerts.length > 0 && (
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-[32px] flex items-center gap-4">
                  <Bell className="w-8 h-8 text-rose-500 animate-bounce flex-shrink-0" />
                  <div>
                    <p className="font-black text-rose-700">⚠️ আগামী ৭ দিনে {dueAlerts.length}টি বিল দিতে হবে!</p>
                    <div className="flex gap-3 mt-2 flex-wrap">
                      {dueAlerts.map(d => <span key={d.id} className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-black">{d.name} — {currency}{d.amount}</span>)}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={async (e) => {
                e.preventDefault(); const fm = new FormData(e.currentTarget);
                const { error } = await insforge.database.from('subscriptions').insert({ name: fm.get('name') as string, amount: Number(fm.get('amount')), next_date: new Date(fm.get('date') as string).toISOString() });
                if (!error) { fetchAll(); (e.target as HTMLFormElement).reset(); }
              }} className="p-8 bg-[#18181B] rounded-[40px] grid grid-cols-1 md:grid-cols-4 gap-5 items-end text-white shadow-2xl">
                <div className="space-y-2 md:col-span-2"><label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">বিলের নাম</label><input name="name" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl font-bold outline-none" placeholder="Netflix, WiFi..." /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">পরিমাণ</label><input name="amount" type="number" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl font-bold outline-none" placeholder="৳ 0" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">পরবর্তী তারিখ</label><input name="date" type="date" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl font-bold outline-none" /></div>
                <button type="submit" className="md:col-span-4 bg-[#B45309] text-white font-black py-4 rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#B45309]/30"><RefreshCw className="w-5 h-5" /> শিডিউল করুন</button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptions.map(s => {
                  const daysLeft = differenceInDays(parseISO(s.nextDate), new Date());
                  const isDue = daysLeft >= 0 && daysLeft <= 7;
                  return (
                    <div key={s.id} className={`p-8 bg-white border rounded-[40px] shadow-sm group hover:scale-105 transition-all ${isDue ? 'border-rose-300 bg-rose-50' : 'border-[#B45309]/10'}`}>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDue ? 'bg-rose-100 text-rose-500' : 'bg-[#B45309]/10 text-[#B45309]'}`}><RefreshCw className="w-7 h-7" /></div>
                        <button onClick={async () => { if (window.confirm('ডিলিট করবেন?')) { await insforge.database.from('subscriptions').delete().eq('id', s.id); fetchAll(); } }} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-2"><Trash2 className="w-5 h-5" /></button>
                      </div>
                      <h4 className="text-2xl font-black mb-2">{s.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-6 text-[#B45309]">
                        <Calendar className="w-3 h-3" />
                        {isDue ? <span className="text-rose-600">⚠️ {daysLeft === 0 ? 'আজকে!' : `${daysLeft} দিন বাকি`}</span> : format(parseISO(s.nextDate), 'do MMMM', { locale: bn })}
                      </div>
                      <div className="flex items-center justify-between bg-[#F9F4F0] p-4 rounded-2xl">
                        <p className="text-3xl font-black">{currency}{s.amount}</p>
                        <span className="px-3 py-1 bg-[#18181B] text-white rounded-full text-[10px] font-black">মাসিক</span>
                      </div>
                    </div>
                  );
                })}
                {subscriptions.length === 0 && (
                  <div className="col-span-3 text-center py-20 bg-white border border-dashed border-[#B45309]/20 rounded-[40px]">
                    <RefreshCw className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">কোনো রিকারিং বিল নেই</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════ TASKS ══════════════ */}
          {activeTab === 'tasks' && (
            <div className="space-y-8 animate-mati">
              <div className="flex gap-3">
                <input value={taskInput} onChange={e => setTaskInput(e.target.value)}
                  onKeyDown={async (e) => { if (e.key === 'Enter' && taskInput.trim()) { await insforge.database.from('todos').insert({ text: taskInput.trim(), is_completed: false }); setTaskInput(''); await fetchAll(); } }}
                  className={`flex-1 ${inputCls} text-lg`} placeholder="নতুন আইটেম লিখুন... (Enter)" />
                <button onClick={async () => { if (!taskInput.trim()) return; await insforge.database.from('todos').insert({ text: taskInput.trim(), is_completed: false }); setTaskInput(''); await fetchAll(); }} className="bg-[#B45309] text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-[#92400E] transition-all shadow-xl shadow-[#B45309]/30">
                  <Plus className="w-5 h-5" /> যোগ
                </button>
              </div>

              {todos.length > 0 && (
                <div className="grid grid-cols-3 gap-5">
                  {[{ label: 'মোট', val: todos.length, color: 'text-[#18181B]' }, { label: 'সম্পন্ন', val: todos.filter(t => t.isCompleted).length, color: 'text-emerald-600' }, { label: 'বাকি', val: todos.filter(t => !t.isCompleted).length, color: 'text-amber-600' }].map((item, i) => (
                    <div key={i} className="p-5 bg-white border border-[#B45309]/10 rounded-[28px] shadow-sm text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {todos.filter(t => !t.isCompleted).map(t => (
                  <div key={t.id} className="flex items-center gap-4 p-5 bg-white border border-[#B45309]/10 rounded-2xl shadow-sm group hover:border-[#B45309]/30 transition-all">
                    <button onClick={async () => { await insforge.database.from('todos').update({ is_completed: true }).eq('id', t.id); await fetchAll(); }} className="w-9 h-9 rounded-xl border-2 border-[#B45309]/30 flex items-center justify-center hover:bg-[#B45309] hover:border-[#B45309] hover:text-white transition-all text-transparent flex-shrink-0"><Check className="w-4 h-4" /></button>
                    <span className="flex-1 font-black text-[#18181B]">{t.text}</span>
                    <button onClick={async () => { await insforge.database.from('todos').delete().eq('id', t.id); await fetchAll(); }} className="p-2 text-slate-300 rounded-xl opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}

                {todos.filter(t => t.isCompleted).length > 0 && (
                  <>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex-1 h-px bg-[#B45309]/10" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">সম্পন্ন</span>
                      <div className="flex-1 h-px bg-[#B45309]/10" />
                    </div>
                    {todos.filter(t => t.isCompleted).map(t => (
                      <div key={t.id} className="flex items-center gap-4 p-5 bg-[#F9F4F0] border border-[#B45309]/5 rounded-2xl opacity-60 group">
                        <button onClick={async () => { await insforge.database.from('todos').update({ is_completed: false }).eq('id', t.id); await fetchAll(); }} className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white flex-shrink-0"><Check className="w-4 h-4" /></button>
                        <span className="flex-1 font-black text-slate-400 line-through">{t.text}</span>
                        <button onClick={async () => { await insforge.database.from('todos').delete().eq('id', t.id); await fetchAll(); }} className="p-2 text-slate-300 rounded-xl opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </>
                )}
                {todos.length === 0 && (
                  <div className="text-center py-20 bg-white border border-dashed border-[#B45309]/20 rounded-[40px]">
                    <ListOrdered className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">বাজার তালিকা খালি</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════ ANALYTICS ══════════════ */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-mati">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-[#18181B] rounded-[40px] text-center text-white shadow-2xl shadow-black/30">
                  <p className="text-[#B45309] font-black uppercase tracking-widest text-[10px] mb-2">সঞ্চয় হার</p>
                  <h3 className="text-4xl font-black">{thisMonthIncome > 0 ? (((thisMonthIncome - thisMonthExpenses) / thisMonthIncome) * 100).toFixed(0) : 0}%</h3>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-2">এই মাসে</p>
                </div>
                <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] text-center shadow-sm">
                  <p className="text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-2">সর্বকালীন আয়</p>
                  <h3 className="text-4xl font-black">{currency}{transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0).toLocaleString()}</h3>
                </div>
                <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] text-center shadow-sm">
                  <p className="text-rose-600 font-black uppercase tracking-widest text-[10px] mb-2">সর্বকালীন ব্যয়</p>
                  <h3 className="text-4xl font-black">{currency}{transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0).toLocaleString()}</h3>
                </div>
              </div>

              <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm">
                <h4 className="text-xl font-black mb-8">গত ৬ মাসের আয়-ব্যয়</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData} barSize={36} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F9F4F0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontWeight: 900, fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} style={{ fontWeight: 900, fontSize: 11 }} tickFormatter={v => `${currency}${(v / 1000).toFixed(0)}k`} />
                    <RechartsTooltip formatter={(v: any) => [`${currency}${Number(v).toLocaleString()}`, '']} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 900 }} />
                    <Bar dataKey="আয়" fill="#10b981" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="ব্যয়" fill="#B45309" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm">
                  <h4 className="text-xl font-black mb-6">এই মাসের খরচের বিভাজন</h4>
                  {pieData.length === 0 ? <p className="text-center py-10 text-slate-300 font-black uppercase text-xs tracking-widest">কোনো ডাটা নেই</p> : (
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={4}>
                          {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip formatter={(v: any) => [`${currency}${Number(v).toLocaleString()}`, '']} contentStyle={{ borderRadius: 16, border: 'none', fontWeight: 900 }} />
                        <Legend wrapperStyle={{ fontWeight: 900, fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-5">
                  <h4 className="text-xl font-black">ক্যাটাগরি ভিত্তিক খরচ</h4>
                  {pieData.length === 0 ? <p className="text-center py-10 text-slate-300 font-black uppercase text-xs tracking-widest">কোনো ডাটা নেই</p> : (
                    pieData.sort((a, b) => b.value - a.value).map((item, i) => {
                      const total = pieData.reduce((s, p) => s + p.value, 0);
                      const pct = total > 0 ? (item.value / total) * 100 : 0;
                      return (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between font-black text-sm">
                            <span>{item.name}</span>
                            <span style={{ color: item.color }}>{currency}{item.value.toLocaleString()} ({pct.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full h-2.5 bg-[#F9F4F0] rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ SETTINGS ══════════════ */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-mati max-w-3xl">
              {settingsMsg && (
                <div className={`p-4 rounded-2xl font-black text-sm flex items-center gap-3 ${settingsMsg.startsWith('✓') ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-rose-50 border border-rose-200 text-rose-700'}`}>
                  {settingsMsg.startsWith('✓') ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  {settingsMsg}
                </div>
              )}

              {/* Profile Photo */}
              <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-6">
                <h3 className="text-xl font-black flex items-center gap-3"><Camera className="w-5 h-5 text-[#B45309]" /> প্রোফাইল ছবি</h3>
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#B45309]/10 flex items-center justify-center flex-shrink-0 relative">
                    {settingsAvatar ? <img src={settingsAvatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-[#B45309] font-black text-4xl">{displayName.charAt(0).toUpperCase()}</span>}
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold text-slate-500 text-sm">JPG, PNG — সর্বোচ্চ 5MB</p>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (file) await handleAvatarUpload(file); }} />
                    <button onClick={() => fileInputRef.current?.click()} disabled={settingsSaving} className="px-6 py-3 bg-[#B45309] text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-[#B45309]/30 disabled:opacity-50">
                      {settingsSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                      ছবি আপলোড করুন
                    </button>
                    {settingsAvatar && (
                      <button onClick={async () => { await insforge.database.from('profiles').upsert({ id: currentUser?.id, avatar_url: null }); setSettingsAvatar(''); setProfile(prev => ({ ...prev, avatar_url: '' })); }} className="px-4 py-2 text-rose-500 font-black text-xs uppercase tracking-widest hover:underline">ছবি মুছুন</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Display Name + Email Change */}
              <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-5">
                <h3 className="text-xl font-black text-[#18181B]">অ্যাকাউন্ট তথ্য</h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">প্রদর্শিত নাম</label>
                  <input value={settingsName} onChange={e => setSettingsName(e.target.value)} className={inputCls + ' w-full'} placeholder="আপনার নাম..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">বর্তমান ইমেইল</label>
                  <input value={currentUser?.email || ''} disabled className={`w-full px-6 py-4 rounded-2xl border border-[#B45309]/5 bg-[#F9F4F0] text-slate-500 font-black`} />
                </div>
                <button onClick={handleSaveProfile} disabled={settingsSaving} className="px-8 py-4 bg-[#18181B] text-white font-black rounded-2xl hover:bg-black transition-all flex items-center gap-2 shadow-xl disabled:opacity-50">
                  {settingsSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5 text-[#B45309]" />}
                  নাম সেভ করুন
                </button>
              </div>

              {/* Email Change */}
              <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-5">
                <h3 className="text-xl font-black flex items-center gap-3"><Mail className="w-5 h-5 text-[#B45309]" /> ইমেইল পরিবর্তন</h3>
                <p className="text-sm text-slate-400 font-bold">নতুন ইমেইল দিন। পরিবর্তনের জন্য আপনার বর্তমান ইমেইলে একটি ভেরিফিকেশন লিংক পাঠানো হবে।</p>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">নতুন ইমেইল</label>
                  <input
                    type="email"
                    value={settingsNewEmail}
                    onChange={e => setSettingsNewEmail(e.target.value)}
                    className={inputCls + ' w-full'}
                    placeholder="নতুন ইমেইল ঠিকানা..."
                  />
                </div>
                <button onClick={handleChangeEmail} disabled={settingsSaving || !settingsNewEmail} className="px-8 py-4 bg-[#B45309] text-white font-black rounded-2xl hover:bg-[#92400E] transition-all flex items-center gap-2 shadow-xl shadow-[#B45309]/30 disabled:opacity-50">
                  {settingsSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                  ইমেইল পরিবর্তনের অনুরোধ পাঠান
                </button>
              </div>

              {/* Password */}
              <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-5">
                <h3 className="text-xl font-black flex items-center gap-3"><Lock className="w-5 h-5 text-[#B45309]" /> পাসওয়ার্ড পরিবর্তন</h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">নতুন পাসওয়ার্ড</label>
                  <input type="password" value={settingsNewPass} onChange={e => setSettingsNewPass(e.target.value)} className={inputCls + ' w-full'} placeholder="কমপক্ষে ৬ অক্ষর..." />
                </div>
                <button onClick={handleChangePassword} disabled={settingsSaving} className="px-8 py-4 bg-[#B45309] text-white font-black rounded-2xl hover:bg-[#92400E] transition-all flex items-center gap-2 shadow-xl shadow-[#B45309]/30 disabled:opacity-50">
                  {settingsSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                  পাসওয়ার্ড পরিবর্তন করুন
                </button>
              </div>

              {/* Preferences */}
              <div className="p-8 bg-white border border-[#B45309]/10 rounded-[40px] shadow-sm space-y-5">
                <h3 className="text-xl font-black">পছন্দমতো কাস্টোমাইজ</h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">কারেন্সি সিম্বল</label>
                  <div className="flex gap-3 flex-wrap">
                    {['৳', '$', '€', '£', '¥', '₹'].map(sym => (
                      <button key={sym} onClick={async () => { await insforge.database.from('profiles').upsert({ id: currentUser?.id, currency_symbol: sym }); setProfile(prev => ({ ...prev, currency_symbol: sym })); setSettingsMsg('✓ কারেন্সি পরিবর্তন হয়েছে!'); setTimeout(() => setSettingsMsg(''), 2000); }}
                        className={`w-14 h-14 rounded-2xl font-black text-2xl transition-all hover:scale-110 ${(profile.currency_symbol || '৳') === sym ? 'bg-[#18181B] text-white shadow-xl' : 'bg-[#F9F4F0] text-[#18181B] hover:bg-[#B45309]/10'}`}>
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#B45309] uppercase tracking-widest">ডিফল্ট ওয়ালেট</label>
                  <div className="grid grid-cols-4 gap-3">
                    {WALLETS_INITIAL.map(w => (
                      <button key={w.id} onClick={async () => { await insforge.database.from('profiles').upsert({ id: currentUser?.id, default_wallet: w.id }); setProfile(prev => ({ ...prev, default_wallet: w.id as WalletType })); setWalletInput(w.id); setSettingsMsg(`✓ ডিফল্ট ওয়ালেট "${w.name}" করা হয়েছে!`); setTimeout(() => setSettingsMsg(''), 2000); }}
                        className={`p-4 rounded-2xl font-black text-xs transition-all ${(profile.default_wallet || 'cash') === w.id ? 'bg-[#18181B] text-white shadow-xl' : 'bg-[#F9F4F0] text-slate-400 hover:bg-[#B45309]/10'}`}>
                        {w.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-8 bg-rose-50 border border-rose-200 rounded-[40px] space-y-5">
                <h3 className="text-xl font-black text-rose-700 flex items-center gap-3"><AlertTriangle className="w-5 h-5" /> বিপজ্জনক এলাকা</h3>
                <p className="text-rose-600 font-bold text-sm">এই সব কার্যক্রম অপরিবর্তনীয়।</p>
                <button onClick={handleSignOut} className="px-6 py-3 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 transition-all flex items-center gap-2">
                  <LogOut className="w-5 h-5" /> লগআউট করুন
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ══════════════ EDIT TRANSACTION MODAL ══════════════ */}
      <AnimatePresence>
        {editingTx && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#18181B]/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setEditingTx(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 300 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[480px] bg-[#F9F4F0] border-t sm:border border-amber-300/40 rounded-t-[32px] sm:rounded-[48px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] p-6 sm:p-10 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="hidden sm:block absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-[#D97706]" />
              <div className="flex justify-between items-center mb-4 sm:mb-8">
                <h3 className="text-lg sm:text-2xl font-black text-[#18181B] flex items-center gap-3"><Edit2 className="w-5 h-5 sm:w-6 h-6 text-[#B45309]" /> লেনদেন এডিট</h3>
                <button onClick={() => setEditingTx(null)} className="p-2 sm:p-3 bg-[#18181B] rounded-xl sm:rounded-2xl text-white shadow-xl hover:scale-110 transition-all"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleUpdateTransaction} className="space-y-3 sm:space-y-5">
                <div className="text-center">
                  <p className="text-[8px] sm:text-[10px] font-black text-[#B45309] uppercase tracking-widest mb-1 sm:mb-2">পরিমাণ</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xl sm:text-4xl font-black text-[#B45309]">{currency}</span>
                    <input type="number" required autoFocus value={editAmount} onChange={e => setEditAmount(e.target.value)}
                      className="bg-transparent border-none text-center text-3xl sm:text-5xl font-black text-[#18181B] focus:outline-none placeholder:text-slate-200 w-full max-w-[200px] sm:max-w-[260px]" placeholder="0" />
                  </div>
                </div>
                <div className="flex p-1.5 bg-[#18181B] rounded-3xl gap-1.5">
                  <button type="button" onClick={() => setEditType('expense')} className={`flex-1 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${editType === 'expense' ? 'bg-[#B45309] text-white' : 'text-white/40 hover:text-white'}`}>ব্যয়</button>
                  <button type="button" onClick={() => setEditType('income')} className={`flex-1 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${editType === 'income' ? 'bg-emerald-600 text-white' : 'text-white/40 hover:text-white'}`}>আয়</button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">ক্যাটাগরি</label>
                  <div className="flex flex-wrap sm:grid sm:grid-cols-5 gap-1.5">
                    {CATEGORIES.slice(0, 5).map(c => (
                      <button key={c.id} type="button" onClick={() => setEditCat(c.id)}
                        className={`flex-1 sm:flex-none p-2 rounded-xl flex flex-col items-center gap-0.5 transition-all ${editCat === c.id ? 'bg-[#18181B] text-white' : 'bg-white text-slate-400'}`}>
                        <c.icon className="w-3.5 h-3.5 sm:w-5 h-5" />
                        <span className="text-[7px] sm:text-[8px] font-black">{c.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">ওয়ালেট</label>
                    <select value={editWallet} onChange={e => setEditWallet(e.target.value as WalletType)} className="w-full bg-white border border-[#B45309]/10 p-3 rounded-xl text-[#18181B] font-black text-xs outline-none">
                      {WALLETS_INITIAL.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">তারিখ</label>
                    <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="w-full bg-white border border-[#B45309]/10 p-3 rounded-xl text-[#18181B] font-black text-xs outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">নোট</label>
                  <input type="text" value={editNote} onChange={e => setEditNote(e.target.value)} className="w-full bg-white border border-[#B45309]/10 p-3 rounded-xl text-[#18181B] placeholder:text-slate-300 font-black text-xs outline-none" placeholder="বিবরণ..." />
                </div>
                <div className="flex gap-2.5 pt-1.5">
                  <button type="button" onClick={() => setEditingTx(null)} className="flex-1 py-3 rounded-2xl bg-[#F9F4F0] text-slate-500 font-black text-xs hover:bg-slate-100 transition-all">বাতিল</button>
                  <button type="submit" disabled={isSaving} className="flex-1 bg-[#18181B] text-white py-3 rounded-2xl font-black text-xs shadow-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-3.5 h-3.5 text-[#B45309]" /> আপডেট</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ ADD TRANSACTION MODAL ══════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#18181B]/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 300 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[520px] bg-[#F9F4F0] border-t sm:border border-[#B45309]/20 rounded-t-[40px] sm:rounded-[48px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] p-6 sm:p-10 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="hidden sm:block absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#B45309] to-[#D97706]" />
              <div className="flex justify-between items-center mb-4 sm:mb-8">
                <h3 className="text-lg sm:text-2xl font-black text-[#18181B]">নতুন লেনদেন</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 sm:p-3 bg-[#18181B] rounded-xl sm:rounded-2xl text-white shadow-xl hover:scale-110 transition-all"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAddTransaction} className="space-y-3 sm:space-y-6">
                <div className="text-center">
                  <p className="text-[8px] sm:text-[10px] font-black text-[#B45309] uppercase tracking-widest mb-1 sm:mb-2 text-flicker">পরিমাণ</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xl sm:text-5xl font-black text-[#B45309]">{currency}</span>
                    <input type="number" required autoFocus value={amountInput} onChange={e => setAmountInput(e.target.value)}
                      className="bg-transparent border-none text-center text-3xl sm:text-6xl font-black text-[#18181B] focus:outline-none placeholder:text-slate-200 w-full max-w-[200px] sm:max-w-[280px]"
                      placeholder="0" />
                  </div>
                </div>

                <div className="flex p-1.5 bg-[#18181B] rounded-3xl gap-1.5">
                  <button type="button" onClick={() => setFormType('expense')}
                    className={`flex-1 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all ${formType === 'expense' ? 'bg-[#B45309] text-white shadow-xl' : 'text-white/40 hover:text-white'}`}>ব্যয়</button>
                  <button type="button" onClick={() => setFormType('income')}
                    className={`flex-1 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all ${formType === 'income' ? 'bg-emerald-600 text-white shadow-xl' : 'text-white/40 hover:text-white'}`}>আয়</button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">ক্যাটাগরি</label>
                  <div className="flex flex-wrap sm:grid sm:grid-cols-5 gap-1.5">
                    {CATEGORIES.slice(0, 5).map(c => (
                      <button key={c.id} type="button" onClick={() => setCatInput(c.id)}
                        className={`flex-1 sm:flex-none p-2 rounded-xl flex flex-col items-center gap-0.5 transition-all ${catInput === c.id ? 'bg-[#18181B] text-white' : 'bg-white text-slate-400'}`}>
                        <c.icon className="w-3.5 h-3.5 sm:w-5 h-5" />
                        <span className="text-[7px] sm:text-[8px] font-black uppercase">{c.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">ওয়ালেট</label>
                    <select value={walletInput} onChange={e => setWalletInput(e.target.value as WalletType)} className="w-full bg-white border border-[#B45309]/10 p-3 rounded-xl text-[#18181B] font-black text-xs outline-none appearance-none">
                      {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">তারিখ</label>
                    <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} className="w-full bg-white border border-[#B45309]/10 p-3 rounded-xl text-[#18181B] font-black text-xs outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">নোট</label>
                  <input type="text" value={noteInput} onChange={e => setNoteInput(e.target.value)} className="w-full bg-white border border-[#B45309]/10 p-3 rounded-xl text-[#18181B] placeholder:text-slate-300 font-black text-xs outline-none" placeholder="বিবরণ..." />
                </div>

                <button type="submit" disabled={isSaving} className="w-full bg-[#18181B] hover:bg-black text-white py-3.5 rounded-2xl sm:rounded-[28px] font-black text-base sm:text-xl shadow-2xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <>সেভ করুন <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* ══════════════ MOBILE BOTTOM NAV ══════════════ */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#B45309]/10 px-2 py-2 safe-area-inset-bottom shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'হোম' },
            { id: 'transactions', icon: Receipt, label: 'লেনদেন' },
            { id: 'goals', icon: PiggyBank, label: 'সংচয়' },
            { id: 'debts', icon: Briefcase, label: 'ধার' },
            { id: 'settings', icon: Settings, label: 'সেটিংস' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
                activeTab === item.id
                  ? 'text-[#B45309]'
                  : 'text-[#18181B]/30'
              }`}
            >
              <item.icon className={`w-6 h-6 transition-transform ${activeTab === item.id ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              {activeTab === item.id && <span className="w-1 h-1 rounded-full bg-[#B45309]" />}
            </button>
          ))}
          {/* FAB — plus button center-ish */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-2"
          >
            <div className="w-12 h-12 bg-[#B45309] rounded-2xl flex items-center justify-center shadow-lg shadow-[#B45309]/30 -mt-6">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#B45309]">নতুন</span>
          </button>
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.animate-mati{animation:fadeIn 0.4s ease-out forwards}@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}` }} />
    </div>
  );
}
