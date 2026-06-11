import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="quick-actions">

      <Link
        to="/tasks"
        className="action-card"
      >
        <div className="action-icon">✅</div>
        <span>إضافة مهمة</span>
      </Link>

      <Link
        to="/lessons"
        className="action-card"
      >
        <div className="action-icon">📚</div>
        <span>إضافة درس</span>
      </Link>

      <Link
        to="/lectures"
        className="action-card"
      >
        <div className="action-icon">🎓</div>
        <span>إضافة محاضرة</span>
      </Link>

    </div>
  );
}
