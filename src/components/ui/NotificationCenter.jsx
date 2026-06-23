import { useState, useEffect } from "react";
import {
  getNotificationLogs,
  markNotificationAsRead,
  checkUpcomingItems
} from "../../services/notificationService";

export default function NotificationCenter() {
  const [logs, setLogs] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    setLogs(getNotificationLogs().slice(-5).reverse());
    setUpcoming(checkUpcomingItems());
  }, []);

  const handleRead = (id) => {
    markNotificationAsRead(id);
    setLogs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, read: true } : l))
    );
  };

  const unreadCount = logs.filter((l) => !l.read).length;

  return (
    <div className="notification-center">
      <h3>
        🔔 مركز الإشعارات
        {unreadCount > 0 && (
          <span className="notif-count-badge">{unreadCount}</span>
        )}
      </h3>

      {upcoming.length > 0 && (
        <div className="upcoming-alerts">
          <p className="upcoming-label">⏰ خلال 24 ساعة القادمة:</p>

          {upcoming.map((item) => (
            <div key={item.id} className="notif-item unread">
              <div className="notif-item-dot" />
              <div>
                <strong>
                  {item.emoji} {item.title}
                </strong>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                  {item.date} — {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {logs.length === 0 && upcoming.length === 0 ? (
        <div className="empty-notifications">
          <span style={{ fontSize: "32px" }}>🔕</span>
          <p style={{ marginTop: "8px" }}>لا توجد إشعارات حالياً</p>
        </div>
      ) : (
        logs.length > 0 && (
          <div style={{ marginTop: upcoming.length > 0 ? "14px" : "0" }}>
            <p className="upcoming-label">📋 سجل الإشعارات:</p>

            {logs.map((log) => (
              <div
                key={log.id}
                className={`notif-item ${!log.read ? "unread" : ""}`}
                onClick={() => !log.read && handleRead(log.id)}
                style={{ cursor: log.read ? "default" : "pointer" }}
              >
                {!log.read && <div className="notif-item-dot" />}

                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: "14px" }}>{log.title}</strong>

                  {log.description && (
                    <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                      {log.description}
                    </p>
                  )}

                  <p style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>
                    {new Date(log.time).toLocaleString("ar-EG")}
                  </p>
                </div>

                {log.read && (
                  <span className="notif-read-badge">مقروء</span>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
