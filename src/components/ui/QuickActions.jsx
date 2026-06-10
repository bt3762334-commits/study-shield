import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="quick-actions">

      <Link
        to="/tasks"
        className="action-card"
      >
        ✅
        <span>إضافة مهمة</span>
      </Link>

      <Link
        to="/lessons"
        className="action-card"
      >
        📚
        <span>إضافة درس</span>
      </Link>

      <Link
        to="/lectures"
        className="action-card"
      >
        🎓
        <span>إضافة محاضرة</span>
      </Link>

    </div>
  );
}
