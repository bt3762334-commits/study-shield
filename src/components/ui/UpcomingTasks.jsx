export default function UpcomingTasks() {
const [stats, setStats] = useState({
  tasks: 0,
  lessons: 0,
  lectures: 0,
  progress: 0
});

useEffect(() => {
  setStats(getDashboardStats());
}, []);

  return (
    <div className="dashboard-card">
      <h3>المهام القادمة</h3>

      {tasks.map((task, index) => (
        <div className="task-item" key={index}>
          <div>
            <h4>{task.title}</h4>
          </div>

          <span>{task.time}</span>
        </div>
      ))}
    </div>
  );
}
