import { NavLink } from "react-router-dom";
import {
  House,
  CheckSquare,
  BookOpen,
  GraduationCap,
  Trophy,
  Settings,
  Shield
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <Shield size={30} />
        <div>
          <h2>Study Shield</h2>
          <span>Focus & Achieve</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="section-title">
          الرئيسية
        </p>

        <nav>

          <NavLink to="/">
            <House size={20} />
            <span>الرئيسية</span>
          </NavLink>

          <NavLink to="/tasks">
            <CheckSquare size={20} />
            <span>المهام</span>
          </NavLink>

          <NavLink to="/lessons">
            <BookOpen size={20} />
            <span>الدروس</span>
          </NavLink>

          <NavLink to="/lectures">
            <GraduationCap size={20} />
            <span>المحاضرات</span>
          </NavLink>

        </nav>
      </div>

      <div className="sidebar-section">

        <p className="section-title">
          النظام
        </p>

        <nav>

          <NavLink to="/achievements">
            <Trophy size={20} />
            <span>الأوسمة</span>
          </NavLink>

          <NavLink to="/settings">
            <Settings size={20} />
            <span>الإعدادات</span>
          </NavLink>

        </nav>

      </div>

      <div className="sidebar-footer">
        <span>🛡️ Study Shield</span>
        <small>Version 1.0</small>
      </div>

    </aside>
  );
}
