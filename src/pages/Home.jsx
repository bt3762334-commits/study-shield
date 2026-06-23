import { useUser } from "../context/UserContext";
import { useAnalytics } from "../context/AnalyticsContext";

import StreakCard from "../components/ui/StreakCard";
import BadgeCard from "../components/ui/BadgeCard";
import StatsCard from "../components/ui/StatsCard";
import StudyChart from "../components/charts/StudyChart";
import CertificateCard from "../components/ui/CertificateCard";
import GlassCard from "../components/ui/GlassCard";
import IslamicCard from "../components/ui/IslamicCard";

export default function Home() {
  const { userName, motivation } = useUser();
  const { getStats } = useAnalytics();

  const stats = getStats();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        {userName ? `Welcome back, ${userName} 👋` : "Welcome"}
      </h2>

      <p className="text-gray-500 mb-6">{motivation}</p>

      {/* Islamic */}
      <IslamicCard />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard title="Today" value={`${stats.daily} min`} />
        <StatsCard title="Week" value={`${stats.weekly} min`} />
        <StatsCard title="Month" value={`${stats.monthly} min`} />
      </div>

      {/* Gamification */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StreakCard />
        <BadgeCard />
      </div>

      {/* Chart */}
      <GlassCard>
        <h3 className="mb-2 font-semibold">Study Activity</h3>
        <StudyChart />
      </GlassCard>

      {/* Certificate */}
      <CertificateCard />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <GlassCard>
          <h3 className="font-semibold">Today's Focus</h3>
          <p className="text-sm text-gray-500">
            Stay consistent and complete your tasks.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold">Quick Start</h3>
          <p className="text-sm text-gray-500">
            Jump into your study session now.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
