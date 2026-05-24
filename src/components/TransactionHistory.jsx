import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = ["All","Food","Shopping","Travel","Bills","Salary","Entertainment"];
const catIcon = { Food:"🍜", Shopping:"🛍️", Travel:"✈️", Bills:"📄", Salary:"💰", Entertainment:"🎬" };

const TransactionHistory = ({ transactions, onDelete }) => {
  const { isDark } = useTheme();
  const [search, setSearch]     = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filtered = transactions
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) && (filterCat==="All"||t.category===filterCat))
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  const fmt = (n) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

  const card=isDark?"#100c30":"#ffffff"; const border=isDark?"#1e1650":"#e2e8f0";
  const text1=isDark?"#e2e0ff":"#1e293b"; const text2=isDark?"#c4baf0":"#475569";
  const text3=isDark?"#4a3f7a":"#94a3b8"; const text4=isDark?"#5a4f8a":"#64748b";
  const inputBg=isDark?"#0d0828":"#f8fafc"; const hoverBg=isDark?"rgba(99,102,241,0.07)":"rgba(99,102,241,0.04)";

  const inputStyle = { background:inputBg, border:`1px solid ${border}`, borderRadius:"11px", padding:"10px 14px", fontSize:"14px", color:text1, outline:"none" };

  return (
    <div style={{ background:card, borderRadius:"18px", border:`1px solid ${border}`, padding:"24px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"18px" }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:text1, fontSize:"17px", display:"flex", alignItems:"center", gap:"9px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#818cf8", display:"inline-block" }}></span>
          Transaction History
        </h2>
        <span style={{ fontSize:"13px", color:text4, background:isDark?"rgba(99,102,241,0.1)":"#eef2ff", border:`1px solid ${border}`, borderRadius:"20px", padding:"3px 12px" }}>
          {filtered.length} records
        </span>
      </div>

      <div style={{ display:"flex", gap:"12px", marginBottom:"16px" }}>
        <div style={{ flex:1, position:"relative" }}>
          <svg style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:text3 }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search transactions…" style={{...inputStyle, width:"100%", paddingLeft:"38px"}}/>
        </div>
        <select value={filterCat} onChange={(e)=>setFilterCat(e.target.value)} style={{...inputStyle, width:"150px"}}>
          {CATEGORIES.map((c)=><option key={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
        {filtered.map((tx) => (
          <div key={tx.id}
            style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px", borderRadius:"13px", transition:"background 0.15s", cursor:"default" }}
            onMouseEnter={e=>e.currentTarget.style.background=hoverBg}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{ width:"42px", height:"42px", borderRadius:"12px", background:isDark?"rgba(30,22,80,0.9)":"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
              {catIcon[tx.category]||"💳"}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:"15px", fontWeight:500, color:text2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{tx.title}</p>
              <p style={{ fontSize:"12px", color:text3, marginTop:"2px" }}>{tx.category} · {fmtDate(tx.date)}</p>
            </div>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"15px", fontWeight:600, flexShrink:0, color:tx.type==="income"?"#16a34a":"#e11d48" }}>
              {tx.type==="income"?"+":"-"}{fmt(tx.amount)}
            </span>
            <button onClick={()=>onDelete(tx.id)}
              style={{ background:"transparent", border:"none", cursor:"pointer", color:text3, padding:"6px", borderRadius:"8px", transition:"all 0.15s", flexShrink:0 }}
              onMouseEnter={e=>{e.currentTarget.style.color="#f87171";e.currentTarget.style.background="rgba(244,63,94,0.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.color=text3;e.currentTarget.style.background="transparent";}}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        ))}
      </div>
      {filtered.length===0 && <p style={{ textAlign:"center", color:text3, fontSize:"14px", padding:"36px 0" }}>No transactions found.</p>}
    </div>
  );
};
export default TransactionHistory;
