export default function Header() {
  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <header className="header">
      <div>
        <h1>مرحبًا بك 👋</h1>
        <p>{today}</p>
      </div>
    </header>
  );
}
