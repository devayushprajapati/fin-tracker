import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ICONS = ["🏠","🚗","💻","✈️","📱","🎓","💍","🏖️","💰","🎯"];

const SavingsGoal = ({ transactions }) => {
  const { isDark } = useTheme();

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("ft_goals");
    return saved ? JSON.parse(saved) : [
      { id:"g1", name:"New Laptop", target:80000, saved:25000, icon:"💻", color:"#6366f1" },
      { id:"g2", name:"Vacation",   target:50000, saved:12000, icon:"✈️", color:"#06b6d4" },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:"", target:"", saved:"", icon:"🎯", color:"#6366f1" });
  const [addingTo, setAddingTo] = useState(null); // goal id for adding money
  const [addAmount, setAddAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("ft_goals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (!form.name || !form.target) return;
    const newGoal = {
      id: Date.now().toString(),
      name: form.name,
      target: parseFloat(form.target),
      saved: parseFloat(form.saved) || 0,
      icon: form.icon,
      color: form.color,
    };
    setGoals([...goals, newGoal]);
    setForm({ name:"", target:"", saved:"", icon:"🎯", color:"#6366f1" });
    setShowForm(false);
  };

  const handleAddMoney = (id) => {
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) return;
    setGoals(goals.map((g) => g.id === id ? { ...g, saved: Math.min(g.saved + amt, g.target) } : g));
    setAddingTo(null);
    setAddAmount("");
  };

  const handleDelete = (id) => setGoals(goals.filter((g) => g.id !== id));

  const fmt = (n) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);

  const card   = isDark ? "#100c30" : "#ffffff";
  const border = isDark ? "#1e1650" : "#e2e8f0";
  const text1  = isDark ? "#e2e0ff" : "#1e293b";
  const text2  = isDark ? "#7c6fad" : "#64748b";
  const text3  = isDark ? "#5a4f8a" : "#94a3b8";
  const inputBg= isDark ? "#0d0828" : "#f8fafc";
  const itemBg = isDark ? "rgba(13,8,40,0.6)" : "#f8fafc";

  return (
    <div style={{ background:card, borderRadius:"18px", border:`1px solid ${border}`, padding:"24px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px" }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:text1, fontSize:"17px", display:"flex", alignItems:"center", gap:"9px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#22c55e", display:"inline-block" }}></span>
          Savings Goals
        </h2>
        <button onClick={() => setShowForm(!showForm)}
          style={{ background:"#6366f1", color:"#fff", border:"none", borderRadius:"10px", padding:"7px 14px", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>
          + New Goal
        </button>
      </div>

      {/* Add goal form */}
      {showForm && (
        <div style={{ background:itemBg, border:`1px solid ${border}`, borderRadius:"13px", padding:"16px", marginBottom:"16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"10px" }}>
            <div>
              <label style={{ fontSize:"11px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:"4px" }}>Goal Name</label>
              <input type="text" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="e.g. New Laptop"
                style={{ width:"100%", background:inputBg, border:`1px solid ${border}`, borderRadius:"9px", padding:"9px 12px", fontSize:"14px", color:text1, outline:"none" }}/>
            </div>
            <div>
              <label style={{ fontSize:"11px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:"4px" }}>Target Amount (₹)</label>
              <input type="number" value={form.target} onChange={(e)=>setForm({...form,target:e.target.value})} placeholder="80000"
                style={{ width:"100%", background:inputBg, border:`1px solid ${border}`, borderRadius:"9px", padding:"9px 12px", fontSize:"14px", color:text1, outline:"none", fontFamily:"monospace" }}/>
            </div>
            <div>
              <label style={{ fontSize:"11px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:"4px" }}>Already Saved (₹)</label>
              <input type="number" value={form.saved} onChange={(e)=>setForm({...form,saved:e.target.value})} placeholder="0"
                style={{ width:"100%", background:inputBg, border:`1px solid ${border}`, borderRadius:"9px", padding:"9px 12px", fontSize:"14px", color:text1, outline:"none", fontFamily:"monospace" }}/>
            </div>
            <div>
              <label style={{ fontSize:"11px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:"4px" }}>Icon</label>
              <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                {ICONS.map((ic) => (
                  <button key={ic} onClick={()=>setForm({...form,icon:ic})}
                    style={{ width:"32px", height:"32px", borderRadius:"8px", border:`1px solid ${form.icon===ic?"#6366f1":border}`, background:form.icon===ic?"rgba(99,102,241,0.2)":inputBg, fontSize:"16px", cursor:"pointer" }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:"8px" }}>
            <button onClick={handleAddGoal} style={{ background:"#6366f1", color:"#fff", border:"none", borderRadius:"9px", padding:"9px 18px", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>Create Goal</button>
            <button onClick={()=>setShowForm(false)} style={{ background:"transparent", color:text2, border:`1px solid ${border}`, borderRadius:"9px", padding:"9px 18px", fontSize:"13px", cursor:"pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Goals list */}
      <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
        {goals.map((goal) => {
          const pct      = Math.min((goal.saved / goal.target) * 100, 100);
          const remaining= goal.target - goal.saved;
          const done     = pct >= 100;

          return (
            <div key={goal.id} style={{ background:itemBg, border:`1px solid ${done?"rgba(34,197,94,0.3)":border}`, borderRadius:"13px", padding:"16px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{ width:"42px", height:"42px", borderRadius:"12px", background: isDark?"rgba(30,22,80,0.8)":"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>
                    {goal.icon}
                  </div>
                  <div>
                    <p style={{ fontSize:"15px", fontWeight:600, color:text1 }}>{goal.name}</p>
                    <p style={{ fontSize:"12px", color:text3 }}>Target: {fmt(goal.target)}</p>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  {done && <span style={{ fontSize:"11px", color:"#22c55e", fontWeight:700, background:"rgba(34,197,94,0.1)", padding:"3px 10px", borderRadius:"20px" }}>✓ Achieved!</span>}
                  <button onClick={()=>handleDelete(goal.id)} style={{ background:"transparent", border:"none", color:text3, cursor:"pointer", fontSize:"16px", padding:"2px" }}>🗑️</button>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height:"10px", background: isDark?"rgba(30,22,80,0.8)":"#e2e8f0", borderRadius:"10px", overflow:"hidden", marginBottom:"10px" }}>
                <div style={{ height:"100%", width:`${pct}%`, background: done?"#22c55e":"linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius:"10px", transition:"width 0.6s ease" }}/>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <span style={{ fontSize:"15px", fontWeight:700, color: done?"#22c55e":"#818cf8" }}>{fmt(goal.saved)}</span>
                  <span style={{ fontSize:"13px", color:text3 }}> saved · {Math.round(pct)}%</span>
                </div>
                {!done && (
                  <span style={{ fontSize:"13px", color:text3 }}>{fmt(remaining)} remaining</span>
                )}
              </div>

              {/* Add money to goal */}
              {!done && (
                <div style={{ marginTop:"10px" }}>
                  {addingTo === goal.id ? (
                    <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                      <input type="number" value={addAmount} onChange={(e)=>setAddAmount(e.target.value)}
                        onKeyDown={(e)=>e.key==="Enter"&&handleAddMoney(goal.id)}
                        placeholder="Add amount" autoFocus
                        style={{ flex:1, background:inputBg, border:`1px solid ${border}`, borderRadius:"8px", padding:"7px 12px", fontSize:"13px", color:text1, outline:"none", fontFamily:"monospace" }}/>
                      <button onClick={()=>handleAddMoney(goal.id)} style={{ background:"#22c55e", color:"#fff", border:"none", borderRadius:"8px", padding:"7px 14px", fontSize:"12px", fontWeight:600, cursor:"pointer" }}>Add ₹</button>
                      <button onClick={()=>setAddingTo(null)} style={{ background:"transparent", color:text3, border:`1px solid ${border}`, borderRadius:"8px", padding:"7px 10px", fontSize:"12px", cursor:"pointer" }}>✕</button>
                    </div>
                  ) : (
                    <button onClick={()=>setAddingTo(goal.id)}
                      style={{ background:"transparent", border:`1px solid ${isDark?"#2a1f60":"#e2e8f0"}`, borderRadius:"9px", padding:"7px 16px", fontSize:"13px", color:text2, cursor:"pointer", fontWeight:500 }}>
                      + Add Money
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {goals.length === 0 && (
          <p style={{ textAlign:"center", color:text3, fontSize:"14px", padding:"24px 0" }}>No goals yet. Create your first savings goal!</p>
        )}
      </div>
    </div>
  );
};

export default SavingsGoal;
