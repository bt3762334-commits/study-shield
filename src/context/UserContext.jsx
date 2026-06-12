import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("studyShieldUserName") || "";
  });
  const [showWelcome, setShowWelcome] = useState(false);

  const saveName = (name) => {
    localStorage.setItem("studyShieldUserName", name);
    setUserName(name);
  };

  return (
    <UserContext.Provider value={{ userName, saveName, showWelcome, setShowWelcome }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}