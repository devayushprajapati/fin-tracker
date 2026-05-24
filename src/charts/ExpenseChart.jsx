import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
} from "chart.js";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const COLORS = ["#06b6d4","#f97316","#3b82f6","#8b5cf6","#ec4899","#14b8a6"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const ExpenseChart = ({ transactions }) => {
  const { isDark } = useTheme();
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) {
    return (
      <div style={{ background: isDark?"#100c30":"#ffffff", borderRadius:"18px", border:`1px solid ${isDark?"#1e1650":"#e2e8f0"}`, padding:"24px", display:"flex", alignItems:"center", justifyContent:"center", minHeight:"300px" }}>
        <p style={{ color: isDark?"#4a3f7a":"#94a3b8", fontSize:"15px" }}>No expense data yet. Add some transactions!</p>
      </div>
    );
  }

  // Donut: filter by selectedMonth
  const monthExpenses = expenses.filter((t) => new Date(t.date).getMonth() === selectedMonth);
  const usedExpenses  = monthExpenses.length > 0 ? monthExpenses : expenses;
  const usedTotals    = usedExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount; return acc;
  }, {});

  const pieLabels = Object.keys(usedTotals);
  const pieValues = Object.values(usedTotals);
  const pieTotal  = pieValues.reduce((a, b) => a + b, 0);
  const topCategory = pieLabels[pieValues.indexOf(Math.max(...pieValues))] || "—";

  const tooltipBg     = isDark ? "#0d0828" : "#ffffff";
  const tooltipBorder = isDark ? "#2a1f60" : "#e2e8f0";
  const tooltipTitle  = isDark ? "#e2e0ff" : "#1e293b";
  const tooltipBody   = isDark ? "#a89ed4" : "#64748b";

  const pieData = {
    labels: pieLabels,
    datasets: [{
      data: pieValues,
      backgroundColor: COLORS.slice(0, pieLabels.length),
      borderColor: isDark ? "#0d0828" : "#ffffff",
      borderWidth: 3,
      hoverOffset: 8,
    }],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => ` ₹${ctx.raw.toLocaleString("en-IN")} (${((ctx.raw/pieTotal)*100).toFixed(1)}%)` },
        backgroundColor: tooltipBg, borderColor: tooltipBorder, borderWidth: 1,
        titleColor: tooltipTitle, bodyColor: tooltipBody, padding: 12,
        titleFont: { size: 13 }, bodyFont: { size: 13 },
      },
    },
    animation: { animateRotate: true, duration: 600 },
  };

  // Bar chart
  const monthlyIncome  = Array(12).fill(0);
  const monthlyExpense = Array(12).fill(0);
  transactions.forEach((t) => {
    const m = new Date(t.date).getMonth();
    if (t.type === "income") monthlyIncome[m]  += t.amount;
    else                      monthlyExpense[m] += t.amount;
  });

  const barData = {
    labels: MONTHS,
    datasets: [
      {
        label: "Income",
        data: monthlyIncome,
        backgroundColor: monthlyIncome.map((_, i) => i === selectedMonth ? "#22c55e" : "rgba(34,197,94,0.3)"),
        borderRadius: 6, borderSkipped: false, barThickness: 16,
      },
      {
        label: "Expense",
        data: monthlyExpense,
        backgroundColor: monthlyExpense.map((_, i) => i === selectedMonth ? "#f43f5e" : "rgba(244,63,94,0.3)"),
        borderRadius: 6, borderSkipped: false, barThickness: 16,
      },
    ],
  };

  const gridColor = isDark ? "rgba(30,22,80,0.7)" : "rgba(226,232,240,0.8)";
  const tickColor = isDark ? "#5a4f8a" : "#94a3b8";

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (_, elements) => { if (elements.length > 0) setSelectedMonth(elements[0].index); },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => `${MONTHS[items[0].dataIndex]}`,
          label: (ctx) => ` ${ctx.dataset.label}: ₹${ctx.raw.toLocaleString("en-IN")}`,
        },
        backgroundColor: tooltipBg, borderColor: tooltipBorder, borderWidth: 1,
        titleColor: tooltipTitle, bodyColor: tooltipBody, padding: 12,
        titleFont: { size: 13 }, bodyFont: { size: 13 },
      },
    },
    scales: {
      x: {
        ticks: { color: tickColor, font: { size: 12 } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          color: tickColor, font: { size: 12 },
          callback: (v) => v >= 1000 ? `${Math.round(v/1000)}k` : v,
          maxTicksLimit: 6,
        },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  };

  const fmt = (n) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);

  const card   = isDark ? "#100c30" : "#ffffff";
  const border = isDark ? "#1e1650" : "#e2e8f0";
  const text1  = isDark ? "#e2e0ff" : "#1e293b";
  const text2  = isDark ? "#7c6fad" : "#64748b";
  const text3  = isDark ? "#5a4f8a" : "#94a3b8";
  const pillActiveBg   = "#6366f1";
  const pillInactiveBg = "transparent";
  const pillActiveBorder   = "#6366f1";
  const pillInactiveBorder = isDark ? "#1e1650" : "#e2e8f0";
  const pillActiveColor    = "#ffffff";
  const pillInactiveColor  = isDark ? "#5a4f8a" : "#94a3b8";
  const itemBg = isDark ? "rgba(13,8,40,0.5)" : "#f8fafc";

  return (
    <div style={{ background:card, borderRadius:"18px", border:`1px solid ${border}`, padding:"24px", display:"flex", flexDirection:"column", gap:"20px" }}>

      {/* Header + month pills */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:text1, fontSize:"17px", display:"flex", alignItems:"center", gap:"9px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#a78bfa", display:"inline-block" }}></span>
          Expense Analytics
        </h2>
        <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" }}>
          {MONTHS.map((m, i) => (
            <button key={m} onClick={() => setSelectedMonth(i)}
              style={{ padding:"5px 11px", borderRadius:"20px", fontSize:"12px", fontWeight:600, border:"1px solid", cursor:"pointer", transition:"all 0.15s",
                background:   selectedMonth===i ? pillActiveBg   : pillInactiveBg,
                color:        selectedMonth===i ? pillActiveColor : pillInactiveColor,
                borderColor:  selectedMonth===i ? pillActiveBorder : pillInactiveBorder,
              }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:"24px", alignItems:"start" }}>

        {/* Donut + legend */}
        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          <div style={{ height:"220px", position:"relative" }}>
            <Pie data={pieData} options={pieOptions} />
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center", pointerEvents:"none" }}>
              <p style={{ fontSize:"12px", color:text3, fontWeight:500 }}>
                {monthExpenses.length > 0 ? MONTHS[selectedMonth] : "All"}
              </p>
              <p style={{ fontFamily:"'Sora',sans-serif", fontSize:"17px", fontWeight:700, color:text1 }}>
                {fmt(pieTotal)}
              </p>
            </div>
          </div>

          {/* Custom legend with % */}
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {pieLabels.map((label, i) => {
              const pct = pieTotal > 0 ? Math.round((pieValues[i]/pieTotal)*100) : 0;
              return (
                <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:itemBg, borderRadius:"10px", padding:"8px 12px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <div style={{ width:"10px", height:"10px", borderRadius:"3px", background:COLORS[i], flexShrink:0 }}/>
                    <span style={{ fontSize:"14px", color:text1, fontWeight:500 }}>{label}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <span style={{ fontSize:"13px", color:COLORS[i], fontWeight:700 }}>{pct}%</span>
                    <span style={{ fontSize:"13px", color:text3, fontFamily:"monospace" }}>{fmt(pieValues[i])}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:"13px", fontWeight:600, color:text3, textTransform:"uppercase", letterSpacing:"0.07em" }}>
              Monthly Trend
            </p>
            <div style={{ display:"flex", gap:"14px" }}>
              {[["Income","#22c55e"],["Expense","#f43f5e"]].map(([l,c]) => (
                <div key={l} style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <div style={{ width:"10px", height:"10px", borderRadius:"3px", background:c }}/>
                  <span style={{ fontSize:"13px", color:text2 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height:"260px", position:"relative" }}>
            <Bar data={barData} options={barOptions} />
          </div>
          <p style={{ fontSize:"12px", color:text3, textAlign:"center" }}>
            Viewing: <span style={{ color:"#818cf8", fontWeight:600 }}>{MONTHS[selectedMonth]}</span> — click any bar or pill to switch month
          </p>
        </div>
      </div>

      {/* Summary pills */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", paddingTop:"16px", borderTop:`1px solid ${border}` }}>
        <div style={{ background: isDark?"rgba(244,63,94,0.08)":"#fff1f2", border:`1px solid ${isDark?"rgba(244,63,94,0.2)":"#fecdd3"}`, borderRadius:"14px", padding:"16px" }}>
          <p style={{ fontSize:"11px", color:text3, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"5px" }}>Total Expenses</p>
          <p style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:"#f43f5e", fontSize:"22px" }}>{fmt(pieTotal)}</p>
          <p style={{ fontSize:"12px", color:text3, marginTop:"3px" }}>{monthExpenses.length > 0 ? MONTHS[selectedMonth] : "All time"}</p>
        </div>
        <div style={{ background: isDark?"rgba(139,92,246,0.08)":"#f5f3ff", border:`1px solid ${isDark?"rgba(139,92,246,0.2)":"#ddd6fe"}`, borderRadius:"14px", padding:"16px" }}>
          <p style={{ fontSize:"11px", color:text3, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"5px" }}>Top Category</p>
          <p style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:"#a78bfa", fontSize:"22px" }}>{topCategory}</p>
          <p style={{ fontSize:"12px", color:text3, marginTop:"3px" }}>Highest spend</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
