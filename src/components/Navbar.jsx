import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ProfileModal from "./ProfileModal";

const Navbar = ({ user, onUserUpdate }) => {
  const { isDark, toggle } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "FT";

  const navBg     = isDark ? "rgba(10,6,30,0.97)" : "rgba(255,255,255,0.97)";
  const navBorder = isDark ? "#1e1650" : "#e2e8f0";
  const textColor = isDark ? "#c4baf0" : "#334155";
  const badgeBg   = isDark ? "rgba(99,102,241,0.15)" : "#eef2ff";
  const badgeText = isDark ? "#818cf8" : "#6366f1";
  const usrBg     = isDark ? "rgba(30,22,80,0.5)" : "#f8fafc";
  const logoText  = isDark ? "#e2e0ff" : "#1e293b";

  return (
    <>
      <nav style={{ background:navBg, borderBottom:`1px solid ${navBorder}`, backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:30 }}>
        <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:"60px" }}>
          {/* Left */}
          <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
              <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius:"9px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:logoText, fontSize:"17px" }}>Fin Tracker</span>
            </div>
            <span style={{ background:badgeBg, color:badgeText, fontSize:"12px", fontWeight:600, padding:"3px 12px", borderRadius:"20px", border:`1px solid ${isDark?"rgba(99,102,241,0.25)":"#c7d2fe"}` }}>
              Dashboard
            </span>
          </div>

          {/* Right */}
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            {/* Dark/Light toggle */}
            <button onClick={toggle}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{ width:"42px", height:"24px", borderRadius:"12px", border:"none", cursor:"pointer", position:"relative", transition:"background 0.3s",
                background: isDark ? "#4338ca" : "#cbd5e1" }}>
              <div style={{ position:"absolute", top:"2px", width:"20px", height:"20px", borderRadius:"50%", background:"#fff", transition:"left 0.3s",
                left: isDark ? "20px" : "2px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px" }}>
                {isDark ? "🌙" : "☀️"}
              </div>
            </button>

            {/* Export CSV button */}
            <button
              title="Export transactions as CSV"
              onClick={() => {
                const txns = JSON.parse(localStorage.getItem(`ft_transactions_${localStorage.getItem("ft_session")}`) || "[]");
                if (!txns.length) return alert("No transactions to export!");
                const headers = ["Title","Amount","Category","Type","Date"];
                const rows = txns.map((t) => [t.title, t.amount, t.category, t.type, t.date]);
                const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
                const blob = new Blob([csv], { type:"text/csv" });
                const url  = URL.createObjectURL(blob);
                const a    = document.createElement("a");
                a.href = url; a.download = "fin-tracker-transactions.csv";
                a.click(); URL.revokeObjectURL(url);
              }}
              style={{ display:"flex", alignItems:"center", gap:"6px", background: isDark?"rgba(34,197,94,0.1)":"#f0fdf4", border:`1px solid ${isDark?"rgba(34,197,94,0.25)":"#bbf7d0"}`, borderRadius:"10px", padding:"6px 14px", cursor:"pointer", fontSize:"13px", fontWeight:600, color: isDark?"#4ade80":"#16a34a" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              </svg>
              Export CSV
            </button>

            {/* User profile */}
            <button onClick={() => setShowModal(true)}
              style={{ display:"flex", alignItems:"center", gap:"8px", background:usrBg, border:`1px solid ${navBorder}`, borderRadius:"12px", padding:"6px 12px 6px 8px", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor="#4338ca"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor=navBorder}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width:"30px", height:"30px", borderRadius:"50%", objectFit:"cover", border:"1.5px solid #4338ca" }}/>
              ) : (
                <div style={{ width:"30px", height:"30px", borderRadius:"50%", background:"linear-gradient(135deg,#4338ca,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"#fff" }}>
                  {initials}
                </div>
              )}
              <span style={{ fontSize:"14px", fontWeight:500, color:textColor }}>{user?.name || "User"}</span>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={isDark?"#5a4f8a":"#94a3b8"} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {showModal && <ProfileModal user={user} onClose={() => setShowModal(false)} onUserUpdate={onUserUpdate} />}
    </>
  );
};

export default Navbar;
