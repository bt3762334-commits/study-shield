import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { soundService } from "../services/soundService";

export default function Pomodoro() {

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(
    parseInt(localStorage.getItem('pomodoroSessions')) || 0
  );

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            // تشغيل صوت الإنجاز
            soundService.playPomodoro();

            const nextMode = !isBreak;
            setIsBreak(nextMode);

            // حفظ جلسة جديدة إذا انتهت فترة العمل
            if (!nextMode) {
              const newCount = sessionsCompleted + 1;
              setSessionsCompleted(newCount);
              localStorage.setItem('pomodoroSessions', newCount);
            }

            return nextMode ? BREAK_TIME : WORK_TIME;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, isBreak, sessionsCompleted]);

  // اختصارات لوحة المفاتيح
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setRunning(!running);
      } else if (e.code === 'KeyR') {
        resetTimer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [running]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgress = () => {
    const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
    const elapsed = totalTime - seconds;
    return (elapsed / totalTime) * 100;
  };

  const resetTimer = () => {
    setRunning(false);
    setIsBreak(false);
    setSeconds(WORK_TIME);
  };

  const resetSessions = () => {
    setSessionsCompleted(0);
    localStorage.setItem('pomodoroSessions', 0);
  };

  return (
    <MainLayout>
      <h1 className="page-title">🍅 مؤقت بومودورو</h1>

      <div className="pomodoro-card">
        <div className="pomodoro-status">
          {isBreak
            ? "☕ وقت الراحة والاسترخاء"
            : "📚 وقت التركيز والدراسة"}
        </div>

        <div className="pomodoro-timer">{formatTime(seconds)}</div>

        <div className="pomodoro-progress">
          <div
            className="pomodoro-progress-fill"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>

        <div className="pomodoro-controls">
          <button
            className={`pomodoro-btn ${running ? "active" : ""}`}
            onClick={() => setRunning(true)}
            disabled={running}
          >
            ▶ بدء
          </button>

          <button
            className="pomodoro-btn"
            onClick={() => setRunning(false)}
            disabled={!running}
          >
            ⏸ إيقاف
          </button>

          <button className="pomodoro-btn danger" onClick={resetTimer}>
            🔄 إعادة
          </button>
        </div>

        <p className="pomodoro-status" style={{ fontSize: "13px", marginTop: "16px" }}>
          استخدم المسافة للتشغيل/الإيقاف أو R لإعادة التعيين
        </p>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>جلسات مكتملة</h3>
          <p style={{ fontSize: "32px", fontWeight: "700", color: "var(--primary)", marginBottom: "16px" }}>
            {sessionsCompleted}
          </p>

          <div className="pomodoro-sessions">
            {Array.from({ length: Math.min(sessionsCompleted, 12) }).map((_, i) => (
              <div key={i} className="pomodoro-session completed">
                ✓
              </div>
            ))}
            {sessionsCompleted === 0 && (
              <div style={{ gridColumn: "1 / -1", color: "var(--muted)", fontSize: "14px", padding: "16px" }}>
                ابدأ جلسة لتتبع تقدمك
              </div>
            )}
          </div>

          {sessionsCompleted > 0 && (
            <button
              className="pomodoro-btn danger"
              onClick={resetSessions}
              style={{ marginTop: "16px", width: "100%" }}
            >
              مسح السجل
            </button>
          )}
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "16px",
            background: "rgba(255,255,255,.05)",
            borderRadius: "16px",
            fontSize: "14px",
            color: "var(--muted)"
          }}
        >
          <h4 style={{ marginBottom: "12px", color: "var(--text)" }}>نصائح بومودورو:</h4>
          <ul style={{ textAlign: "right", listStylePosition: "inside" }}>
            <li>ركز بدون تشتيت خلال فترة العمل (25 دقيقة)</li>
            <li>استخدم فترة الراحة للاسترخاء والحركة</li>
            <li>بعد 4 جلسات، خذ فترة راحة أطول (15-30 دقيقة)</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
