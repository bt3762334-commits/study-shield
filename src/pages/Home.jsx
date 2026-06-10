import MainLayout from "../layout/MainLayout";
import verse from "../data/quranVerse";

import StatCard from "../components/ui/StatCard";
import ProgressCard from "../components/ui/ProgressCard";

export default function Home() {
  return (
    <MainLayout>
      <section className="hero">
        <h1>🛡️ Study Shield</h1>

        <p>
          نظم دراستك ومهامك اليومية وحقق أهدافك خطوة بخطوة
        </p>
      </section>

      <section className="verse-card">
        <h2>{verse.text}</h2>
        <span>{verse.source}</span>
      </section>

      <section className="stats-grid">
        <StatCard title="المهام اليوم" value="8" />
        <StatCard title="الدروس القادمة" value="3" />
        <StatCard title="المحاضرات" value="2" />
        <StatCard title="الإنجاز" value="80%" />
      </section>

      <ProgressCard />
    </MainLayout>
  );
}
