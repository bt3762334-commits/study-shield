import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("studyShieldUserName") || "";
  });

  const saveName = (name) => {
    localStorage.setItem("studyShieldUserName", name);
    setUserName(name);
  };

  return (
    <UserContext.Provider value={{ userName, saveName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}