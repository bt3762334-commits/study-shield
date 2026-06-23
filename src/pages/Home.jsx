import GlassCard from "../components/GlassCard";

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Study smarter. Not harder.
        </h1>

        <p className="text-gray-400 mt-2">
          Your productivity system in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <GlassCard>
          <h3>Today</h3>
          <p className="text-2xl font-bold">120 min</p>
        </GlassCard>

        <GlassCard>
          <h3>Tasks</h3>
          <p className="text-2xl font-bold">5 done</p>
        </GlassCard>

        <GlassCard>
          <h3>Streak</h3>
          <p className="text-2xl font-bold">7 days 🔥</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold mb-2">Start Focus</h3>
          <p className="text-sm text-gray-400">
            Launch Pomodoro session instantly.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold mb-2">Add Task</h3>
          <p className="text-sm text-gray-400">
            Plan your next study goal.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
