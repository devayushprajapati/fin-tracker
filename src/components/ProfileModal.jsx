import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ user, onClose, onUserUpdate }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [editName, setEditName] = useState(user?.name || "");
  const [preview, setPreview] = useState(user?.avatar || null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const session = localStorage.getItem("ft_session");
    const users = JSON.parse(localStorage.getItem("ft_users") || "[]");
    const updated = users.map((u) => u.email === session ? { ...u, name: editName, avatar: preview } : u);
    localStorage.setItem("ft_users", JSON.stringify(updated));
    onUserUpdate({ ...user, name: editName, avatar: preview });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("ft_session");
    navigate("/login");
  };

  const initials = user?.name ? user.name.split(" ").map((n)=>n[0]).join("").toUpperCase().slice(0,2) : "FT";

  return (
    <div style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"flex-start",justifyContent:"flex-end",paddingTop:"66px",paddingRight:"20px",background:"rgba(0,0,0,0.3)",backdropFilter:"blur(2px)"}}>
      <div ref={modalRef} style={{background:"#100c30",border:"1px solid #1e1650",borderRadius:"16px",width:"260px",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>
        <div style={{background:"rgba(99,102,241,0.08)",borderBottom:"1px solid #1e1650",padding:"16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            {preview ? (
              <img src={preview} alt="avatar" style={{width:"38px",height:"38px",borderRadius:"50%",objectFit:"cover",border:"2px solid #4338ca"}}/>
            ) : (
              <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"linear-gradient(135deg,#4338ca,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700,color:"#fff"}}>{initials}</div>
            )}
            <div>
              <p style={{fontSize:"13px",fontWeight:600,color:"#e2e0ff"}}>{user?.name}</p>
              <p style={{fontSize:"11px",color:"#5a4f8a"}}>{user?.email}</p>
            </div>
          </div>
        </div>

        <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:"12px"}}>
          <div>
            <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#7c6fad",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"5px"}}>Display Name</label>
            <input type="text" value={editName} onChange={(e)=>setEditName(e.target.value)} className="input-field" style={{fontSize:"13px"}}/>
          </div>

          <div>
            <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#7c6fad",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"5px"}}>Profile Picture</label>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              {preview ? <img src={preview} alt="" style={{width:"28px",height:"28px",borderRadius:"50%",objectFit:"cover"}}/> : <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"#1a1150",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",color:"#4a3f7a"}}>{initials}</div>}
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{flex:1,fontSize:"11px",color:"#7c6fad"}} className="file:mr-1 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-indigo-900 file:text-indigo-300 cursor-pointer"/>
            </div>
          </div>

          <button onClick={handleSave} className="btn-primary" style={{padding:"8px",fontSize:"13px"}}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>

          <div style={{borderTop:"1px solid #1e1650",paddingTop:"10px"}}>
            <button onClick={handleLogout} style={{width:"100%",display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",borderRadius:"10px",border:"none",background:"transparent",cursor:"pointer",fontSize:"13px",color:"#f87171",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(244,63,94,0.08)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
