import { useIslamic } from "../../context/IslamicContext";

export default function IslamicCard() {
  const { verse, hadith } = useIslamic();

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="font-semibold mb-2">🌙 Daily Inspiration</h3>

      {verse && (
        <div className="mb-3">
          <p className="text-sm italic">"{verse.text}"</p>
          <span className="text-xs text-gray-500">{verse.ref}</span>
        </div>
      )}

      {hadith && (
        <div>
          <p className="text-sm italic">"{hadith.text}"</p>
          <span className="text-xs text-gray-500">{hadith.ref}</span>
        </div>
      )}
    </div>
  );
}
