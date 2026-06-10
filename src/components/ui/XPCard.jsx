import { useEffect, useState } from "react";

import { getXPData } from "../../services/xpSystem";

export default function XPCard() {
  const [data, setData] = useState({
    xp: 0,
    level: "🌱 مبتدئ"
  });

  useEffect(() => {
    setData(getXPData());
  }, []);

  return (
    <div className="xp-card">

      <div className="xp-header">
        <h3>مستوى التقدم</h3>

        <span>
          {data.level}
        </span>
      </div>

      <h1>
        {data.xp} XP
      </h1>

      <div className="xp-bar">

        <div
          className="xp-fill"
          style={{
            width: `${Math.min(
              data.xp % 100,
              100
            )}%`
          }}
        />

      </div>

    </div>
  );
}
