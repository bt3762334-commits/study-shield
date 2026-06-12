import { Routes, Route } from "react-router-dom";
import { useUser, UserProvider } from "./context/UserContext";
import WelcomeModal from "./components/ui/WelcomeModal";
import NotificationManager from "./components/ui/NotificationManager";
import Pomodoro from "./pages/Pomodoro";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Lessons from "./pages/Lessons";
import Lectures from "./pages/Lectures";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function AppInner() {
  const { userName } = useUser();
  return (
    <>
      <NotificationManager />
      {!userName && <WelcomeModal />}
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/tasks"        element={<Tasks />} />
        <Route path="/lessons"      element={<Lessons />} />
        <Route path="/lectures"     element={<Lectures />} />
        <Route path="/pomodoro"     element={<Pomodoro />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile"      element={<Profile />} />
        <Route path="/settings"     element={<Settings />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppInner />
    </UserProvider>
  );
}