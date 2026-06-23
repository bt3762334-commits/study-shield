import { createContext, useContext, useEffect, useState } from "react";

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("analytics"));
    if (saved) setSessions(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("analytics", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (minutes) => {
    const newSession = {
      date: new Date().toISOString(),
      duration: minutes,
    };
    setSessions((prev) => [...prev, newSession]);
  };

  const getStats = () => {
    const now = new Date();

    let daily = 0;
    let weekly = 0;
    let monthly = 0;

    sessions.forEach((s) => {
      const d = new Date(s.date);

      if (d.toDateString() === now.toDateString()) {
        daily += s.duration;
      }

      const diffDays = (now - d) / (1000 * 60 * 60 * 24);

      if (diffDays <= 7) weekly += s.duration;
      if (diffDays <= 30) monthly += s.duration;
    });

    return { daily, weekly, monthly };
  };

  return (
    <AnalyticsContext.Provider value={{ sessions, addSession, getStats }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);
