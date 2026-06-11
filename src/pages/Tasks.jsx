import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import BackButton from "../components/ui/BackButton";

import {
  getTasks,
  saveTasks
} from "../services/taskStorage";

import {
  updateStreak
} from "../services/streakSystem";

export default function Tasks() {

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("medium");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const addTask = () => {

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      date,
      time,
      completed: false
    };

    const updated = [
      ...tasks,
      newTask
    ];

    setTasks(updated);
    saveTasks(updated);

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDate("");
    setTime("");
  };

  const toggleTask = (id) => {

    const updated = tasks.map(task => {

      if (task.id === id) {

        const newCompleted =
          !task.completed;

        if (newCompleted) {
          updateStreak();
        }

        return {
          ...task,
          completed: newCompleted
        };
      }

      return task;
    });

    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id) => {

    const updated =
      tasks.filter(
        task => task.id !== id
      );

    setTasks(updated);
    saveTasks(updated);
  };

  const activeTasks =
    tasks.filter(
      task => !task.completed
    );

  const completedTasks =
    tasks.filter(
      task => task.completed
    );

  return (
    <MainLayout>

      <BackButton />

      <h1 className="page-title">
        ✅ إدارة المهام
      </h1>

      <div className="task-form">

        <input
          type="text"
          placeholder="عنوان المهمة"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="وصف المهمة (اختياري)"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
        >
          <option value="high">
            عالية
          </option>

          <option value="medium">
            متوسطة
          </option>

          <option value="low">
            منخفضة
          </option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
        />

        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(
              e.target.value
            )
          }
        />

        <button
          onClick={addTask}
        >
          ➕ إضافة المهمة
        </button>

      </div>

      <div className="section-card">

        <h2>
          📌 المهام الحالية
        </h2>

        <div className="tasks-list">

          {activeTasks.length === 0 ? (

            <div className="empty-state">

              <h4>
                لا توجد مهام حالياً
              </h4>

              <p>
                أضف مهمة جديدة للبدء
              </p>

            </div>

          ) : (

            activeTasks.map(task => (

              <div
                className="task-card"
                key={task.id}
              >

                <div
                  className="task-content"
                >

                  <span>
                    {task.title}
                  </span>

                  {task.description && (
                    <p>
                      {
                        task.description
                      }
                    </p>
                  )}

                  <div
                    className="task-meta"
                  >

                    <span
                      className={`priority ${task.priority}`}
                    >
                      {task.priority ===
                      "high"
                        ? "🔥 عالية"
                        : task.priority ===
                          "medium"
                        ? "⚡ متوسطة"
                        : "✅ منخفضة"}
                    </span>

                    {task.date && (
                      <span>
                        📅 {task.date}
                      </span>
                    )}

                    {task.time && (
                      <span>
                        ⏰ {task.time}
                      </span>
                    )}

                  </div>

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems:
                      "center"
                  }}
                >

                  <input
                    type="checkbox"
                    checked={
                      task.completed
                    }
                    onChange={() =>
                      toggleTask(
                        task.id
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      deleteTask(
                        task.id
                      )
                    }
                  >
                    حذف
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

      <div className="section-card">

        <h2>
          🏆 المهام المكتملة
        </h2>

        <div className="tasks-list">

          {completedTasks.length === 0 ? (

            <div className="empty-state">

              <h4>
                لا توجد مهام مكتملة
              </h4>

            </div>

          ) : (

            completedTasks.map(task => (

              <div
                className="task-card"
                key={task.id}
              >

                <div
                  className="task-content"
                >

                  <span
                    className="completed"
                  >
                    {task.title}
                  </span>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </MainLayout>
  );
}
