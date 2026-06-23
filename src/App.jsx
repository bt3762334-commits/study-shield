import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Pomodoro from "./pages/Pomodoro";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
}
