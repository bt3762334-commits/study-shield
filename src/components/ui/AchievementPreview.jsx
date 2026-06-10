import {
  getTasks
} from "../../services/taskStorage";

export default function AchievementPreview() {
  const completed =
    getTasks().filter(
      task => task.completed
    ).length;

  let badge = "🌱";
  let title = "بداية الطريق";

  if (completed >= 5) {
    badge = "🥉";
    title = "منجز مبتدئ";
  }

  if (completed >= 10) {
    badge = "🥈";
    title = "منجز محترف";
  }

  if (completed >= 20) {
    badge = "🥇";
    title = "أسطورة الإنجاز";
  }

  return (
    <div className="dashboard-card achievement-preview">
      <h3>آخر وسام</h3>

      <div className="badge-preview">
        {badge}
      </div>

      <h2>{title}</h2>

      <p>
        أنجزت {completed} مهمة
      </p>
    </div>
  );
}
