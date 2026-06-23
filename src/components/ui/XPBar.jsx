import { useGamification } from "../../context/GamificationContext";

export default function XPBar() {
  const { xp, level } = useGamification();

  const nextLevelXP = level * 250;
  const progress = (xp / nextLevelXP) * 100;

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>Level {level}</span>
        <span>{xp} XP</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
