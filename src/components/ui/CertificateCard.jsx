import { useUser } from "../../context/UserContext";
import { useGamification } from "../../context/GamificationContext";
import { generateCertificate } from "../../utils/certificateGenerator";

export default function CertificateCard() {
  const { userName } = useUser();
  const { xp } = useGamification();

  const getTier = () => {
    if (xp >= 1000) return 3;
    if (xp >= 300) return 2;
    if (xp >= 100) return 1;
    return 0;
  };

  const tier = getTier();

  if (tier === 0) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="font-semibold mb-2">🎓 Your Certificate</h3>

      <p className="text-sm text-gray-500 mb-4">
        You unlocked Tier {tier} certificate
      </p>

      <button
        onClick={() =>
          generateCertificate({ name: userName || "Student", tier })
        }
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Certificate
      </button>
    </div>
  );
}
