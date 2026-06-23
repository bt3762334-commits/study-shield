import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="glass"
      style={{
        width: "240px",
        margin: "10px",
        padding: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>
        Study Shield
      </h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/pomodoro">Pomodoro</Link>
        <Link to="/lessons">Lessons</Link>
        <Link to="/lectures">Lectures</Link>
        <Link to="/achievements">Achievements</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/quran">Quran</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
