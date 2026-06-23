import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function WelcomeModal() {
  const { saveName } = useUser();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      saveName(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-xl font-bold mb-4">Welcome 👋</h2>
        <p className="mb-4">What is your name?</p>
        <input
          className="w-full border p-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
