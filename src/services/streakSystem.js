export function getStreak() {
  const streak =
    Number(
      localStorage.getItem(
        "studyShieldStreak"
      )
    ) || 0;

  return streak;
}

export function updateStreak() {
  const today =
    new Date().toDateString();

  const lastDate =
    localStorage.getItem(
      "studyShieldLastCompleted"
    );

  let streak =
    Number(
      localStorage.getItem(
        "studyShieldStreak"
      )
    ) || 0;

  if (lastDate !== today) {
    streak += 1;

    localStorage.setItem(
      "studyShieldStreak",
      streak
    );

    localStorage.setItem(
      "studyShieldLastCompleted",
      today
    );
  }

  return streak;
}
