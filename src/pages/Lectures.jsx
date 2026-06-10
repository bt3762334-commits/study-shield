import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

import {
  getLectures,
  saveLectures
} from "../services/lectureStorage";

export default function Lectures() {
  const [title, setTitle] = useState("");
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    setLectures(getLectures());
  }, []);

  const addLecture = () => {
    if (!title.trim()) return;

    const newLecture = {
      id: Date.now(),
      title,
      completed: false
    };

    const updated = [...lectures, newLecture];

    setLectures(updated);
    saveLectures(updated);

    setTitle("");
  };

  const toggleLecture = (id) => {
    const updated = lectures.map((lecture) =>
      lecture.id === id
        ? {
            ...lecture,
            completed: !lecture.completed
          }
        : lecture
    );

    setLectures(updated);
    saveLectures(updated);
  };

  const deleteLecture = (id) => {
    const updated = lectures.filter(
      (lecture) => lecture.id !== id
    );

    setLectures(updated);
    saveLectures(updated);
  };

  return (
    <MainLayout>
      <div className="tasks-page">

        <div className="task-form">

          <input
            type="text"
            placeholder="إضافة محاضرة جديدة"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button onClick={addLecture}>
            إضافة محاضرة
          </button>

        </div>

        <div className="tasks-list">

          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="task-card"
            >
              <div className="task-content">

                <span
                  className={
                    lecture.completed
                      ? "completed"
                      : ""
                  }
                >
                  {lecture.title}
                </span>

              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center"
                }}
              >
                <input
                  type="checkbox"
                  checked={lecture.completed}
                  onChange={() =>
                    toggleLecture(
                      lecture.id
                    )
                  }
                />

                <button
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
          ))}

        </div>

      </div>
    </MainLayout>
  );
}
