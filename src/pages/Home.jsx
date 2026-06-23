import { useUser } from "../context/UserContext";

export default function Home() {
  const { userName, motivation } = useUser();

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        {userName ? `Hello ${userName} 👋` : "Welcome"}
      </h2>

      <p className="text-gray-600 mb-6">{motivation}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="font-semibold">Today's Focus</h3>
          <p className="text-sm text-gray-500">
            Stay consistent and complete your tasks.
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="font-semibold">Quick Start</h3>
          <p className="text-sm text-gray-500">
            Jump into your study session now.
          </p>
        </div>
      </div>
    </div>
  );
}
