import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { getTasks } from "../services/taskStorage";
import { getLessons } from "../services/lessonStorage";
import { getLectures } from "../services/lectureStorage";
import { getXPData } from "../services/xpSystem";
import { useUser } from "../context/UserContext";
import { generateCertificate } from "../services/certificateService";
import LevelModal from "../components/ui/LevelModal";

const achievementsList = [
  { icon: "🌱", title: "أول خطوة", desc: "أنجز عملاً واحداً", threshold: 1, message: "بداية عظيمة! كل رحلة تبدأ بخطوة." },
  { icon: "🥉", title: "5 إنجازات", desc: "أنجز 5 أعمال", threshold: 5, message: "5 إنجازات! العادة بدأت تتشكل 💪" },
  { icon: "🥈", title: "10 إنجازات", desc: "أنجز 10 أعمال", threshold: 10, message: "10! نصف الطريق للذهب، واصل! 🔥" },
  { icon: "🥇", title: "25 إنجاز", desc: "أنجز 25 عملاً", threshold: 25, message: "25 إنجاز! أنت تُقاتل بجد 🌟" },
  { icon: "💎", title: "50 إنجاز", desc: "أنجز 50 عملاً", threshold: 50, message: "50! هذا مستوى الأبطال الحقيقيين 💎" },
  { icon: "🏆", title: "100 إنجاز", desc: "أنجز 100 عمل", threshold: 100, message: "100 إنجاز!! أسطورة Study Shield! 🏆" },
  { icon: "⚡", title: "100 XP", desc: "اجمع 100 نقطة خبرة", threshold: 100, xpBased: true, message: "البرونز في متناول يدك! 🥉" },
  { icon: "🌟", title: "500 XP", desc: "اجمع 500 نقطة خبرة", threshold: 500, xpBased: true, message: "500 XP! قريب من الذهب 🥇" },
  { icon: "🚀", title: "1000 XP", desc: "اجمع 1000 نقطة خبرة", threshold: 1000, xpBased: true, message: "أسطوري! الـ1000 XP وصلت 🚀" },
];

export default function Achievements() {
  const { userName } = useUser();
  const { xp, level } = getXPData();

  const [activeMsg, setActiveMsg] = useState(null);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [certImg, setCertImg] = useState(null);

  const completedTasks = getTasks().filter(t => t.completed).length;
  const completedLessons = getLessons().filter(l => l.completed).length;
  const completedLectures = getLectures().filter(l => l.completed).length;
  const total = completedTasks + completedLessons + completedLectures;

  const isUnlocked = (a) =>
    a.xpBased ? xp >= a.threshold : total >= a.threshold;

  const handleCertificate = () => {
    const img = generateCertificate(userName || "بطل", xp, level);
    setCertImg(img);
  };

  const downloadCert = () => {
    const a = document.createElement("a");
    a.href = certImg;
    a.download = `study-shield-certificate-${userName || "user"}.png`;
    a.click();
  };

  return (
    <MainLayout>
      <h1 className="page-title">🏆 الإنجازات</h1>

      <div className="achievements-summary">
        <div className="achievements-summary-stat">
          <strong>{total}</strong>
          <span>إجمالي الإنجازات</span>
        </div>

        <div className="achievements-summary-stat">
          <strong>{xp}</strong>
          <span>نقاط XP</span>
        </div>

        <div
          className="achievements-summary-stat level-clickable"
          onClick={() => setShowLevelModal(true)}
        >
          <strong>{level}</strong>
          <span>مستواك — اضغط 💬</span>
        </div>
      </div>

      <div className="achievement-grid">
        {achievementsList.map((a, i) => {
          const unlocked = isUnlocked(a);

          return (
            <div
              key={i}
              className={`achievement-card ${unlocked ? "unlocked" : ""}`}
              onClick={() => unlocked && setActiveMsg(a.message)}
              style={{ cursor: unlocked ? "pointer" : "default" }}
            >
              <div className="achievement-icon">{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <p>{unlocked ? "✅ تم فتحه" : "🔒 لم يُفتح بعد"}</p>
            </div>
          );
        })}
      </div>

      {xp >= 100 && (
        <div className="certificate-section">
          <h2>🎓 شهادتك الإلكترونية</h2>
          <p>حققت {xp} XP</p>

          <button onClick={handleCertificate}>
            🎓 استخرج شهادتي
          </button>

          {certImg && (
            <div>
              <img src={certImg} alt="certificate" />
              <button onClick={downloadCert}>
                تحميل
              </button>
            </div>
          )}
        </div>
      )}

      {activeMsg && (
        <div onClick={() => setActiveMsg(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <p>{activeMsg}</p>
            <button onClick={() => setActiveMsg(null)}>
              رائع
            </button>
          </div>
        </div>
      )}

      {showLevelModal && (
        <LevelModal level={level} onClose={() => setShowLevelModal(false)} />
      )}
    </MainLayout>
  );
}
