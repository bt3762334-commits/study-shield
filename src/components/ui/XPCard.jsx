import { useEffect, useState } from "react";
import { getXPData } from "../../services/xpSystem";
import LevelModal from "./LevelModal";

export default function XPCard() {
  const [data, setData] = useState({ xp: 0, level: "🌱 مبتدئ" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setData(getXPData());
  }, []);

  const xpInLevel = data.xp % 100;
  const nextMilestone =
    data.xp < 100 ? 100 :
    data.xp < 300 ? 300 :
    data.xp < 600 ? 600 :
    data.xp < 1000 ? 1000 : null;

  const progressPct = nextMilestone
    ? Math.min(((data.xp - (nextMilestone - (nextMilestone === 100 ? 100 : nextMilestone === 300 ? 200 : nextMilestone === 600 ? 300 : 400))) / (nextMilestone === 100 ? 100 : nextMilestone === 300 ? 200 : nextMilestone === 600 ? 300 : 400)) * 100, 100)
    : 100;

  return (
    <>
      <div
        className="xp-card xp-card-clickable"
        onClick={() => setShowModal(true)}
        title="اضغط لرسالة تحفيزية"
      >
        <div className="xp-header">
          <h3>مستوى التقدم ✨</h3>
          <span className="xp-level-badge">{data.level}</span>
        </div>

        <div className="xp-numbers">
          <h1>{data.xp} <small>XP</small></h1>
          {nextMilestone && (
            <span className="xp-next">المستوى القادم: {nextMilestone} XP</span>
          )}
        </div>

        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <p className="xp-hint">اضغط لرسالة تحفيزية 💬</p>
      </div>

      {showModal && (
        <LevelModal level={data.level} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
