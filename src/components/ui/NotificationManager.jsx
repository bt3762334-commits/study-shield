import { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  enableNotifications
} from "../../services/notificationService";

export default function NotificationManager() {
  const [permission, setPermission] =
    useState(null);

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(false);

  useEffect(() => {
    const checkAndEnable =
      async () => {
        if (
          "Notification" in
          window
        ) {
          setPermission(
            Notification
              .permission
          );

          const hasPermission =
            await requestNotificationPermission();

          if (hasPermission) {
            setNotificationsEnabled(
              true
            );

            enableNotifications();

            if (
              "serviceWorker" in
              navigator
            ) {
              navigator.serviceWorker
                .register(
                  "/service-worker.js"
                )
                .catch(error =>
                  console.log(
                    "SW registration failed:",
                    error
                  )
                );
            }
          }
        }
      };

    checkAndEnable();
  }, []);

  const handleEnableNotifications =
    async () => {
      const hasPermission =
        await requestNotificationPermission();

      if (hasPermission) {
        setPermission("granted");
        setNotificationsEnabled(
          true
        );

        enableNotifications();

        if (
          "serviceWorker" in
          navigator
        ) {
          navigator.serviceWorker
            .register(
              "/service-worker.js"
            )
            .catch(error =>
              console.log(
                "SW registration failed:",
                error
              )
            );
        }
      }
    };

  if (
    permission ===
    "granted" ||
    notificationsEnabled
  ) {
    return null;
  }

  return (
    <div className="notification-permission-banner">

      <div className="banner-content">

        <h4>
          🔔 تفعيل التنبيهات
        </h4>

        <p>
          احصل على تنبيهات للمهام والدروس والمحاضرات
        </p>

      </div>

      <button
        onClick={
          handleEnableNotifications
        }
        className="enable-btn"
      >
        تفعيل
      </button>

    </div>
  );
}
