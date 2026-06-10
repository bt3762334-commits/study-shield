export default function ProgressCard({
  progress = 0
}) {
  return (
    <div className="progress-card">

      <div className="progress-header">
        <h3>نسبة الإنجاز</h3>

        <span>
          {progress}%
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`
          }}
        />
      </div>

    </div>
  );
}
