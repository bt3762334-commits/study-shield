import MainLayout from "../layout/MainLayout";

import { getXPData } from "../services/xpSystem";
import { getStreak } from "../services/streakSystem";

export default function Profile() {

  const xpData = getXPData();
  const streak = getStreak();

  return (
    <MainLayout>

      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-avatar">
            🛡️
          </div>

          <h1>Study Shield User</h1>

          <p>
            استمر في الإنجاز يومًا بعد يوم
          </p>

        </div>

        <div className="profile-stats">

          <div className="profile-stat">
            <h2>{xpData.xp}</h2>
            <span>XP</span>
          </div>

          <div className="profile-stat">
            <h2>{xpData.level}</h2>
            <span>المستوى</span>
          </div>

          <div className="profile-stat">
            <h2>{streak}</h2>
            <span>Streak 🔥</span>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}
