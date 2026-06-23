import { Routes, Route } from "react-router-dom";
import { useUser, UserProvider } from "./context/UserContext";
import { GamificationProvider } from "./context/GamificationContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { IslamicProvider } from "./context/IslamicContext";

import WelcomeModal from "./components/ui/WelcomeModal";
import NotificationManager from "./components/ui/NotificationManager";
import MainLayout from "./layouts/MainLayout";

import Landing from "./pages/Landing";
import Pomodoro from "./pages/Pomodoro";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
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
        <Route path="/landing" element={<Landing />} />

        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/lectures" element={<Lectures />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <GamificationProvider>
        <AnalyticsProvider>
          <IslamicProvider>
            <AppInner />
          </IslamicProvider>
        </AnalyticsProvider>
      </GamificationProvider>
    </UserProvider>
  );
}
