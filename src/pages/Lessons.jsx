import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

import {
  getLessons,
  saveLessons
} from "../services/lessonStorage";

export default function Lessons() {
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    setLessons(getLessons());
  }, []);

  const addLesson = () => {
    if (!title.trim()) return;

    const newLesson = {
      id: Date.now(),
      title,
      completed: false
    };

    const updated = [...lessons, newLesson];

    setLessons(updated);
    saveLessons(updated);

    setTitle("");
  };

  const toggleLesson = (id) => {
    const updated = lessons.map((lesson) =>
      lesson.id === id
        ? {
            ...lesson,
            completed: !lesson.completed
          }
        : lesson
    );

    setLessons(updated);
    saveLessons(updated);
  };

  return (
    <MainLayout>
      <div className="tasks-page">

        <div className="task-form">

          <input
            type="text"
            placeholder="إضافة درس جديد"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button onClick={addLesson}>
            إضافة درس
          </button>

        </div>

        <div className="tasks-list">

          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="task-card"
            >
              <span
                className={
                  lesson.completed
                    ? "completed"
                    : ""
                }
              >
                {lesson.title}
              </span>

              <input
                type="checkbox"
                checked={lesson.completed}
                onChange={() =>
                  toggleLesson(
                    lesson.id
                  )
                }
              />
            </div>
          ))}

        </div>
      </div>
    </MainLayout>
  );
}
