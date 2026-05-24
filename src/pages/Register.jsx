import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Minimum 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    const existing = JSON.parse(localStorage.getItem("ft_users") || "[]");
    if (existing.find((u) => u.email === form.email)) { setErrors({ email: "This email is already registered" }); return; }
    const newUser = { name: form.name, email: form.email, password: form.password, avatar: avatar || null };
    localStorage.setItem("ft_users", JSON.stringify([...existing, newUser]));
    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{background:"linear-gradient(135deg,#0a061e 0%,#0f0a2e 50%,#130d38 100%)"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-100px",right:"-100px",width:"500px",height:"500px",borderRadius:"50%",background:"rgba(99,102,241,0.05)"}}/>
        <div style={{position:"absolute",bottom:"-80px",left:"-80px",width:"400px",height:"400px",borderRadius:"50%",background:"rgba(139,92,246,0.05)"}}/>
      </div>

      <div style={{width:"100%",maxWidth:"460px",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
            <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span style={{fontFamily:"'Sora',sans-serif",fontSize:"20px",fontWeight:700,color:"#e2e0ff"}}>Fin Tracker</span>
          </div>
          <p style={{color:"#5a4f8a",fontSize:"13px"}}>Create your account to get started</p>
        </div>

        <div style={{background:"rgba(16,12,48,0.85)",border:"1px solid #1e1650",borderRadius:"20px",padding:"32px",backdropFilter:"blur(12px)"}}>
          {success && (
            <div style={{marginBottom:"16px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:"10px",padding:"10px 14px",fontSize:"13px",color:"#6ee7b7"}}>
              ✓ Account created! Redirecting to login…
            </div>
          )}

          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"14px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              <div>
                <label className="label">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="input-field"/>
                {errors.name && <p style={{color:"#f87171",fontSize:"11px",marginTop:"4px"}}>{errors.name}</p>}
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="input-field"/>
                {errors.email && <p style={{color:"#f87171",fontSize:"11px",marginTop:"4px"}}>{errors.email}</p>}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              <div>
                <label className="label">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 chars" className="input-field"/>
                {errors.password && <p style={{color:"#f87171",fontSize:"11px",marginTop:"4px"}}>{errors.password}</p>}
              </div>
              <div>
                <label className="label">Confirm</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat" className="input-field"/>
                {errors.confirmPassword && <p style={{color:"#f87171",fontSize:"11px",marginTop:"4px"}}>{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label className="label">Profile Picture (optional)</label>
              <div style={{display:"flex",alignItems:"center",gap:"12px",background:"#0d0828",border:"1px solid #1e1650",borderRadius:"12px",padding:"10px 14px"}}>
                {avatar ? (
                  <img src={avatar} alt="preview" style={{width:"34px",height:"34px",borderRadius:"50%",objectFit:"cover",border:"2px solid #4338ca"}}/>
                ) : (
                  <div style={{width:"34px",height:"34px",borderRadius:"50%",background:"#1a1150",display:"flex",alignItems:"center",justifyContent:"center",color:"#4a3f7a",fontSize:"18px"}}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleAvatar} style={{flex:1,fontSize:"12px",color:"#7c6fad"}} className="file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-indigo-900 file:text-indigo-300 hover:file:bg-indigo-800 cursor-pointer"/>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{marginTop:"4px",padding:"12px",fontSize:"14px"}}>
              Create Account
            </button>
          </form>

          <p style={{textAlign:"center",fontSize:"13px",color:"#5a4f8a",marginTop:"20px"}}>
            Already have an account?{" "}
            <Link to="/login" style={{color:"#818cf8",fontWeight:600,textDecoration:"none"}}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
