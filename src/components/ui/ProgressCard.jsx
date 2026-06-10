export default function ProgressCard() {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <h3>التقدم اليومي</h3>
        <span>80%</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
}
