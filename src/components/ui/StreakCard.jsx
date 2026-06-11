import { useEffect, useState } from "react";

import {
  getStreak
} from "../../services/streakSystem";

export default function StreakCard() {
  const [streak, setStreak] =
    useState(0);

  useEffect(() => {
    setStreak(getStreak());
  }, []);

  return (
    <div className="streak-card">

      <div className="streak-icon">
        🔥
      </div>

      <h3>
        {streak} يوم متواصل
      </h3>

      <p>
        استمر في الإنجاز يوميًا
      </p>

    </div>
  );
}
