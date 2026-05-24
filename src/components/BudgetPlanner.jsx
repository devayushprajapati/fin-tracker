import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = ["Food","Shopping","Travel","Bills","Salary","Entertainment"];

const catIcon = { Food:"🍜", Shopping:"🛍️", Travel:"✈️", Bills:"📄", Salary:"💰", Entertainment:"🎬" };

const BudgetPlanner = ({ transactions }) => {
  const { isDark } = useTheme();

  // budgets: { Food: 5000, Shopping: 3000, ... }
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("ft_budgets");
    return saved ? JSON.parse(saved) : { Food:5000, Shopping:3000, Travel:8000, Bills:2000, Salary:0, Entertainment:1500 };
  });

  const [editing, setEditing] = useState(null); // which category is being edited
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    localStorage.setItem("ft_budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Get current month expenses per category
  const currentMonth = new Date().getMonth();
  const currentYear  = new Date().getFullYear();

  const spent = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return t.type === "expense" && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const fmt = (n) => new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(n);

  const saveEdit = (cat) => {
    const val = parseFloat(inputVal);
    if (!isNaN(val) && val >= 0) setBudgets({ ...budgets, [cat]: val });
    setEditing(null);
    setInputVal("");
  };

  // theme colors
  const card   = isDark ? "#100c30" : "#ffffff";
  const border = isDark ? "#1e1650" : "#e2e8f0";
  const text1  = isDark ? "#e2e0ff" : "#1e293b";
  const text2  = isDark ? "#7c6fad" : "#64748b";
  const text3  = isDark ? "#5a4f8a" : "#94a3b8";
  const inputBg= isDark ? "#0d0828" : "#f8fafc";

  return (
    <div style={{ background:card, borderRadius:"18px", border:`1px solid ${border}`, padding:"24px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px" }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:text1, fontSize:"17px", display:"flex", alignItems:"center", gap:"9px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#f97316", display:"inline-block" }}></span>
          Budget Planner
        </h2>
        <span style={{ fontSize:"12px", color:text3, background: isDark?"rgba(249,115,22,0.1)":"#fff7ed", border:`1px solid ${isDark?"rgba(249,115,22,0.2)":"#fed7aa"}`, borderRadius:"20px", padding:"3px 12px" }}>
          {new Date().toLocaleString("en-IN",{month:"long",year:"numeric"})}
        </span>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
        {CATEGORIES.filter(c => c !== "Salary").map((cat) => {
          const limit   = budgets[cat] || 0;
          const used    = spent[cat]   || 0;
          const pct     = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
          const over    = used > limit && limit > 0;
          const barColor= over ? "#f43f5e" : pct > 75 ? "#f97316" : "#22c55e";

          return (
            <div key={cat} style={{ background: isDark?"rgba(13,8,40,0.6)":"#f8fafc", borderRadius:"13px", padding:"14px 16px", border:`1px solid ${border}` }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ fontSize:"20px" }}>{catIcon[cat]}</span>
                  <span style={{ fontSize:"15px", fontWeight:600, color:text1 }}>{cat}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  {over && <span style={{ fontSize:"11px", color:"#f43f5e", fontWeight:600, background:"rgba(244,63,94,0.1)", padding:"2px 8px", borderRadius:"10px" }}>Over Budget!</span>}
                  {editing === cat ? (
                    <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
                      <input
                        type="number"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key==="Enter" && saveEdit(cat)}
                        placeholder="Set limit"
                        style={{ width:"100px", background:inputBg, border:`1px solid ${border}`, borderRadius:"8px", padding:"5px 10px", fontSize:"13px", color:text1, outline:"none" }}
                        autoFocus
                      />
                      <button onClick={() => saveEdit(cat)} style={{ background:"#6366f1", color:"#fff", border:"none", borderRadius:"8px", padding:"5px 10px", fontSize:"12px", cursor:"pointer", fontWeight:600 }}>Save</button>
                      <button onClick={() => setEditing(null)} style={{ background:"transparent", color:text3, border:`1px solid ${border}`, borderRadius:"8px", padding:"5px 10px", fontSize:"12px", cursor:"pointer" }}>✕</button>
                    </div>
                  ) : (
                    <button onClick={() => { setEditing(cat); setInputVal(limit.toString()); }}
                      style={{ background:"transparent", border:`1px solid ${border}`, borderRadius:"8px", padding:"4px 10px", fontSize:"12px", color:text2, cursor:"pointer" }}>
                      ✏️ Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height:"8px", background: isDark?"rgba(30,22,80,0.8)":"#e2e8f0", borderRadius:"10px", overflow:"hidden", marginBottom:"8px" }}>
                <div style={{ height:"100%", width:`${pct}%`, background:barColor, borderRadius:"10px", transition:"width 0.5s ease" }}/>
              </div>

              {/* Spent / Limit */}
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:"13px", color: over?"#f43f5e":text2 }}>{fmt(used)} spent</span>
                <span style={{ fontSize:"13px", color:text3 }}>
                  {limit > 0 ? `${fmt(limit)} limit · ${Math.round(pct)}%` : "No limit set"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetPlanner;
