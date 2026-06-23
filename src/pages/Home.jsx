/* =============================================
   HOME PAGE
   ============================================= */

import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

/* UI COMPONENTS */
import XPCard from "../components/ui/XPCard";
import StreakCard from "../components/ui/StreakCard";
import QuickActions from "../components/ui/QuickActions";
import NotificationCenter from "../components/ui/NotificationCenter";
import UpcomingTasks from "../components/ui/UpcomingTasks";
import AchievementPreview from "../components/ui/AchievementPreview";
import StatCard from "../components/ui/StatCard";
import ProgressCard from "../components/ui/ProgressCard";
import DailyContent from "../components/ui/DailyContent";
import LevelModal from "../components/ui/LevelModal";

/* SERVICES */
import { getDashboardStats } from "../services/dashboardStats";
import { getXPData } from "../services/xpSystem";

/* CONTEXT */
import { useUser } from "../context/UserContext";

/* =============================================
   COMPONENT
   ============================================= */

export default function Home() {
  const { userName } = useUser();

  const [stats, setStats] = useState({
    tasks: 0,
    lectures: 0,
    progress: 0
  });

  const [showLevelModal, setShowLevelModal] = useState(false);
  const { level } = getXPData();

  /* LOAD STATS */
  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  /* GREETING SYSTEM */
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "صباح الخير";
    if (h < 17) return "مساء الخير";
    return "مساء النور";
  };

  /* =============================================
     RENDER
     ============================================= */

  return (
    <MainLayout>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">

          <h1>
            {getGreeting()}
            {userName ? `، ${userName}` : ""} 🛡️
          </h1>

          <p>ركز على التقدم وليس الكمال</p>

          {level && (
            <button
              className="hero-level-btn"
              onClick={() => setShowLevelModal(true)}
            >
              <span>⭐</span>
              <span>{level} — رسالة تحفيز</span>
            </button>
          )}

        </div>

        <div className="hero-stats">
          <strong>{stats.progress}%</strong>
          <span>نسبة الإنجاز</span>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <QuickActions />

      {/* DAILY CONTENT */}
      <DailyContent />

      {/* STATS */}
      <section className="stats-grid">
        <StatCard title="المهام" value={stats.tasks} icon="✅" color="blue" />
        <StatCard title="المحاضرات" value={stats.lectures} icon="🎓" color="purple" />
        <StatCard title="الإنجاز" value={`${stats.progress}%`} icon="📈" color="green" />
      </section>

      {/* CARDS */}
      <ProgressCard progress={stats.progress} />
      <XPCard />
      <StreakCard />
      <NotificationCenter />

      {/* DASHBOARD GRID */}
      <section className="dashboard-grid">
        <UpcomingTasks />
        <AchievementPreview />
      </section>

      {/* LEVEL MODAL */}
      {showLevelModal && (
        <LevelModal
          level={level}
          onClose={() => setShowLevelModal(false)}
        />
      )}

    </MainLayout>
  );
}
