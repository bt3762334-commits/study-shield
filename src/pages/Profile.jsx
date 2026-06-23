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

  const tasks = getTasks().filter(t => t.completed).length;
  const lectures = getLectures().filter(l => l.completed).length;
  const total = tasks + lectures;

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [showModal, setShowModal] = useState(false);
  const [certImg, setCertImg] = useState(null);

  const saveName_ = () => {
    if (nameInput.trim()) {
      saveName(nameInput.trim());
      setEditing(false);
    }
  };

  const handleCert = () => {
    const img = generateCertificate(userName || "بطل", xpData.xp, xpData.level);
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

        <div className="profile-card">
          <div className="profile-avatar">🛡️</div>

          {editing ? (
            <>
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />

              <button onClick={saveName_}>حفظ</button>
              <button onClick={() => setEditing(false)}>إلغاء</button>
            </>
          ) : (
            <>
              <h1>{userName || "مستخدم"}</h1>
              <button onClick={() => setEditing(true)}>
                تعديل
              </button>
            </>
          )}

          <p onClick={() => setShowModal(true)}>
            {xpData.level} — رسالة 💬
          </p>
        </div>

        <div className="profile-stats">
          <div>{xpData.xp} XP</div>
          <div>{streak} Streak</div>
          <div>{total} Total</div>
          <div>{tasks} Tasks</div>
          <div>{lectures} Lectures</div>
        </div>

        {xpData.xp >= 100 && (
          <div>
            <h2>🎓 شهادة</h2>

            <button onClick={handleCert}>
              إنشاء
            </button>

            {certImg && (
              <>
                <img src={certImg} alt="cert" />
                <button onClick={downloadCert}>
                  تحميل
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <LevelModal level={xpData.level} onClose={() => setShowModal(false)} />
      )}
    </MainLayout>
  );
}
