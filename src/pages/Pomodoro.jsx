import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

export default function Pomodoro() {

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [seconds, setSeconds] =
    useState(WORK_TIME);

  const [running, setRunning] =
    useState(false);

  const [isBreak, setIsBreak] =
    useState(false);

  useEffect(() => {

    let interval;

    if (running) {

      interval = setInterval(() => {

        setSeconds(prev => {

          if (prev <= 1) {

            const nextMode = !isBreak;

            setIsBreak(nextMode);

            return nextMode
              ? BREAK_TIME
              : WORK_TIME;
          }

          return prev - 1;

        });

      }, 1000);

    }

    return () =>
      clearInterval(interval);

  }, [running, isBreak]);

  const formatTime = (time) => {

    const mins =
      Math.floor(time / 60);

    const secs =
      time % 60;

    return `${mins
      .toString()
      .padStart(2,"0")}:${secs
      .toString()
      .padStart(2,"0")}`;
  };

  const resetTimer = () => {

    setRunning(false);

    setIsBreak(false);

    setSeconds(WORK_TIME);
  };

  return (
    <MainLayout>

      <h1 className="page-title">
        🍅 Pomodoro Timer
      </h1>

      <div className="pomodoro-card">

        <h2>
          {isBreak
            ? "☕ وقت الراحة"
            : "📚 وقت الدراسة"}
        </h2>

        <div className="timer-display">
          {formatTime(seconds)}
        </div>

        <div className="timer-actions">

          <button
            onClick={() =>
              setRunning(true)
            }
          >
            ▶ بدء
          </button>

          <button
            onClick={() =>
              setRunning(false)
            }
          >
            ⏸ إيقاف
          </button>

          <button
            onClick={resetTimer}
          >
            🔄 إعادة
          </button>

        </div>

      </div>

    </MainLayout>
  );
}
