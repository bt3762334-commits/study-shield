/* =============================================
   QUICK ACTIONS COMPONENT
   ============================================= */

import { Link } from "react-router-dom";

/* =============================================
   ACTIONS CONFIG
   ============================================= */

const actions = [
  { to: "/tasks", icon: "✅", label: "إضافة مهمة", color: "blue" },
  { to: "/lectures", icon: "🎓", label: "إضافة محاضرة", color: "purple" },
  { to: "/pomodoro", icon: "⏱️", label: "جلسة تركيز", color: "orange" },
];

/* =============================================
   COMPONENT
   ============================================= */

export default function QuickActions() {
  return (
    <div className="quick-actions">
      {actions.map((a) => (
        <Link
          key={a.to}
          to={a.to}
          className={`action-card action-card--${a.color}`}
        >
          <div className="action-icon">{a.icon}</div>
          <span>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}
