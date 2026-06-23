import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function WelcomeModal() {
  const { saveName } = useUser();
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    const name = input.trim();
    if (!name) return;
    saveName(name);
    setStep(2);
    setTimeout(() => {}, 100);
  };

  if (step === 2) {
    return (
      <div className="welcome-overlay">
        <div className="welcome-modal welcome-success">
          <div className="welcome-avatar">🛡️</div>
          <h1>مرحباً بك يا <span className="name-highlight">{input}</span>!</h1>
          <p>Study Shield جاهز لمساعدتك على التميز والإنجاز</p>

          <div className="welcome-features">
            <span>✅ تتبع مهامك</span>
            <span>🏆 اكسب إنجازات</span>
            <span>📈 قِس تقدمك</span>
          </div>

          <button className="welcome-btn" onClick={() => {}}>
            لنبدأ 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <div className="welcome-avatar">🛡️</div>
        <h1>أهلاً وسهلاً!</h1>
        <p>ما اسمك؟ عشان نعرف نرحب بيك صح 😊</p>

        <input
          className="welcome-input"
          type="text"
          placeholder="اكتب اسمك هنا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />

        <button
          className="welcome-btn"
          onClick={handleSubmit}
          disabled={!input.trim()}
        >
          ابدأ رحلتك 🚀
        </button>
      </div>
    </div>
  );
}
