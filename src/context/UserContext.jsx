import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const motivationalMessages = [
  "Excellent progress today!",
  "You're getting closer to your goal.",
  "Consistency beats intensity.",
  "One more step toward success.",
  "Keep pushing, you're doing great!",
];

export function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [motivation, setMotivation] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
      setIsFirstVisit(false);
    }
  }, []);

  const saveName = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
    setIsFirstVisit(false);
  };

  const getMotivation = () => {
    const msg =
      motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ];
    setMotivation(msg);
    return msg;
  };

  return (
    <UserContext.Provider
      value={{ userName, saveName, isFirstVisit, motivation, getMotivation }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
