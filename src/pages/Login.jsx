import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");

  const handleChange = (e) => { setForm({...form,[e.target.name]:e.target.value}); setError(""); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("ft_users")||"[]");
    const user  = users.find((u)=>u.email===form.email);
    if (!user)               { setError("No account found with this email."); return; }
    if (user.password!==form.password) { setError("Incorrect password. Please try again."); return; }
    localStorage.setItem("ft_session", user.email);
    navigate("/dashboard");
  };

  const inputStyle = { width:"100%", background:"rgba(13,8,40,0.8)", border:"1px solid #1e1650", borderRadius:"11px", padding:"13px 16px", fontSize:"15px", color:"#c4baf0", outline:"none", transition:"border 0.2s" };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:"linear-gradient(135deg,#0a061e 0%,#0f0a2e 50%,#130d38 100%)" }}>
      {/* Left panel */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"40px 48px", borderRight:"1px solid #1a1550" }} className="hidden lg:flex">
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"36px" }}>
          <div style={{ width:"40px", height:"40px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius:"11px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <span style={{ fontFamily:"'Sora',sans-serif", fontSize:"22px", fontWeight:700, color:"#e2e0ff" }}>Fin Tracker</span>
        </div>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:"40px", fontWeight:700, color:"#f0eeff", lineHeight:1.2, marginBottom:"16px" }}>
          Track every<br/><span style={{ color:"#818cf8" }}>rupee</span>, always.
        </h1>
        <p style={{ color:"#5a4f8a", fontSize:"16px", lineHeight:1.7, maxWidth:"360px" }}>
          Budget planning, savings goals, expense analytics — all in one place.
        </p>
        <div style={{ display:"flex", gap:"40px", marginTop:"56px" }}>
          {[["₹55K+","Tracked daily"],["4","Smart features"],["Free","Forever"]].map(([v,l])=>(
            <div key={l}>
              <p style={{ fontFamily:"'Sora',sans-serif", fontSize:"24px", fontWeight:700, color:"#818cf8" }}>{v}</p>
              <p style={{ fontSize:"12px", color:"#4a3f7a", marginTop:"2px" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: login form */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
        <div style={{ width:"100%", maxWidth:"420px" }}>
          <div style={{ background:"rgba(16,12,48,0.85)", border:"1px solid #1e1650", borderRadius:"20px", padding:"36px", backdropFilter:"blur(12px)" }}>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"24px", fontWeight:700, color:"#f0eeff", marginBottom:"6px" }}>Welcome back</h2>
            <p style={{ color:"#5a4f8a", fontSize:"14px", marginBottom:"28px" }}>Sign in to your dashboard</p>

            {error && (
              <div style={{ background:"rgba(244,63,94,0.1)", border:"1px solid rgba(244,63,94,0.25)", borderRadius:"10px", padding:"12px 16px", marginBottom:"20px", fontSize:"14px", color:"#f87171" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
              <div>
                <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:"#7c6fad", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"7px" }}>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} required/>
              </div>
              <div>
                <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:"#7c6fad", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"7px" }}>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Your password" style={inputStyle} required/>
              </div>
              <button type="submit" style={{ background:"linear-gradient(135deg,#4338ca,#6366f1)", color:"#fff", border:"none", borderRadius:"11px", padding:"14px", fontSize:"15px", fontWeight:600, cursor:"pointer", marginTop:"4px" }}>
                Sign In
              </button>
            </form>

            <p style={{ textAlign:"center", fontSize:"14px", color:"#5a4f8a", marginTop:"24px" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color:"#818cf8", fontWeight:600, textDecoration:"none" }}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
