import { useEffect } from "react";

export default function ReminderSystem({ enabled }) {
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Notification.permission === "granted") {
        new Notification("📖 Daily Reminder", {
          body: "Don't forget your study & azkar today!",
        });
      }
    }, 1000 * 60 * 60 * 6); // كل 6 ساعات

    return () => clearInterval(interval);
  }, [enabled]);

  return null;
}
