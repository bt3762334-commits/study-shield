import { createContext, useContext, useEffect, useState } from "react";

const GamificationContext = createContext();

const LEVELS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 500 },
  { level: 5, xp: 1000 },
];

export function GamificationProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [lastActive, setLastActive] = useState(null);
  const [badge, setBadge] = useState("Bronze");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gamification"));
    if (saved) {
      setXp(saved.xp);
      setLevel(saved.level);
      setStreak(saved.streak);
      setLastActive(saved.lastActive);
      setBadge(saved.badge);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "gamification",
      JSON.stringify({ xp, level, streak, lastActive, badge })
    );
  }, [xp, level, streak, lastActive, badge]);

  const calculateLevel = (newXp) => {
    let newLevel = 1;
    LEVELS.forEach((l) => {
      if (newXp >= l.xp) newLevel = l.level;
    });
    setLevel(newLevel);
  };

  const updateBadge = (xp) => {
    if (xp >= 2000) setBadge("Legendary");
    else if (xp >= 1000) setBadge("Diamond");
    else if (xp >= 500) setBadge("Gold");
    else if (xp >= 250) setBadge("Silver");
    else setBadge("Bronze");
  };

  const addXP = (amount) => {
    const newXp = xp + amount;
    setXp(newXp);
    calculateLevel(newXp);
    updateBadge(newXp);
    updateStreak();
  };

  const updateStreak = () => {
    const today = new Date().toDateString();

    if (lastActive === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActive === yesterday.toDateString()) {
      setStreak((s) => s + 1);
    } else {
      setStreak(1);
    }

    setLastActive(today);
  };

  return (
    <GamificationContext.Provider
      value={{ xp, level, streak, badge, addXP }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamification = () => useContext(GamificationContext);
