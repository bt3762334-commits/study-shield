import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

import {
  getTasks,
  saveTasks
} from "../services/taskStorage";

export default function Tasks() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };

    const updated = [...tasks, newTask];

    setTasks(updated);
    saveTasks(updated);

    setTitle("");
  };

  const toggleTask = (id) => {
    const updated = tasks.map(task =>
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
      task => task.id !== id
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
            placeholder="أضف مهمة جديدة..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button onClick={addTask}>
            إضافة
          </button>

        </div>

        <div className="tasks-list">

          {tasks.map(task => (
            <div
              className="task-card"
              key={task.id}
            >
              <div>

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task.id)
                  }
                />

                <span
                  className={
                    task.completed
                      ? "completed"
                      : ""
                  }
                >
                  {task.title}
                </span>

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
