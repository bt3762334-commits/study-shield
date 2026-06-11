import { NavLink } from "react-router-dom";
import { Timer } from "lucide-react";

import {
  House,
  CheckSquare,
  BookOpen,
  GraduationCap,
  Trophy,
  Settings,
  Shield,
  User
} from "lucide-react";
<NavLink to="/pomodoro">
  <Timer size={20}/>
  <span>Pomodoro</span>
</NavLink>
export default function Sidebar() {

  return (
    <aside className="sidebar">

      <div className="logo">

        <Shield size={32} />

        <div>
          <h2>
            Study Shield
          </h2>

          <span>
            Focus & Achieve
          </span>
        </div>

      </div>

      <div className="sidebar-section">

        <p className="section-title">
          الرئيسية
        </p>

        <nav>

          <NavLink to="/">
            <House size={20} />
            <span>
              الرئيسية
            </span>
          </NavLink>

          <NavLink to="/tasks">
            <CheckSquare size={20} />
            <span>
              المهام
            </span>
          </NavLink>

          <NavLink to="/lessons">
            <BookOpen size={20} />
            <span>
              الدروس
            </span>
          </NavLink>

          <NavLink to="/lectures">
            <GraduationCap size={20} />
            <span>
              المحاضرات
            </span>
          </NavLink>

        </nav>

      </div>

      <div className="sidebar-section">

        <p className="section-title">
          الحساب
        </p>

        <nav>

          <NavLink to="/profile">
            <User size={20} />
            <span>
              الملف الشخصي
            </span>
          </NavLink>

          <NavLink to="/achievements">
            <Trophy size={20} />
            <span>
              الإنجازات
            </span>
          </NavLink>

          <NavLink to="/settings">
            <Settings size={20} />
            <span>
              الإعدادات
            </span>
          </NavLink>

        </nav>

      </div>

      <div className="sidebar-footer">

        <span>
          🛡️ Study Shield
        </span>

        <small>
          Version 1.0
        </small>

      </div>

    </aside>
  );
}
