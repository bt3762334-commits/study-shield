import { useEffect, useState } from "react";
import XPCard from "../components/ui/XPCard";
import StreakCard from "../components/ui/StreakCard";
import QuickActions from "../components/ui/QuickActions";
import NotificationCenter from "../components/ui/NotificationCenter";
import MainLayout from "../layout/MainLayout";
import { getDashboardStats } from "../services/dashboardStats";
import UpcomingTasks from "../components/ui/UpcomingTasks";
import AchievementPreview from "../components/ui/AchievementPreview";
import StatCard from "../components/ui/StatCard";
import ProgressCard from "../components/ui/ProgressCard";
import DailyContent from "../components/ui/DailyContent";
import { useUser } from "../context/UserContext";
import { getXPData } from "../services/xpSystem";
import LevelModal from "../components/ui/LevelModal";

export default function Home() {
  const { userName } = useUser();
  const [stats, setStats] = useState({ tasks: 0, lessons: 0, lectures: 0, progress: 0 });
  const [showLevelModal, setShowLevelModal] = useState(false);
  const { level } = getXPData();

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "صباح الخير";
    if (h < 17) return "مساء الخير";
    return "مساء النور";
  };

  return (
    <MainLayout>
      {/* ---- Hero ---- */}
      <section className="hero">
        <div>
          <h1>
            {getGreeting()}{userName ? `, ${userName}` : ""} 🛡️
          </h1>
          <p>ركز على التقدم وليس الكمال</p>
          {level && (
            <button
              className="hero-level-btn"
              onClick={() => setShowLevelModal(true)}
            >
              {level} — رسالة تحفيز 💬
            </button>
          )}
        </div>
        <div className="hero-stats">
          <strong>{stats.progress}%</strong>
          <span>نسبة الإنجاز</span>
        </div>
      </section>

      {/* ---- إجراءات سريعة ---- */}
      <QuickActions />

      {/* ---- محتوى يومي ---- */}
      <DailyContent />

      {/* ---- إحصائيات ---- */}
      <section className="stats-grid">
        <StatCard title="المهام"      value={stats.tasks} />
        <StatCard title="الدروس"      value={stats.lessons} />
        <StatCard title="المحاضرات"   value={stats.lectures} />
        <StatCard title="الإنجاز"     value={`${stats.progress}%`} />
      </section>

      <ProgressCard progress={stats.progress} />
      <XPCard />
      <StreakCard />
      <NotificationCenter />

      <section className="dashboard-grid">
        <UpcomingTasks />
        <AchievementPreview />
      </section>

      {showLevelModal && (
        <LevelModal level={level} onClose={() => setShowLevelModal(false)} />
      )}
    </MainLayout>
  );
}