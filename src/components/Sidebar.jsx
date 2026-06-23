import { NavLink } from "react-router-dom";
import { Home, CheckSquare, Timer, Settings } from "lucide-react";

export default function Sidebar() {
  const link =
    "flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition";

  return (
    <aside className="w-64 bg-card p-4 hidden md:flex flex-col">
      <h2 className="text-xl font-bold mb-6">StudyShield</h2>

      <NavLink to="/" className={link}>
        <Home size={18} /> Dashboard
      </NavLink>

      <NavLink to="/tasks" className={link}>
        <CheckSquare size={18} /> Tasks
      </NavLink>

      <NavLink to="/pomodoro" className={link}>
        <Timer size={18} /> Focus
      </NavLink>

      <NavLink to="/settings" className={link}>
        <Settings size={18} /> Settings
      </NavLink>
    </aside>
  );
}
