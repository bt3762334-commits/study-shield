import { useEffect } from "react";
import { enableNotifications } from "../../services/notificationService";

export default function NotificationManager() {
  useEffect(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      enableNotifications();

      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js").catch(() => {});
      }
    }
  }, []);

  return null;
}
