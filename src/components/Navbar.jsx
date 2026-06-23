import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Lectures", path: "/lectures" },
    { name: "Pomodoro", path: "/pomodoro" },
    { name: "Achievements", path: "/achievements" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">Study Shield</h1>

      {/* Desktop */}
      <div className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${
              location.pathname === item.path
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col p-4 gap-4 md:hidden z-50">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="text-gray-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
