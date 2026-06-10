export default function UpcomingTasks() {
  const tasks = [
    {
      title: "مراجعة React",
      time: "6:00 مساءً"
    },
    {
      title: "حل Assignment",
      time: "8:00 مساءً"
    },
    {
      title: "قراءة فصل Database",
      time: "10:00 مساءً"
    }
  ];

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
