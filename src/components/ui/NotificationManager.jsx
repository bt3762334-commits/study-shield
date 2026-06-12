import { useEffect } from "react";
import {
  requestNotificationPermission,
  enableNotifications,
} from "../../services/notificationService";
import { soundService } from "../../services/soundService";

// هذا الكومبوننت بس بيتحقق من الإشعارات في الخلفية
// البانر اتنقل للهيدر عشان يكون أكثر وضوحاً
export default function NotificationManager() {
  useEffect(() => {
    const check = async () => {
      if (!("Notification" in window)) return;
      if (Notification.permission === "granted") {
        enableNotifications();
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/service-worker.js")
            .catch(() => {});
        }
      }
    };
    check();
  }, []);

  return null;
}