import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Study Smarter, Not Harder
        </h1>
        <p className="text-lg mb-6">
          Track your progress, stay motivated, and achieve your goals.
        </p>
        <Link
          to="/"
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-2">Gamification</h3>
          <p>XP, levels, streaks, and rewards.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-2">Analytics</h3>
          <p>Track your daily and weekly performance.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-2">Focus Tools</h3>
          <p>Pomodoro and task management.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to boost your productivity?
        </h2>
        <Link
          to="/"
          className="bg-white text-blue-600 px-6 py-3 rounded-xl"
        >
          Start Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="mb-2">Developed by Basem Taha</p>
        <p className="text-sm text-gray-400">Dark Byte</p>
        <p className="text-sm text-gray-400">01091291823</p>
      </footer>
    </div>
  );
}
