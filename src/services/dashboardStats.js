/* =============================================
   DASHBOARD STATS SERVICE
   ============================================= */

import { getTasks } from "./taskStorage";
import { getLectures } from "./lectureStorage";

/* =============================================
   MAIN STATS CALCULATION
   ============================================= */

export function getDashboardStats() {
  const tasks = getTasks();
  const lectures = getLectures();

  const total = tasks.length + lectures.length;

  const completed =
    tasks.filter((t) => t.completed).length +
    lectures.filter((l) => l.completed).length;

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    tasks: tasks.length,
    lectures: lectures.length,
    progress
  };
}
