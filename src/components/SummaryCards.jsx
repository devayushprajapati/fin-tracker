import React from "react";
import { useTheme } from "../context/ThemeContext";

const SummaryCards = ({ transactions }) => {
  const { isDark } = useTheme();
  const income   = transactions.filter((t)=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const expenses = transactions.filter((t)=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  const balance  = income - expenses;
  const fmt = (n) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);

  const cards = [
    { label:"Total Balance",  value:fmt(balance),  sub:"Net position",
      icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
      bg:"linear-gradient(135deg,#4338ca,#6366f1)", glow:"rgba(99,102,241,0.25)" },
    { label:"Total Income",   value:fmt(income),   sub:"Money in",
      icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"/></svg>,
      bg:"linear-gradient(135deg,#059669,#10b981)", glow:"rgba(16,185,129,0.2)" },
    { label:"Total Expenses", value:fmt(expenses), sub:"Money out",
      icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6"/></svg>,
      bg:"linear-gradient(135deg,#be123c,#f43f5e)", glow:"rgba(244,63,94,0.2)" },
  ];

  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"16px" }}>
      {cards.map((card) => (
        <div key={card.label} style={{ background:card.bg, borderRadius:"18px", padding:"22px 24px", boxShadow:`0 8px 32px ${card.glow}`, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"90px", height:"90px", borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"13px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.07em" }}>{card.label}</p>
            <div style={{ width:"40px", height:"40px", background:"rgba(255,255,255,0.15)", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>{card.icon}</div>
          </div>
          <p style={{ fontFamily:"'Sora',sans-serif", fontSize:"28px", fontWeight:700, color:"#fff", letterSpacing:"-0.5px" }}>{card.value}</p>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px", marginTop:"5px" }}>{card.sub} · {transactions.length} txns</p>
        </div>
      ))}
    </div>
  );
};
export default SummaryCards;
