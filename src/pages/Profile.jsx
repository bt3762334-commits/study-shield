import MainLayout from "../layout/MainLayout";
import BackButton from "../components/ui/BackButton";

import {
  getXPData
} from "../services/xpSystem";

import {
  getStreak
} from "../services/streakSystem";

import {
  getTasks
} from "../services/taskStorage";

import {
  getLessons
} from "../services/lessonStorage";

import {
  getLectures
} from "../services/lectureStorage";

export default function Profile() {

  const xpData = getXPData();

  const streak = getStreak();

  const tasks =
    getTasks().filter(
      task => task.completed
    ).length;

  const lessons =
    getLessons().filter(
      lesson => lesson.completed
    ).length;

  const lectures =
    getLectures().filter(
      lecture => lecture.completed
    ).length;

  const total =
    tasks +
    lessons +
    lectures;

  return (
    <MainLayout>

      <BackButton />

      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-avatar">
            🛡️
          </div>

          <h1>
            Study Shield User
          </h1>

          <p>
            استمر في الإنجاز يومًا بعد يوم
          </p>

        </div>

        <div className="profile-stats">

          <div className="profile-stat">
            <h2>
              {xpData.xp}
            </h2>
            <span>XP</span>
          </div>

          <div className="profile-stat">
            <h2>
              {xpData.level}
            </h2>
            <span>المستوى</span>
          </div>

          <div className="profile-stat">
            <h2>
              {streak}
            </h2>
            <span>
              Streak 🔥
            </span>
          </div>

          <div className="profile-stat">
            <h2>
              {total}
            </h2>
            <span>
              إجمالي الإنجازات
            </span>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}
