/* =============================================
   SIDEBAR COMPONENT
   ============================================= */

import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  House, CheckSquare, GraduationCap,
  Trophy, Settings, Shield, User, Timer, Menu, X,
  Phone, Code2
} from "lucide-react";
import { useUser } from "../context/UserContext";

/* =============================================
   NAV DATA
   ============================================= */

const navItems = [
  { to: "/", icon: <House size={20} />, label: "الرئيسية" },
  { to: "/tasks", icon: <CheckSquare size={20} />, label: "المهام" },
  { to: "/lectures", icon: <GraduationCap size={20} />, label: "المحاضرات" },
  { to: "/pomodoro", icon: <Timer size={20} />, label: "بومودورو" },
];

const accountItems = [
  { to: "/profile", icon: <User size={20} />, label: "الملف الشخصي" },
  { to: "/achievements", icon: <Trophy size={20} />, label: "الإنجازات" },
  { to: "/settings", icon: <Settings size={20} />, label: "الإعدادات" },
];

/* =============================================
   SIDEBAR COMPONENT
   ============================================= */

export default function Sidebar() {
  const { userName } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  return (
    <>
      <button
        className="mobile-hamburger"
        onClick={() => setMobileOpen(true)}
        aria-label="القائمة"
      >
        <Menu size={24} />
      </button>

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={close} />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>

        <button className="sidebar-close-btn" onClick={close}>
          <X size={20} />
        </button>

        {/* LOGO */}
        <div className="logo">
          <div className="logo-icon">
            <Shield size={26} />
          </div>
          <div>
            <h2>Study Shield</h2>
            <span>Focus & Achieve</span>
          </div>
        </div>

        {/* USER */}
        {userName && (
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{userName}</span>
              <span className="sidebar-user-role">طالب نشيط</span>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div className="sidebar-section">
          <p className="section-title">التنقل</p>
          <nav>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={close}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ACCOUNT */}
        <div className="sidebar-section">
          <p className="section-title">الحساب</p>
          <nav>
            {accountItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={close}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* CREATOR FOOTER */}
        <div className="sidebar-creator">
          <div className="creator-badge">
            <Code2 size={14} />
            <span>Created By</span>
          </div>
          <div className="creator-name">Dark Byte</div>
          <div className="creator-phone">
            <Phone size={12} />
            <span>01091291823</span>
          </div>
        </div>

      </aside>
    </>
  );
}
