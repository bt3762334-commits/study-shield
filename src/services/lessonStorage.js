const STORAGE_KEY = "studyShieldLessons";

export const getLessons = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || [];
};

export const saveLessons = (lessons) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(lessons)
  );
};
