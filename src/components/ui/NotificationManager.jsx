import { useEffect } from "react";

export default function NotificationManager() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return null;
}
