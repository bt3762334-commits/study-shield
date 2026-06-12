import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  House, CheckSquare, BookOpen, GraduationCap,
  Trophy, Settings, Shield, User, Timer, Menu, X
} from "lucide-react";
import { useUser } from "../context/UserContext";

const navItems = [
  { to: "/",            icon: <House size={20} />,          label: "الرئيسية" },
  { to: "/tasks",       icon: <CheckSquare size={20} />,    label: "المهام" },
  { to: "/lessons",     icon: <BookOpen size={20} />,       label: "الدروس" },
  { to: "/lectures",    icon: <GraduationCap size={20} />,  label: "المحاضرات" },
  { to: "/pomodoro",    icon: <Timer size={20} />,          label: "بومودورو" },
];

const accountItems = [
  { to: "/profile",     icon: <User size={20} />,           label: "الملف الشخصي" },
  { to: "/achievements",icon: <Trophy size={20} />,         label: "الإنجازات" },
  { to: "/settings",    icon: <Settings size={20} />,       label: "الإعدادات" },
];

export default function Sidebar() {
  const { userName } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ---- زر الهامبرجر (موبايل فقط) ---- */}
      <button
        className="mobile-hamburger"
        onClick={() => setMobileOpen(true)}
        aria-label="القائمة"
      >
        <Menu size={24} />
      </button>

      {/* ---- overlay موبايل ---- */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={close} />
      )}

      {/* ---- الشريط الجانبي ---- */}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        {/* إغلاق موبايل */}
        <button className="sidebar-close-btn" onClick={close}>
          <X size={20} />
        </button>

        {/* لوجو */}
        <div className="logo">
          <Shield size={32} />
          <div>
            <h2>Study Shield</h2>
            <span>Focus & Achieve</span>
          </div>
        </div>

        {/* اسم المستخدم */}
        {userName && (
          <div className="sidebar-user">
            <span className="sidebar-user-avatar">👤</span>
            <span className="sidebar-user-name">{userName}</span>
          </div>
        )}

        {/* تنقل رئيسي */}
        <div className="sidebar-section">
          <p className="section-title">الرئيسية</p>
          <nav>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={close}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* حساب */}
        <div className="sidebar-section">
          <p className="section-title">الحساب</p>
          <nav>
            {accountItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={close}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <span>🛡️ Study Shield</span>
          <small>Version 2.0</small>
        </div>
      </aside>
    </>
  );
}