import GlassCard from "../components/GlassCard";

export default function Tasks() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tasks</h2>

      <GlassCard>
        <p className="text-gray-400">No tasks yet.</p>
      </GlassCard>
    </div>
  );
}
