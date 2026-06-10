import { getTasks } from "../../services/taskStorage";

export default function NotificationCenter() {
  const tasks = getTasks();

  const pending =
    tasks.filter(
      task => !task.completed
    ).length;

  return (
    <div className="notification-card">

      <h3>
        🔔 التنبيهات
      </h3>

      {pending > 0 ? (
        <p>
          لديك {pending} مهمة لم يتم إنجازها بعد
        </p>
      ) : (
        <p>
          🎉 لا توجد مهام معلقة
        </p>
      )}

    </div>
  );
}
