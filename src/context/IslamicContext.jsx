import { createContext, useContext, useEffect, useState } from "react";

const IslamicContext = createContext();

export function IslamicProvider({ children }) {
  const [verse, setVerse] = useState(null);
  const [hadith, setHadith] = useState(null);

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("islamicContent"));

    if (cached && cached.date === new Date().toDateString()) {
      setVerse(cached.verse);
      setHadith(cached.hadith);
    } else {
      fetchContent();
    }
  }, []);

  const fetchContent = async () => {
    try {
      const verseData = {
        text: "Indeed, Allah is with the patient.",
        ref: "Quran 2:153",
      };

      const hadithData = {
        text: "Actions are judged by intentions.",
        ref: "Bukhari & Muslim",
      };

      setVerse(verseData);
      setHadith(hadithData);

      localStorage.setItem(
        "islamicContent",
        JSON.stringify({
          verse: verseData,
          hadith: hadithData,
          date: new Date().toDateString(),
        })
      );
    } catch {
      setVerse({ text: "Stay patient and trust Allah.", ref: "" });
      setHadith({ text: "Do good consistently.", ref: "" });
    }
  };

  return (
    <IslamicContext.Provider value={{ verse, hadith }}>
      {children}
    </IslamicContext.Provider>
  );
}

export const useIslamic = () => useContext(IslamicContext);
