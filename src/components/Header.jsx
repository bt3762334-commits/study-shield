import { useState, useEffect } from "react";
import { themeService } from "../services/themeService";
import { soundService } from "../services/soundService";
import { useUser } from "../context/UserContext";
import {
  requestNotificationPermission,
  enableNotifications,
} from "../services/notificationService";

export default function Header() {
  const { userName } = useUser();
  const [theme, setTheme] = useState(themeService.getCurrentTheme());
  const [soundEnabled, setSoundEnabled] = useState(soundService.isEnabled);
  const [notifPermission, setNotifPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem("notifBannerDismissed") === "true"
  );

  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // تحية حسب الوقت
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "صباح الخير";
    if (h < 17) return "مساء الخير";
    return "مساء النور";
  };

  const handleThemeToggle = () => {
    const newTheme = themeService.toggleTheme();
    setTheme(newTheme);
  };

  const handleSoundToggle = () => {
    const newState = soundService.toggle();
    setSoundEnabled(newState);
    soundService.playSuccess();
  };

  const handleEnableNotif = async () => {
    const ok = await requestNotificationPermission();
    if (ok) {
      setNotifPermission("granted");
      enableNotifications();
      soundService.playSuccess();
      setBannerDismissed(true);
      localStorage.setItem("notifBannerDismissed", "true");
    }
  };

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem("notifBannerDismissed", "true");
  };

  const showBanner = notifPermission !== "granted" && !bannerDismissed;

  return (
    <>
      {/* ---- شريط تفعيل الإشعارات في الأعلى ---- */}
      {showBanner && (
        <div className="notif-top-banner">
          <span className="notif-banner-icon">🔔</span>
          <div className="notif-banner-text">
            <strong>فعّل الإشعارات</strong>
            <span> لتصلك تنبيهات مهامك ودروسك في الوقت الصح</span>
          </div>
          <div className="notif-banner-actions">
            <button className="notif-enable-btn" onClick={handleEnableNotif}>
              تفعيل الآن
            </button>
            <button className="notif-dismiss-btn" onClick={handleDismissBanner}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ---- الهيدر الرئيسي ---- */}
      <header className="header">
        <div>
          <h1>
            {getGreeting()}
            {userName ? (
              <>
                {" "}يا <span className="header-username">{userName}</span> 👋
              </>
            ) : (
              " 👋"
            )}
          </h1>
          <p>{today}</p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
        </div>
      </header>
    </>
  );
}