import { useState, useEffect } from "react";
import ReminderSystem from "../components/ui/ReminderSystem";

export default function Settings() {
  const [reminders, setReminders] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Settings</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        <label className="flex items-center justify-between">
          <span>Enable Daily Reminders</span>
          <input
            type="checkbox"
            checked={reminders}
            onChange={() => setReminders(!reminders)}
          />
        </label>
      </div>

      <ReminderSystem enabled={reminders} />
    </div>
  );
}
