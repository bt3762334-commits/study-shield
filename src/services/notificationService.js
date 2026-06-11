import { getTasks } from "./taskStorage";
import { getLessons } from "./lessonStorage";
import { getLectures } from "./lectureStorage";

const NOTIFICATION_STORAGE_KEY =
  "studyShieldNotifications";

export const requestNotificationPermission =
  async () => {
    if (
      !("Notification" in window)
    ) {
      console.error(
        "❌ Browser does not support notifications"
      );
      return false;
    }

    console.log(
      "📢 Current permission:",
      Notification.permission
    );

    if (
      Notification.permission ===
      "granted"
    ) {
      console.log(
        "✅ Notifications already granted"
      );
      return true;
    }

    if (
      Notification.permission ===
      "denied"
    ) {
      console.error(
        "❌ Notifications blocked by user"
      );
      alert(
        "الإشعارات معطلة. يرجى تفعيلها من إعدادات المتصفح"
      );
      return false;
    }

    try {
      console.log(
        "🔔 Requesting notification permission..."
      );
      const permission =
        await Notification
          .requestPermission();

      console.log(
        "📢 Permission result:",
        permission
      );

      if (
        permission === "granted"
      ) {
        console.log(
          "✅ Notifications enabled successfully"
        );
        return true;
      } else {
        console.error(
          "❌ User denied notifications"
        );
        return false;
      }
    } catch (error) {
      console.error(
        "❌ Error requesting notification permission:",
        error
      );
      return false;
    }
  };

export const sendNotification = (
  title,
  options = {}
) => {
  if (
    !("Notification" in window)
  ) {
    console.error(
      "❌ Notifications not supported"
    );
    return false;
  }

  if (
    Notification.permission ===
    "granted"
  ) {
    try {
      new Notification(title, {
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        ...options
      });
      console.log(
        "✅ Notification sent:",
        title
      );
      return true;
    } catch (error) {
      console.error(
        "❌ Error sending notification:",
        error
      );
      return false;
    }
  } else {
    console.warn(
      "⚠️ Notification permission not granted"
    );
    return false;
  }
};

export const scheduleReminder = (
  date,
  time,
  title,
  description
) => {
  const reminderTime =
    new Date(
      `${date}T${time}`
    );

  const now = new Date();

  const delayMs =
    reminderTime - now;

  if (
    delayMs > 0
  ) {
    setTimeout(
      () => {
        sendNotification(
          title,
          {
            body: description,
            tag: "study-reminder",
            requireInteraction: true
          }
        );

        saveNotificationLog(
          title,
          description,
          reminderTime
        );
      },
      delayMs
    );
  }
};

export const saveNotificationLog = (
  title,
  description,
  time
) => {
  const logs =
    JSON.parse(
      localStorage.getItem(
        NOTIFICATION_STORAGE_KEY
      ) || "[]"
    );

  logs.push({
    id: Date.now(),
    title,
    description,
    time: time.toISOString(),
    read: false
  });

  localStorage.setItem(
    NOTIFICATION_STORAGE_KEY,
    JSON.stringify(logs)
  );
};

export const getNotificationLogs = () => {
  return JSON.parse(
    localStorage.getItem(
      NOTIFICATION_STORAGE_KEY
    ) || "[]"
  );
};

export const markNotificationAsRead = (
  id
) => {
  const logs =
    getNotificationLogs();

  const updated = logs.map(log =>
    log.id === id
      ? { ...log, read: true }
      : log
  );

  localStorage.setItem(
    NOTIFICATION_STORAGE_KEY,
    JSON.stringify(updated)
  );
};

export const checkUpcomingItems =
  () => {
    const tasks = getTasks();
    const lessons = getLessons();
    const lectures = getLectures();

    const allItems = [
      ...tasks.map(t => ({
        ...t,
        type: "task",
        emoji: "✅"
      })),
      ...lessons.map(l => ({
        ...l,
        type: "lesson",
        emoji: "📚"
      })),
      ...lectures.map(l => ({
        ...l,
        type: "lecture",
        emoji: "🎓"
      }))
    ];

    const now = new Date();

    const upcoming =
      allItems.filter(item => {
        if (item.completed) {
          return false;
        }

        if (
          !item.date ||
          !item.time
        ) {
          return false;
        }

        const itemTime =
          new Date(
            `${item.date}T${item.time}`
          );

        const diffMs =
          itemTime - now;

        const diffHours =
          diffMs / (1000 * 60 * 60);

        return (
          diffHours > 0 &&
          diffHours <= 24
        );
      });

    return upcoming;
  };

export const enableNotifications = () => {
  const upcoming =
    checkUpcomingItems();

  upcoming.forEach(item => {
    scheduleReminder(
      item.date,
      item.time,
      `${item.emoji} ${item.title}`,
      `لديك ${item.type === "task" ? "مهمة" : item.type === "lesson" ? "درس" : "محاضرة"}: ${item.description || item.title}`
    );
  });

  const checkInterval =
    setInterval(() => {
      const current =
        checkUpcomingItems();

      if (current.length > 0) {
        current.forEach(item => {
          scheduleReminder(
            item.date,
            item.time,
            `${item.emoji} ${item.title}`,
            `لديك ${item.type === "task" ? "مهمة" : item.type === "lesson" ? "درس" : "محاضرة"}: ${item.description || item.title}`
          );
        });
      }
    }, 60000);

  return checkInterval;
};
