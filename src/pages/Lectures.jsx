import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import BackButton from "../components/ui/BackButton";

import {
  getLectures,
  saveLectures
} from "../services/lectureStorage";

export default function Lectures() {

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [lectures, setLectures] =
    useState([]);

  useEffect(() => {
    setLectures(
      getLectures()
    );
  }, []);

  const addLecture = () => {

    if (!title.trim()) return;

    const newLecture = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      completed: false
    };

    const updated = [
      ...lectures,
      newLecture
    ];

    setLectures(updated);

    saveLectures(updated);

    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  const toggleLecture = (id) => {

    const updated =
      lectures.map(
        lecture =>
          lecture.id === id
            ? {
                ...lecture,
                completed:
                  !lecture.completed
              }
            : lecture
      );

    setLectures(updated);

    saveLectures(updated);
  };

  const deleteLecture = (id) => {

    const updated =
      lectures.filter(
        lecture =>
          lecture.id !== id
      );

    setLectures(updated);

    saveLectures(updated);
  };

  const activeLectures =
    lectures.filter(
      lecture =>
        !lecture.completed
    );

  const completedLectures =
    lectures.filter(
      lecture =>
        lecture.completed
    );

  return (
    <MainLayout>

      <BackButton />

      <h1 className="page-title">
        🎓 إدارة المحاضرات
      </h1>

      <div className="task-form">

        <input
          type="text"
          placeholder="عنوان المحاضرة"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="وصف المحاضرة"
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
          onClick={addLecture}
        >
          إضافة محاضرة
        </button>

      </div>

      <div className="section-card">

        <h2>
          🎯 المحاضرات القادمة
        </h2>

        <div className="tasks-list">

          {activeLectures.map(
            lecture => (
              <div
                key={lecture.id}
                className="task-card"
              >
                <div className="task-content">

                  <span>
                    {lecture.title}
                  </span>

                  {lecture.description && (
                    <p>
                      {
                        lecture.description
                      }
                    </p>
                  )}

                  <div className="task-meta">

                    {lecture.date && (
                      <span>
                        📅 {lecture.date}
                      </span>
                    )}

                    {lecture.time && (
                      <span>
                        ⏰ {lecture.time}
                      </span>
                    )}

                  </div>

                </div>

                <div className="task-actions">

                  <input
                    type="checkbox"
                    checked={
                      lecture.completed
                    }
                    onChange={() =>
                      toggleLecture(
                        lecture.id
                      )
                    }
                  />

                  <button
                    type="button"
                    className="delete"
                    onClick={() =>
                      deleteLecture(
                        lecture.id
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
          ✅ المحاضرات المكتملة
        </h2>

        <div className="tasks-list">

          {completedLectures.map(
            lecture => (
              <div
                key={lecture.id}
                className="task-card"
              >
                <div className="task-content">

                  <span className="completed">
                    {lecture.title}
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
