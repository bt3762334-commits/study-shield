import { useState, useEffect } from "react";
import {
  getDailyVerse,
  getDailyHadith,
  getDailyContent,
  getTimeOfDay
} from "../../data/dailyContent";

export default function DailyContent() {
  const [dailyContent, setDailyContent] = useState(null);
  const [verse, setVerse] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState("morning");

  useEffect(() => {
    const updateContent = () => {
      setVerse(getDailyVerse());
      setDailyContent(getDailyContent());
      setTimeOfDay(getTimeOfDay());
    };

    updateContent();

    const interval = setInterval(updateContent, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (!verse || !dailyContent) {
    return null;
  }

  return (
    <div className="daily-content-wrapper">
      <div className="daily-card quranic-verse">
        <div className="card-header">
          <span className="emoji">📖</span>
          <h3>آية اليوم</h3>
        </div>

        <div className="card-body">
          <p className="verse-text">﴿ {verse.text} ﴾</p>

          <div className="verse-meta">
            <span className="surah">{verse.surah}</span>
            <span className="ayah">الآية {verse.ayah}</span>
          </div>

          <p className="verse-meaning">{verse.meaning}</p>
        </div>
      </div>

      {dailyContent.type === "azkar" ? (
        <div className="daily-card azkar-card">
          <div className="card-header">
            <span className="emoji">{dailyContent.emoji}</span>
            <h3>{dailyContent.title}</h3>
          </div>

          <div className="card-body">
            <p className="azkar-text">{dailyContent.content.text}</p>

            <div className="azkar-meta">
              <span className="category">
                {dailyContent.content.category}
              </span>

              {dailyContent.content.count > 1 && (
                <span className="count">
                  ✋ {dailyContent.content.count} مرات
                </span>
              )}
            </div>

            <p className="azkar-tip">
              {timeOfDay === "morning"
                ? "اقرأ أذكار الصباح لحماية يومك"
                : "اقرأ أذكار المساء لحماية ليلك"}
            </p>
          </div>
        </div>
      ) : (
        <div className="daily-card hadith-card">
          <div className="card-header">
            <span className="emoji">📚</span>
            <h3>حديث اليوم</h3>
          </div>

          <div className="card-body">
            <p className="hadith-text">"{dailyContent.content.text}"</p>

            <div className="hadith-meta">
              <span className="narrator">
                رواه {dailyContent.content.narrator}
              </span>
            </div>

            <p className="hadith-meaning">
              {dailyContent.content.meaning}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
