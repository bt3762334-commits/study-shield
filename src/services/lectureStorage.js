const STORAGE_KEY = "studyShieldLectures";

export const getLectures = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || [];
};

export const saveLectures = (lectures) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(lectures)
  );
};
