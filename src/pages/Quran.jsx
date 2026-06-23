import { quranVerse } from "../data/quranVerse";

const Quran = () => {
  return (
    <div className="container">

      <div className="card" style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>📖 آية اليوم</h2>

        <p style={{ fontSize: "22px", lineHeight: "2" }}>
          {quranVerse.text}
        </p>

        <p style={{ marginTop: "15px", color: "#9ca3af" }}>
          {quranVerse.surah}
        </p>
      </div>

    </div>
  );
};

export default Quran;
