import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

import {
  getTasks,
  saveTasks
} from "../services/taskStorage";

export default function Tasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
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

    const updated = [...tasks, newTask];

    setTasks(updated);
    saveTasks(updated);

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDate("");
    setTime("");
  };

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed
          }
        : task
    );

    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <MainLayout>
      <div className="tasks-page">

        <div className="task-form">

          <input
            type="text"
            placeholder="عنوان المهمة"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="وصف المهمة (اختياري)"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
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
              setDate(e.target.value)
            }
          />

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          />

          <button onClick={addTask}>
            إضافة المهمة
          </button>

        </div>

        <div className="tasks-list">

          {tasks.map((task) => (
            <div
              className="task-card"
              key={task.id}
            >
              <div className="task-content">

                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      toggleTask(task.id)
                    }
                  />
                </div>

                <span
                  className={
                    task.completed
                      ? "completed"
                      : ""
                  }
                >
                  {task.title}
                </span>

                {task.description && (
                  <p>{task.description}</p>
                )}

                <div className="task-meta">

                  <span
                    className={`priority ${task.priority}`}
                  >
                    {task.priority === "high"
                      ? "عالية"
                      : task.priority === "medium"
                      ? "متوسطة"
                      : "منخفضة"}
                  </span>

                  {task.date && (
                    <span>{task.date}</span>
                  )}

                  {task.time && (
                    <span>{task.time}</span>
                  )}

                </div>

              </div>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
              >
                حذف
              </button>
            </div>
          ))}

        </div>

      </div>
    </MainLayout>
  );
}
