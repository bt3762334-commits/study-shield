import { NavLink } from "react-router-dom";
import {
  House,
  CheckSquare,
  BookOpen,
  GraduationCap,
  Trophy,
  Settings
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>🛡️ Study Shield</h2>
      </div>

      <nav>
        <NavLink to="/">
          <House size={20} />
          الرئيسية
        </NavLink>

        <NavLink to="/tasks">
          <CheckSquare size={20} />
          المهام
        </NavLink>

        <NavLink to="/lessons">
          <BookOpen size={20} />
          الدروس
        </NavLink>

        <NavLink to="/lectures">
          <GraduationCap size={20} />
          المحاضرات
        </NavLink>

        <NavLink to="/achievements">
          <Trophy size={20} />
          الأوسمة
        </NavLink>

        <NavLink to="/settings">
          <Settings size={20} />
          الإعدادات
        </NavLink>
      </nav>
    </aside>
  );
}
