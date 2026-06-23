import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const link =
    "block p-3 rounded-lg hover:bg-white/10 transition text-white";

  return (
    <aside className="w-64 bg-[#1e293b] p-4 hidden md:flex flex-col">
      <h2 className="text-xl font-bold mb-6">
        StudyShield
      </h2>

      <NavLink to="/" className={link}>
        🏠 Dashboard
      </NavLink>

      <NavLink to="/tasks" className={link}>
        ✅ Tasks
      </NavLink>

      <NavLink to="/pomodoro" className={link}>
        ⏱ Focus
      </NavLink>

      <NavLink to="/settings" className={link}>
        ⚙ Settings
      </NavLink>
    </aside>
  );
}
