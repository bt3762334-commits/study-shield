import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import XPBar from "../components/ui/XPBar";

export default function MainLayout({ children }) {
  const { getMotivation } = useUser();

  useEffect(() => {
    getMotivation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Header />

      <div className="p-4">
        <XPBar />
        {children}
      </div>
    </div>
  );
}
