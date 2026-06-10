import { useEffect, useState } from "react";

import {
  getTasks
} from "../../services/taskStorage";

export default function UpcomingTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const allTasks = getTasks();

    const upcoming = allTasks
      .filter(task => !task.completed)
      .slice(0, 5);

    setTasks(upcoming);
  }, []);

  return (
    <div className="dashboard-card">
      <h3>المهام القادمة</h3>

      {tasks.length === 0 ? (
<div className="empty-state">
  <h4>🎉 رائع!</h4>

  <p>
    لا توجد مهام معلقة حالياً
  </p>
</div>
      ) : (
        tasks.map(task => (
          <div
            className="task-item"
            key={task.id}
          >
            <div>

              <h4>
                {task.title}
              </h4>

              {task.date && (
                <small>
                  {task.date}
                </small>
              )}

            </div>

            {task.priority && (
              <span
                className={`priority ${task.priority}`}
              >
                {task.priority === "high"
                  ? "عالية"
                  : task.priority === "medium"
                  ? "متوسطة"
                  : "منخفضة"}
              </span>
            )}

          </div>
        ))
      )}
    </div>
  );
}
