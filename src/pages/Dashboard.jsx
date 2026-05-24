import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionHistory from "../components/TransactionHistory";
import ExpenseChart from "../charts/ExpenseChart";
import BudgetPlanner from "../components/BudgetPlanner";
import SavingsGoal from "../components/SavingsGoal";
import Footer from "../components/Footer";

const DEFAULT_TRANSACTIONS = [
  { id:"d1",  title:"Monthly Salary",       amount:55000, category:"Salary",        type:"income",  date:"2025-01-05" },
  { id:"d2",  title:"Netflix Subscription", amount:499,   category:"Entertainment", type:"expense", date:"2025-01-07" },
  { id:"d3",  title:"Grocery Shopping",     amount:2340,  category:"Food",          type:"expense", date:"2025-01-10" },
  { id:"d4",  title:"Flight to Mumbai",     amount:14800, category:"Travel",        type:"expense", date:"2025-01-15" },
  { id:"d5",  title:"Amazon Shopping",      amount:1850,  category:"Shopping",      type:"expense", date:"2025-01-18" },
  { id:"d6",  title:"Freelance Payment",    amount:18000, category:"Salary",        type:"income",  date:"2025-02-03" },
  { id:"d7",  title:"Electricity Bill",     amount:1200,  category:"Bills",         type:"expense", date:"2025-02-08" },
  { id:"d8",  title:"Weekend Trip",         amount:5500,  category:"Travel",        type:"expense", date:"2025-02-20" },
  { id:"d9",  title:"March Salary",         amount:55000, category:"Salary",        type:"income",  date:"2025-03-05" },
  { id:"d10", title:"Dinner Out",           amount:1800,  category:"Food",          type:"expense", date:"2025-03-14" },
];

const STORAGE_KEY = "ft_transactions";

const Dashboard = () => {
  const { isDark } = useTheme();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const session = localStorage.getItem("ft_session");
    const users   = JSON.parse(localStorage.getItem("ft_users") || "[]");
    const current = users.find((u) => u.email === session);
    setUser(current || { name:"User", email:session, avatar:null });
    const saved = localStorage.getItem(`${STORAGE_KEY}_${session}`);
    setTransactions(saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS);
  }, []);

  useEffect(() => {
    const session = localStorage.getItem("ft_session");
    if (session && transactions.length > 0)
      localStorage.setItem(`${STORAGE_KEY}_${session}`, JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd    = (tx) => setTransactions((prev) => [tx, ...prev]);
  const handleDelete = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));

  const bg = isDark
    ? "linear-gradient(160deg,#0a061e 0%,#0f0a2e 60%,#130d38 100%)"
    : "linear-gradient(160deg,#f0f4ff 0%,#e8eeff 60%,#f5f0ff 100%)";

  const greetColor  = isDark ? "#f0eeff" : "#1e293b";
  const subColor    = isDark ? "#5a4f8a"  : "#64748b";

  return (
    <div style={{ minHeight:"100vh", background:bg }}>
      <Navbar user={user} onUserUpdate={setUser} />

      {/* subtle bg blobs */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"8%",   left:"-4%",  width:"420px", height:"420px", borderRadius:"50%", background: isDark?"rgba(99,102,241,0.04)":"rgba(99,102,241,0.06)" }}/>
        <div style={{ position:"absolute", bottom:"8%",right:"-4%", width:"360px", height:"360px", borderRadius:"50%", background: isDark?"rgba(139,92,246,0.04)":"rgba(139,92,246,0.06)" }}/>
      </div>

      <main style={{ maxWidth:"1400px", margin:"0 auto", padding:"28px 24px", position:"relative", zIndex:1, display:"flex", flexDirection:"column", gap:"22px" }}>
        {/* Greeting */}
        <div>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:"26px", fontWeight:700, color:greetColor }}>
            Hello, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p style={{ color:subColor, fontSize:"14px", marginTop:"4px" }}>
            Here's your complete financial overview.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Expense Chart — full width */}
        <ExpenseChart transactions={transactions} />

        {/* Budget + Savings side by side */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", alignItems:"start" }}>
          <BudgetPlanner transactions={transactions} />
          <SavingsGoal   transactions={transactions} />
        </div>

        {/* Add form + History */}
        <div style={{ display:"grid", gridTemplateColumns:"360px 1fr", gap:"20px", alignItems:"start" }}>
          <TransactionForm onAdd={handleAdd} />
          <TransactionHistory transactions={transactions} onDelete={handleDelete} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
