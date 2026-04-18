import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    original = f.read()

# First replace initial states for goals, debts, subscriptions to be empty arrays
content = re.sub(
    r'const \[goals, setGoals\] = useState.*?\]\);\s*',
    r'const [goals, setGoals] = useState<Goal[]>([]);\n  ',
    original, flags=re.DOTALL
)
content = re.sub(
    r'const \[debts, setDebts\] = useState.*?\]\);\s*',
    r'const [debts, setDebts] = useState<Debt[]>([]);\n  ',
    content, flags=re.DOTALL
)
content = re.sub(
    r'const \[subscriptions, setSubscriptions\] = useState.*?\]\);\s*',
    r'const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);\n  ',
    content, flags=re.DOTALL
)

# Replace the fetchData inside useEffect with comprehensive real-time fetch + realtime sync
fetch_effect_new = """
  // Global Fetch & Sync
  const fetchData = async () => {
    insforge.database.from('transactions').select('*').order('date', { ascending: false }).then(({data}) => {
      if(data) setTransactions(data.map((d: any) => ({
        id: d.id, type: d.type, amount: Number(d.amount), category: d.category, note: d.note, date: d.date, walletId: d.wallet_id
      })));
    });
    insforge.database.from('todos').select('*').order('created_at', { ascending: false }).then(({data}) => {
      if(data) setTodos(data.map((d: any) => ({
        id: d.id, text: d.text, isCompleted: d.is_completed
      })));
    });
    insforge.database.from('goals').select('*').order('created_at', { ascending: false }).then(({data}) => {
      if(data) setGoals(data.map((d: any) => ({
        id: d.id, name: d.name, target: Number(d.target), saved: Number(d.saved)
      })));
    });
    insforge.database.from('debts').select('*').order('created_at', { ascending: false }).then(({data}) => {
      if(data) setDebts(data.map((d: any) => ({
        id: d.id, person: d.person, amount: Number(d.amount), type: d.type
      })));
    });
    insforge.database.from('subscriptions').select('*').order('created_at', { ascending: false }).then(({data}) => {
      if(data) setSubscriptions(data.map((d: any) => ({
        id: d.id, name: d.name, amount: Number(d.amount), nextDate: d.next_date
      })));
    });
  };

  useEffect(() => {
    fetchData();

    // Setup Realtime Sync
    insforge.realtime.connect().then(() => {
      insforge.realtime.subscribe('global_sync').then(({ok}) => {
        if(ok) {
           insforge.realtime.on('DB_SYNC', () => {
              fetchData();
           });
        }
      });
    });

    return () => {
      insforge.realtime.unsubscribe('global_sync');
      insforge.realtime.disconnect();
    };
  }, []);
  
  // Helper to publish sync
  const publishSync = () => {
     if(insforge.realtime.isConnected) {
        insforge.realtime.publish('global_sync', 'DB_SYNC', { timestamp: Date.now() });
     }
  };
"""

content = re.sub(
    r'\/\/\s*Fetch initial data[\s\S]*?fetchData\(\);\s*\}, \[\]\);',
    fetch_effect_new,
    content
)

# Inject publishSync into all data modding points:
content = content.replace('setTransactions([newTx, ...transactions]);', 'setTransactions([newTx, ...transactions]); setTimeout(publishSync, 300);')
content = content.replace('.update({is_completed: newStatus}).eq(\'id\', todo.id); }}', '.update({is_completed: newStatus}).eq(\'id\', todo.id).then(()=>publishSync()); }}')
content = content.replace('.delete().eq(\'id\', todo.id); }}', '.delete().eq(\'id\', todo.id).then(()=>publishSync()); }}')
content = content.replace('setTodos([{id: data.id, text: data.text, isCompleted: data.is_completed}, ...todos]);});', 'setTodos([{id: data.id, text: data.text, isCompleted: data.is_completed}, ...todos]); publishSync();});')
content = content.replace('.delete().eq(\'id\', tx.id); }}', '.delete().eq(\'id\', tx.id).then(()=>publishSync()); }}')


# Update the Fallback layout logic to include the new UIs instead of placeholders.
fallback_rx = r'\{\/\*\s*Fallback layout for pages we haven\'t fully designed specifically yet\s*\*\/\}[\s\S]*?\{\/\*\s*Transactions Specific\s*\*\/\}'

new_uis = """{/* Goals */}
              {activeTab === 'goals' && (
                 <div className="space-y-6">
                   <form onSubmit={(e)=>{
                      e.preventDefault();
                      const fm = new FormData(e.currentTarget);
                      insforge.database.from('goals').insert({
                         name: fm.get('name') as string,
                         target: Number(fm.get('target')),
                         saved: Number(fm.get('saved') || '0')
                      }).then(()=>{publishSync(); (e.target as HTMLFormElement).reset()});
                   }} className={`p-6 rounded-2xl border ${theme==='dark'?'bg-[#0f172a] border-white/5':'bg-slate-50 border-slate-200'} grid grid-cols-1 sm:grid-cols-4 gap-4`}>
                      <input name="name" required placeholder="লক্ষ্যের নাম (যেমন: নতুন ল্যাপটপ)" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <input name="target" type="number" required placeholder="টার্গেট এমাউন্ট" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <input name="saved" type="number" placeholder="ইতোমধ্যে জমানো" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <button type="submit" className="bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">যোগ করুন</button>
                   </form>
                   <div className="space-y-4">
                     {goals.map(g => (
                       <div key={g.id} className={`p-5 rounded-2xl border ${theme==='dark'?'bg-[#0f172a] border-white/5':'bg-white border-slate-200'}`}>
                          <div className="flex justify-between items-center mb-3">
                             <h4 className="font-bold text-lg">{g.name}</h4>
                             <button onClick={()=>insforge.database.from('goals').delete().eq('id', g.id).then(()=>publishSync())} className="text-rose-500/50 hover:text-rose-500"><Trash2 className="w-4 h-4"/></button>
                          </div>
                          <div className="flex justify-between text-sm mb-2 font-medium">
                             <span className="text-emerald-500">জমানো: ৳{g.saved.toLocaleString('en-IN')}</span>
                             <span className={`${textSub}`}>বাকি: ৳{(g.target - g.saved).toLocaleString('en-IN')}</span>
                          </div>
                          <div className={`h-2 rounded-full w-full overflow-hidden ${theme==='dark'?'bg-slate-800':'bg-slate-100'}`}>
                             <div className="h-full bg-blue-500 rounded-full" style={{width: `${Math.min(100, (g.saved/g.target)*100)}%`}}></div>
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>
              )}

              {/* Debts */}
              {activeTab === 'debts' && (
                 <div className="space-y-6">
                   <form onSubmit={(e)=>{
                      e.preventDefault();
                      const fm = new FormData(e.currentTarget);
                      insforge.database.from('debts').insert({
                         person: fm.get('person') as string,
                         amount: Number(fm.get('amount')),
                         type: fm.get('type') as string
                      }).then(()=>{publishSync(); (e.target as HTMLFormElement).reset()});
                   }} className={`p-6 rounded-2xl border ${theme==='dark'?'bg-[#0f172a] border-white/5':'bg-slate-50 border-slate-200'} grid grid-cols-1 sm:grid-cols-4 gap-4`}>
                      <input name="person" required placeholder="ব্যক্তির নাম" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <input name="amount" type="number" required placeholder="পরিমাণ" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <select name="type" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`}>
                         <option value="lent">আমি পাই (Lent)</option>
                         <option value="borrowed">আমি ধার নিয়েছি (Borrowed)</option>
                      </select>
                      <button type="submit" className="bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">যোগ করুন</button>
                   </form>
                   <div className="space-y-3">
                     {debts.map(d => (
                       <div key={d.id} className={`flex items-center justify-between p-5 rounded-2xl border ${theme==='dark'?'bg-[#0f172a] border-white/5':'bg-white border-slate-200'}`}>
                          <div className="flex gap-4 items-center">
                             <div className={`p-3 rounded-2xl ${d.type === 'lent' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                <Briefcase className="w-5 h-5"/>
                             </div>
                             <div>
                               <h4 className="font-bold text-lg">{d.person}</h4>
                               <p className={`text-sm ${textSub}`}>{d.type === 'lent' ? 'আমি পাবো' : 'আমি দেবো'}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <p className={`text-xl font-mono font-bold ${d.type === 'lent' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {d.type === 'lent' ? '+' : '-'}৳{d.amount.toLocaleString('en-IN')}
                             </p>
                             <button onClick={()=>insforge.database.from('debts').delete().eq('id', d.id).then(()=>publishSync())} className="text-rose-500/50 hover:text-rose-500"><Trash2 className="w-4 h-4"/></button>
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>
              )}

              {/* Subscriptions */}
              {activeTab === 'recurring' && (
                 <div className="space-y-6">
                   <form onSubmit={(e)=>{
                      e.preventDefault();
                      const fm = new FormData(e.currentTarget);
                      insforge.database.from('subscriptions').insert({
                         name: fm.get('name') as string,
                         amount: Number(fm.get('amount')),
                         next_date: fm.get('next_date') as string
                      }).then(()=>{publishSync(); (e.target as HTMLFormElement).reset()});
                   }} className={`p-6 rounded-2xl border ${theme==='dark'?'bg-[#0f172a] border-white/5':'bg-slate-50 border-slate-200'} grid grid-cols-1 sm:grid-cols-4 gap-4`}>
                      <input name="name" required placeholder="বিলের নাম (যেমন: Netflix)" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <input name="amount" type="number" required placeholder="পরিমাণ" className={`px-4 py-3 rounded-xl border focus:outline-none ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <input name="next_date" type="date" required className={`px-4 py-3 rounded-xl border focus:outline-none [color-scheme:dark] ${theme==='dark'?'bg-black/50 border-white/10 text-white':'bg-white border-slate-200'}`} />
                      <button type="submit" className="bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">যোগ করুন</button>
                   </form>
                   <div className="space-y-3">
                     {subscriptions.map(s => (
                       <div key={s.id} className={`flex items-center justify-between p-5 rounded-2xl border ${theme==='dark'?'bg-[#0f172a] border-white/5':'bg-white border-slate-200'}`}>
                          <div className="flex gap-4 items-center">
                             <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                                <RefreshCw className="w-5 h-5"/>
                             </div>
                             <div>
                               <h4 className="font-bold text-lg">{s.name}</h4>
                               <p className={`text-sm mt-1 flex items-center gap-1 ${textSub}`}><Clock className="w-3 h-3"/> সামনে: {format(parseISO(s.nextDate || s.next_date || s.id), 'do MMM yyyy')}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <p className={`text-xl font-mono font-bold text-slate-900 dark:text-white`}>৳{s.amount.toLocaleString('en-IN')}</p>
                             <button onClick={()=>insforge.database.from('subscriptions').delete().eq('id', s.id).then(()=>publishSync())} className="text-rose-500/50 hover:text-rose-500"><Trash2 className="w-4 h-4"/></button>
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>
              )}
              {/* Transactions Specific */}
"""

content = re.sub(fallback_rx, new_uis, content)

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Rewrite complete')
