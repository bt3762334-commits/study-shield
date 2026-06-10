import MainLayout from "../layout/MainLayout";

import { getTasks } from "../services/taskStorage";
import { getLessons } from "../services/lessonStorage";
import { getLectures } from "../services/lectureStorage";

export default function Achievements() {
  const completedTasks =
    getTasks().filter(
      task => task.completed
    ).length;

  const completedLessons =
    getLessons().filter(
      lesson => lesson.completed
    ).length;

  const completedLectures =
    getLectures().filter(
      lecture => lecture.completed
    ).length;

  const total =
    completedTasks +
    completedLessons +
    completedLectures;

  const achievements = [
    {
      icon: "🌱",
      title: "أول خطوة",
      unlocked: total >= 1
    },
    {
      icon: "🥉",
      title: "5 إنجازات",
      unlocked: total >= 5
    },
    {
      icon: "🥈",
      title: "10 إنجازات",
      unlocked: total >= 10
    },
    {
      icon: "🥇",
      title: "25 إنجاز",
      unlocked: total >= 25
    },
    {
      icon: "💎",
      title: "50 إنجاز",
      unlocked: total >= 50
    }
  ];

  return (
    <MainLayout>

      <h1 className="page-title">
        🏆 الإنجازات
      </h1>

      <div className="achievement-grid">

        {achievements.map(
          (achievement, index) => (
            <div
              key={index}
              className={
                achievement.unlocked
                  ? "achievement-card unlocked"
                  : "achievement-card"
              }
            >
              <div className="achievement-icon">
                {achievement.icon}
              </div>

              <h3>
                {achievement.title}
              </h3>

              <p>
                {achievement.unlocked
                  ? "تم فتح الوسام"
                  : "لم يتم فتحه بعد"}
              </p>
            </div>
          )
        )}

      </div>

    </MainLayout>
  );
}
