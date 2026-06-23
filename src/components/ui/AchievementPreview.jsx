import { getTasks } from "../../services/taskStorage";
import { getLectures } from "../../services/lectureStorage";
import { getXPData } from "../../services/xpSystem";

const achievements = [
  { icon: "🌱", title: "أول خطوة",  threshold: 1  },
  { icon: "🥉", title: "5 إنجازات", threshold: 5  },
  { icon: "🥈", title: "10 إنجازات", threshold: 10 },
  { icon: "🥇", title: "25 إنجاز",  threshold: 25 },
  { icon: "💎", title: "50 إنجاز",  threshold: 50 },
  { icon: "🏆", title: "100 إنجاز", threshold: 100 },
];

export default function AchievementPreview() {
  const completedTasks = getTasks().filter((t) => t.completed).length;
  const completedLectures = getLectures().filter((l) => l.completed).length;

  const total = completedTasks + completedLectures;
  const { xp } = getXPData();

  const xpProgress = Math.min(xp % 100, 100);

  return (
    <div className="dashboard-card">
      <h3>🏆 الإنجازات الأخيرة</h3>

      <div className="achievement-preview-grid">
        {achievements.map((a, i) => {
          const unlocked = total >= a.threshold;

          return (
            <div
              key={i}
              className={`achievement-preview-item ${unlocked ? "unlocked" : ""}`}
            >
              <span className="achievement-preview-icon">{a.icon}</span>
              <span className="achievement-preview-title">{a.title}</span>
            </div>
          );
        })}
      </div>

      <div className="xp-mini-bar">
        <span className="xp-mini-label">{xp} XP</span>

        <div className="xp-mini-track">
          <div
            className="xp-mini-fill"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
