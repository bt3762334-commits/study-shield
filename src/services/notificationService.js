/* =============================================
   NOTIFICATION SERVICE
   ============================================= */

import { getTasks } from "./taskStorage";
import { getLectures } from "./lectureStorage";

const NOTIFICATION_STORAGE_KEY = "studyShieldNotifications";

/* =============================================
   PERMISSION HANDLING
   ============================================= */

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.error("❌ Browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    alert("الإشعارات معطلة. يرجى تفعيلها من إعدادات المتصفح");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("❌ Error requesting notification permission:", error);
    return false;
  }
};

/* =============================================
   SEND NOTIFICATION
   ============================================= */

export const sendNotification = (title, options = {}) => {
  if (!("Notification" in window)) return false;

  if (Notification.permission === "granted") {
    try {
      new Notification(title, {
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        ...options
      });
      return true;
    } catch (error) {
      console.error("❌ Error sending notification:", error);
      return false;
    }
  }
  return false;
};

/* =============================================
   SCHEDULER
   ============================================= */

export const scheduleReminder = (date, time, title, description) => {
  const reminderTime = new Date(`${date}T${time}`);
  const now = new Date();
  const delayMs = reminderTime - now;

  if (delayMs > 0) {
    setTimeout(() => {
      sendNotification(title, {
        body: description,
        tag: `study-reminder-${Date.now()}`,
        requireInteraction: true
      });
      saveNotificationLog(title, description, reminderTime);
    }, delayMs);
  }
};

/* =============================================
   STORAGE (LOCALSTORAGE LOGS)
   ============================================= */

export const saveNotificationLog = (title, description, time) => {
  const logs = JSON.parse(
    localStorage.getItem(NOTIFICATION_STORAGE_KEY) || "[]"
  );

  logs.push({
    id: Date.now(),
    title,
    description,
    time: time.toISOString(),
    read: false
  });

  localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(logs));
};

export const getNotificationLogs = () => {
  return JSON.parse(localStorage.getItem(NOTIFICATION_STORAGE_KEY) || "[]");
};

export const markNotificationAsRead = (id) => {
  const logs = getNotificationLogs();

  const updated = logs.map((log) =>
    log.id === id ? { ...log, read: true } : log
  );

  localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updated));
};

/* =============================================
   UPCOMING ITEMS DETECTION
   ============================================= */

const typeLabel = (type) => (type === "task" ? "مهمة" : "محاضرة");

export const checkUpcomingItems = () => {
  const tasks = getTasks();
  const lectures = getLectures();

  const allItems = [
    ...tasks.map((t) => ({ ...t, type: "task", emoji: "✅" })),
    ...lectures.map((l) => ({ ...l, type: "lecture", emoji: "🎓" }))
  ];

  const now = new Date();

  return allItems.filter((item) => {
    if (item.completed) return false;
    if (!item.date || !item.time) return false;

    const itemTime = new Date(`${item.date}T${item.time}`);
    const diffHours = (itemTime - now) / (1000 * 60 * 60);

    return diffHours > 0 && diffHours <= 24;
  });
};

/* =============================================
   MAIN ENABLE FUNCTION
   ============================================= */

export const enableNotifications = () => {
  const upcoming = checkUpcomingItems();

  upcoming.forEach((item) => {
    scheduleReminder(
      item.date,
      item.time,
      `${item.emoji} ${item.title}`,
      `لديك ${typeLabel(item.type)}: ${item.description || item.title}`
    );
  });

  const checkInterval = setInterval(() => {
    const current = checkUpcomingItems();

    current.forEach((item) => {
      scheduleReminder(
        item.date,
        item.time,
        `${item.emoji} ${item.title}`,
        `لديك ${typeLabel(item.type)}: ${item.description || item.title}`
      );
    });
  }, 60000);

  return checkInterval;
};
