import { useEffect, useState } from "react";
import XPCard from "../components/ui/XPCard";
import StreakCard from "../components/ui/StreakCard";
import QuickActions from "../components/ui/QuickActions";
import NotificationCenter from "../components/ui/NotificationCenter";
import MainLayout from "../layout/MainLayout";
import verse from "../data/quranVerse";
import { getDashboardStats } from "../services/dashboardStats";
import UpcomingTasks from "../components/ui/UpcomingTasks";
import AchievementPreview from "../components/ui/AchievementPreview";
import StatCard from "../components/ui/StatCard";
import ProgressCard from "../components/ui/ProgressCard";

export default function Home() {
  const [stats, setStats] = useState({
    tasks: 0,
    lessons: 0,
    lectures: 0,
    progress: 0
  });

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  return (
    <MainLayout>
<section className="hero">

  <div>

    <h1>
      🛡️ Study Shield
    </h1>

    <p>
      ركز على التقدم وليس الكمال
    </p>

  </div>

  <div className="hero-stats">

    <div>
      <strong>
        {stats.progress}%
      </strong>

      <span>
        نسبة الإنجاز
      </span>
    </div>

  </div>

</section>
      <QuickActions />
      
      <section className="verse-card">
        <h2>{verse.text}</h2>
        <span>{verse.source}</span>
      </section>

      <section className="stats-grid">
        <StatCard
          title="المهام"
          value={stats.tasks}
        />

        <StatCard
          title="الدروس"
          value={stats.lessons}
        />

        <StatCard
          title="المحاضرات"
          value={stats.lectures}
        />

        <StatCard
          title="الإنجاز"
          value={`${stats.progress}%`}
        />
      </section>

      <ProgressCard
        progress={stats.progress}
      />
<XPCard />
      <StreakCard />
      <NotificationCenter />
      
      <section className="dashboard-grid">
        <UpcomingTasks />
        <AchievementPreview />
      </section>

    </MainLayout>
  );
}
