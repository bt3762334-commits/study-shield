import { getTasks } from "./taskStorage";
import { getLessons } from "./lessonStorage";
import { getLectures } from "./lectureStorage";

export function getDashboardStats() {
  const tasks = getTasks();
  const lessons = getLessons();
  const lectures = getLectures();

  const total =
    tasks.length +
    lessons.length +
    lectures.length;

  const completed =
    tasks.filter(t => t.completed).length +
    lessons.filter(l => l.completed).length +
    lectures.filter(l => l.completed).length;

  const progress =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  return {
    tasks: tasks.length,
    lessons: lessons.length,
    lectures: lectures.length,
    progress
  };
}
