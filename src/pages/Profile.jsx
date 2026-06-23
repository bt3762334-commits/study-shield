import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import BackButton from "../components/ui/BackButton";
import { getXPData } from "../services/xpSystem";
import { getStreak } from "../services/streakSystem";
import { getTasks } from "../services/taskStorage";
import { getLectures } from "../services/lectureStorage";
import { useUser } from "../context/UserContext";
import { generateCertificate } from "../services/certificateService";
import LevelModal from "../components/ui/LevelModal";

export default function Profile() {
  const { userName, saveName } = useUser();

  const xpData = getXPData();
  const streak = getStreak();

  const tasks = getTasks().filter((t) => t.completed).length;
  const lectures = getLectures().filter((l) => l.completed).length;
  const total = tasks + lectures;

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [showModal, setShowModal] = useState(false);
  const [certImg, setCertImg] = useState(null);

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    saveName(nameInput.trim());
    setEditing(false);
  };

  const handleCert = () => {
    const img = generateCertificate(
      userName || "بطل",
      xpData.xp,
      xpData.level
    );
    setCertImg(img);
  };

  const downloadCert = () => {
    const a = document.createElement("a");
    a.href = certImg;
    a.download = `certificate-${userName}.png`;
    a.click();
  };

  return (
    <MainLayout>
      <BackButton />

      <div className="profile-page">

        {/* PROFILE CARD */}
        <div className="profile-card">

          <div className="profile-avatar">
            {userName ? userName.charAt(0).toUpperCase() : "🛡️"}
          </div>

          {editing ? (
            <div className="profile-name-edit">

              <input
                className="profile-name-input"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSaveName()
                }
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleSaveName} className="profile-save-btn">
                  حفظ
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="profile-cancel-btn"
                >
                  إلغاء
                </button>
              </div>

            </div>
          ) : (
            <>
              <h1>{userName || "مستخدم Study Shield"}</h1>

              <button
                className="profile-edit-btn"
                onClick={() => setEditing(true)}
              >
                ✏️ تعديل الاسم
              </button>
            </>
          )}

          <p
            className="profile-level-clickable"
            onClick={() => setShowModal(true)}
          >
            <span>{xpData.level}</span>
            <span> — اضغط لرسالة تحفيزية 💬</span>
          </p>
        </div>

        {/* STATS */}
        <div className="profile-stats">

          <div className="profile-stat">
            <h2>{xpData.xp}</h2>
            <span>نقاط XP ⭐</span>
          </div>

          <div className="profile-stat">
            <h2>{streak}</h2>
            <span>Streak 🔥</span>
          </div>

          <div className="profile-stat">
            <h2>{total}</h2>
            <span>إجمالي الإنجازات 🏆</span>
          </div>

          <div className="profile-stat">
            <h2>{tasks}</h2>
            <span>مهام مكتملة ✅</span>
          </div>

          <div className="profile-stat">
            <h2>{lectures}</h2>
            <span>محاضرات مكتملة 🎓</span>
          </div>

        </div>

        {/* CERTIFICATE */}
        {xpData.xp >= 100 && (
          <div className="certificate-section">
            <h2>🎓 شهادتك الإلكترونية</h2>

            <p>أنت وصلت لـ {xpData.xp} XP — استخرج شهادتك!</p>

            <button className="cert-btn" onClick={handleCert}>
              🎓 إنشاء الشهادة
            </button>

            {certImg && (
              <div className="cert-preview">
                <img src={certImg} alt="شهادة إنجاز" />

                <button
                  className="cert-download-btn"
                  onClick={downloadCert}
                >
                  ⬇️ تحميل الشهادة
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {showModal && (
        <LevelModal
          level={xpData.level}
          onClose={() => setShowModal(false)}
        />
      )}
    </MainLayout>
  );
}
