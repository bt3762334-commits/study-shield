import { getTasks } from "./taskStorage";
import { getLessons } from "./lessonStorage";
import { getLectures } from "./lectureStorage";

const NOTIFICATION_STORAGE_KEY = "studyShieldNotifications";

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;

  if (Notification.permission === "granted") return true;

  if (Notification.permission === "denied") {
    alert("الإشعارات معطلة. فعّلها من إعدادات المتصفح");
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title, options = {}) => {
  if (Notification.permission !== "granted") return false;

  new Notification(title, {
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    ...options
  });

  return true;
};

export const scheduleReminder = (date, time, title, description) => {
  const reminderTime = new Date(`${date}T${time}`);
  const now = new Date();

  const delay = reminderTime - now;

  if (delay > 0) {
    setTimeout(() => {
      sendNotification(title, {
        body: description,
        tag: "study-reminder",
        requireInteraction: true
      });

      saveNotificationLog(title, description, reminderTime);
    }, delay);
  }
};

export const saveNotificationLog = (title, description, time) => {
  const logs = JSON.parse(localStorage.getItem(NOTIFICATION_STORAGE_KEY) || "[]");

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

  const updated = logs.map(log =>
    log.id === id ? { ...log, read: true } : log
  );

  localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updated));
};

export const checkUpcomingItems = () => {
  const tasks = getTasks();
  const lessons = getLessons();
  const lectures = getLectures();

  const all = [
    ...tasks.map(t => ({ ...t, type: "task", emoji: "✅" })),
    ...lessons.map(l => ({ ...l, type: "lesson", emoji: "📚" })),
    ...lectures.map(l => ({ ...l, type: "lecture", emoji: "🎓" }))
  ];

  const now = new Date();

  return all.filter(item => {
    if (item.completed) return false;
    if (!item.date || !item.time) return false;

    const time = new Date(`${item.date}T${item.time}`);
    const diffHours = (time - now) / (1000 * 60 * 60);

    return diffHours > 0 && diffHours <= 24;
  });
};

export const enableNotifications = () => {
  const upcoming = checkUpcomingItems();

  upcoming.forEach(item => {
    scheduleReminder(
      item.date,
      item.time,
      `${item.emoji} ${item.title}`,
      `لديك ${item.type === "task" ? "مهمة" : item.type === "lesson" ? "درس" : "محاضرة"}: ${item.description || item.title}`
    );
  });

  return setInterval(() => {
    const current = checkUpcomingItems();

    current.forEach(item => {
      scheduleReminder(
        item.date,
        item.time,
        `${item.emoji} ${item.title}`,
        `لديك ${item.type === "task" ? "مهمة" : item.type === "lesson" ? "درس" : "محاضرة"}: ${item.description || item.title}`
      );
    });
  }, 60000);
};
