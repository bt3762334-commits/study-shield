export default function Header() {
  const today = new Date().toLocaleDateString(
    "ar-EG",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );

  const hour = new Date().getHours();

  let greeting = "مرحبًا";

  if (hour < 12) {
    greeting = "صباح الخير";
  } else if (hour < 18) {
    greeting = "مساء الخير";
  } else {
    greeting = "مساء الخير";
  }

  return (
    <header className="header">

      <div>

        <h1>
          {greeting} 👋
        </h1>

        <p>
          ركز على التقدم وليس الكمال
        </p>

      </div>

      <div className="header-date">
        {today}
      </div>

    </header>
  );
}
