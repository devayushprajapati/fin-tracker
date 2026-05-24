import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = ["Food","Shopping","Travel","Bills","Salary","Entertainment"];

const TransactionForm = ({ onAdd }) => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ title:"", amount:"", category:"Food", type:"expense", date:new Date().toISOString().split("T")[0] });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => { setForm({...form,[e.target.name]:e.target.value}); setErrors({...errors,[e.target.name]:""}); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount)<=0) errs.amount = "Enter a valid amount";
    if (Object.keys(errs).length>0) { setErrors(errs); return; }
    onAdd({ id:Date.now().toString(), title:form.title.trim(), amount:Number(form.amount), category:form.category, type:form.type, date:form.date });
    setForm({ title:"", amount:"", category:"Food", type:"expense", date:new Date().toISOString().split("T")[0] });
  };

  const card=isDark?"#100c30":"#ffffff"; const border=isDark?"#1e1650":"#e2e8f0";
  const text1=isDark?"#e2e0ff":"#1e293b"; const text3=isDark?"#5a4f8a":"#94a3b8";
  const inputBg=isDark?"#0d0828":"#f8fafc"; const inputText=isDark?"#c4baf0":"#334155";
  const ph=isDark?"#4a3f7a":"#94a3b8";

  const inputStyle = { width:"100%", background:inputBg, border:`1px solid ${border}`, borderRadius:"11px", padding:"11px 14px", fontSize:"14px", color:inputText, outline:"none", transition:"border 0.2s" };

  return (
    <div style={{ background:card, borderRadius:"18px", border:`1px solid ${border}`, padding:"24px" }}>
      <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:text1, fontSize:"17px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"9px" }}>
        <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#6366f1", display:"inline-block" }}></span>
        Add Transaction
      </h2>
      <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"6px" }}>Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Grocery shopping" style={{...inputStyle,color:inputText}}/>
          {errors.title && <p style={{ color:"#f87171", fontSize:"12px", marginTop:"4px" }}>{errors.title}</p>}
        </div>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"6px" }}>Amount (₹)</label>
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="0" min="0" style={{...inputStyle,fontFamily:"'JetBrains Mono',monospace"}}/>
          {errors.amount && <p style={{ color:"#f87171", fontSize:"12px", marginTop:"4px" }}>{errors.amount}</p>}
        </div>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"6px" }}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
            {CATEGORIES.map((c)=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"6px" }}>Type</label>
          <div style={{ display:"flex", gap:"10px" }}>
            {["income","expense"].map((type) => (
              <button key={type} type="button" onClick={()=>setForm({...form,type})}
                style={{ flex:1, padding:"11px", borderRadius:"11px", fontSize:"14px", fontWeight:600, border:"1px solid", cursor:"pointer", transition:"all 0.2s",
                  background:form.type===type?(type==="income"?"#059669":"#be123c"):"transparent",
                  color:form.type===type?"#fff":text3,
                  borderColor:form.type===type?(type==="income"?"#059669":"#be123c"):border }}>
                {type==="income"?"↑ Income":"↓ Expense"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"6px" }}>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle}/>
        </div>
        <button type="submit" style={{ background:"linear-gradient(135deg,#4338ca,#6366f1)", color:"#fff", border:"none", borderRadius:"11px", padding:"13px", fontSize:"15px", fontWeight:600, cursor:"pointer" }}>
          + Add Transaction
        </button>
      </form>
    </div>
  );
};
export default TransactionForm;
