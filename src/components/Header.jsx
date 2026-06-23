import { useUser } from "../context/UserContext";

export default function Header() {
  const { userName, getMotivation } = useUser();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-lg font-bold">
        {userName ? `Welcome back, ${userName} 👋` : "Study Shield"}
      </h1>

      <button
        onClick={getMotivation}
        className="text-sm text-blue-600"
      >
        Motivation
      </button>
    </header>
  );
}
