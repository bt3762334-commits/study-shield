export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
      <h1 className="text-lg">👋 Welcome</h1>

      <button className="bg-primary px-4 py-2 rounded-lg hover:opacity-80 transition">
        Start Focus
      </button>
    </header>
  );
}
