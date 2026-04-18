import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure we add import for the insforge client
import_stmt = "import { insforge } from '../lib/insforge';\n"
content = re.sub(r'(import CustomCursor from \'../components/CustomCursor\';)', r'\1\n' + import_stmt, content)

# 1. Transactions - Empty initial state and create a fetch hook
content = re.sub(
    r'const \[transactions, setTransactions\] = useState<Transaction\[\]>\(\[[\s\S]*?\]\);',
    r'const [transactions, setTransactions] = useState<Transaction[]>([]);',
    content
)

# 2. Todos - Empty initial state
content = re.sub(
    r'const \[todos, setTodos\] = useState<Todo\[\]>\(\[[\s\S]*?\]\);',
    r'const [todos, setTodos] = useState<Todo[]>([]);',
    content
)

# 3. Add useEffect to fetch data
fetch_effect = """
  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      const { data: txData } = await insforge.from('transactions').select('*').order('date', { ascending: false });
      if (txData) {
        setTransactions(txData.map((d: any) => ({
          id: d.id,
          type: d.type,
          amount: Number(d.amount),
          category: d.category,
          note: d.note,
          date: d.date,
          walletId: d.wallet_id
        })));
      }
      
      const { data: tdData } = await insforge.from('todos').select('*').order('created_at', { ascending: false });
      if (tdData) {
        setTodos(tdData.map((d: any) => ({
          id: d.id,
          text: d.text,
          isCompleted: d.is_completed
        })));
      }
    }
    fetchData();
  }, []);
"""

content = re.sub(
    r'(const \[subscriptions, setSubscriptions\].*?;)',
    r'\1\n' + fetch_effect,
    content,
    flags=re.DOTALL
)

# 4. handleAddTransaction uses insforge.insert
handle_add_rx = r'(const handleAddTransaction =[\s\S]*?const newTx: Transaction = \{[\s\S]*?\};\s*)(setTransactions\(\[newTx, \.\.\.transactions\]\);)'
def handle_add_tx_repl(m):
    return m.group(1) + """
    insforge.from('transactions').insert({
      type: newTx.type, amount: newTx.amount, category: newTx.category,
      note: newTx.note, date: newTx.date, wallet_id: newTx.walletId
    }).then(({ data }) => {
      // refetch or append optimistically, we append optimistically
      setTransactions([newTx, ...transactions]);
    });
    """

content = re.sub(handle_add_rx, handle_add_tx_repl, content)

# 5. Todo Toggling
todo_toggle_rx = r'onClick=\{\(\)=>\{\s*setTodos\(todos\.map\(t=>t\.id===todo\.id\?\{\.\.\.t,isCompleted:!t\.isCompleted\}:t\)\)\s*\}\}'
def todo_toggle_repl(m):
    return r"onClick={async () => { const newStatus = !todo.isCompleted; setTodos(todos.map(t=>t.id===todo.id?{...t,isCompleted:newStatus}:t)); await insforge.from('todos').update({is_completed: newStatus}).eq('id', todo.id); }}"
content = re.sub(todo_toggle_rx, todo_toggle_repl, content)

# 6. Todo Deletion
todo_del_rx = r'onClick=\{\(\)=>setTodos\(todos\.filter\(t=>t\.id !== todo\.id\)\)\}'
def todo_del_repl(m):
    return r"onClick={async () => { setTodos(todos.filter(t=>t.id !== todo.id)); await insforge.from('todos').delete().eq('id', todo.id); }}"
content = re.sub(todo_del_rx, todo_del_repl, content)

# 7. Todo Adding via Enter and Button (in Tasks tab) - wait there are a few inputs
# Let's just catch the set calls
todo_add_rx1 = r'if\(val\) \{ setTodos\(\[\{id: Date\.now\(\)\.toString\(\), text: val, isCompleted: false\}, \.\.\.todos\]\); \(e\.target as HTMLInputElement\)\.value=\'\'; \}'
def todo_add_repl1(m):
    return r"if(val) { insforge.from('todos').insert({text: val, is_completed: false}).select().single().then(({data}) => {if(data) setTodos([{id: data.id, text: data.text, isCompleted: data.is_completed}, ...todos]);}); (e.target as HTMLInputElement).value=''; }"
content = re.sub(todo_add_rx1, todo_add_repl1, content)

todo_add_rx2 = r'if\(inp\.value\) \{ setTodos\(\[\{id: Date\.now\(\)\.toString\(\), text: inp\.value, isCompleted: false\}, \.\.\.todos\]\); inp\.value=\'\'; \}'
def todo_add_repl2(m):
    return r"if(inp.value) { insforge.from('todos').insert({text: inp.value, is_completed: false}).select().single().then(({data}) => {if(data) setTodos([{id: data.id, text: data.text, isCompleted: data.is_completed}, ...todos]);}); inp.value=''; }"
content = re.sub(todo_add_rx2, todo_add_repl2, content)

# 8. Transaction Deletion
tx_del_rx = r'onClick=\{\(\)=>setTransactions\(transactions\.filter\(t=>t\.id!==tx\.id\)\)\}'
def tx_del_repl(m):
    return r"onClick={async () => { setTransactions(transactions.filter(t=>t.id!==tx.id)); await insforge.from('transactions').delete().eq('id', tx.id); }}"
content = re.sub(tx_del_rx, tx_del_repl, content)

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
