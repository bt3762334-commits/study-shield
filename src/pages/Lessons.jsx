import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import BackButton from "../components/ui/BackButton";

import {
  getLessons,
  saveLessons
} from "../services/lessonStorage";

import {
  scheduleReminder
} from "../services/notificationService";

export default function Lessons() {

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    setLessons(getLessons());
  }, []);

  const addLesson = () => {

    if (!title.trim()) return;

    const newLesson = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      completed: false
    };

    const updated = [
      ...lessons,
      newLesson
    ];

    setLessons(updated);

    saveLessons(updated);

    if (date && time) {
      scheduleReminder(
        date,
        time,
        `📚 ${title}`,
        `لديك درس: ${description || title}`
      );
    }

    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  const toggleLesson = (id) => {

    const updated = lessons.map(
      lesson =>
        lesson.id === id
          ? {
              ...lesson,
              completed:
                !lesson.completed
            }
          : lesson
    );

    setLessons(updated);

    saveLessons(updated);
  };

  const deleteLesson = (id) => {

    const updated =
      lessons.filter(
        lesson =>
          lesson.id !== id
      );

    setLessons(updated);

    saveLessons(updated);
  };

  const activeLessons =
    lessons.filter(
      lesson =>
        !lesson.completed
    );

  const completedLessons =
    lessons.filter(
      lesson =>
        lesson.completed
    );

  return (
    <MainLayout>

      <BackButton />

      <h1 className="page-title">
        📚 إدارة الدروس
      </h1>

      <div className="task-form">

        <input
          type="text"
          placeholder="عنوان الدرس"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="وصف الدرس"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

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
          type="button"
          onClick={addLesson}
        >
          إضافة درس
        </button>

      </div>

      <div className="section-card">

        <h2>
          📖 الدروس الحالية
        </h2>

        <div className="tasks-list">

          {activeLessons.map(
            lesson => (
              <div
                key={lesson.id}
                className="task-card"
              >
                <div className="task-content">

                  <span>
                    {lesson.title}
                  </span>

                  {lesson.description && (
                    <p>
                      {
                        lesson.description
                      }
                    </p>
                  )}

                  <div className="task-meta">

                    {lesson.date && (
                      <span>
                        📅 {lesson.date}
                      </span>
                    )}

                    {lesson.time && (
                      <span>
                        ⏰ {lesson.time}
                      </span>
                    )}

                  </div>

                </div>

                <div className="task-actions">

                  <input
                    type="checkbox"
                    checked={
                      lesson.completed
                    }
                    onChange={() =>
                      toggleLesson(
                        lesson.id
                      )
                    }
                  />

                  <button
                    type="button"
                    className="delete"
                    onClick={() =>
                      deleteLesson(
                        lesson.id
                      )
                    }
                  >
                    حذف
                  </button>

                </div>
              </div>
            )
          )}

        </div>

      </div>

      <div className="section-card">

        <h2>
          ✅ الدروس المكتملة
        </h2>

        <div className="tasks-list">

          {completedLessons.map(
            lesson => (
              <div
                key={lesson.id}
                className="task-card"
              >
                <div className="task-content">

                  <span className="completed">
                    {lesson.title}
                  </span>

                </div>
              </div>
            )
          )}

        </div>

      </div>

    </MainLayout>
  );
}
