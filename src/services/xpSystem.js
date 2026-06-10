import { getTasks } from "./taskStorage";
import { getLessons } from "./lessonStorage";
import { getLectures } from "./lectureStorage";

export function getXPData() {
  const tasks = getTasks();
  const lessons = getLessons();
  const lectures = getLectures();

  const taskXP =
    tasks.filter(t => t.completed).length * 10;

  const lessonXP =
    lessons.filter(l => l.completed).length * 15;

  const lectureXP =
    lectures.filter(l => l.completed).length * 20;

  const xp =
    taskXP +
    lessonXP +
    lectureXP;

  let level = "🌱 مبتدئ";

  if (xp >= 100) level = "🥉 برونزي";
  if (xp >= 300) level = "🥈 فضي";
  if (xp >= 600) level = "🥇 ذهبي";
  if (xp >= 1000) level = "💎 أسطوري";

  return {
    xp,
    level
  };
}
