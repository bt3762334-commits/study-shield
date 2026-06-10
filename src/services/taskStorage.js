const STORAGE_KEY = "studyShieldTasks";

export const getTasks = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
};
