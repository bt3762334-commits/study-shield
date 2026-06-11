import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { themeService } from "../services/themeService";
import { soundService } from "../services/soundService";

export default function Header() {

  const today = new Date().toLocaleDateString(
    "ar-EG",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );

  const [theme, setTheme] = useState(themeService.getCurrentTheme());
  const [soundEnabled, setSoundEnabled] = useState(soundService.isEnabled);

  const handleThemeToggle = () => {
    const newTheme = themeService.toggleTheme();
    setTheme(newTheme);
  };

  const handleSoundToggle = () => {
    const newState = soundService.toggle();
    setSoundEnabled(newState);
    soundService.playSuccess();
  };

  return (
    <header className="header">

      <div>
        <h1>مرحبًا بك 👋</h1>
        <p>{today}</p>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          className="theme-toggle"
          onClick={handleThemeToggle}
          title={theme === "dark" ? "وضع فاتح" : "وضع داكن"}
        >
          <span className="theme-toggle-icon">
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
        </button>

        <button
          className={`sound-toggle ${soundEnabled ? "enabled" : "muted"}`}
          onClick={handleSoundToggle}
          title={soundEnabled ? "كتم الصوت" : "تفعيل الصوت"}
        >
          <span className="sound-toggle-icon">
            {soundEnabled ? "🔊" : "🔇"}
          </span>
        </button>

        <button className="mobile-menu-btn">
          <Menu size={22} />
        </button>
      </div>

    </header>
  );
}
