import { useState } from "react";
import { usePomyoStore } from "../core/timer";

export default function useTimerActions() {
  const { start, resume, pause, reset, status } =
    usePomyoStore();

  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  const canStart = status === "idle" || status === "completed";
  const canPause = status === "ticking";
  const canResume = status === "paused";
  const showReset = hasStartedOnce;
  const isTimerActive = ["ticking", "paused"].includes(status);
  const canOpenSetTimer = !isTimerActive;

  function startTimer() {
    if (!canStart) return;

    setHasStartedOnce(true);
    start();
  }

  function resetTimer() {
    reset();
    setHasStartedOnce(false);
  }

  return {
    status,
    showReset,
    canStart,
    canPause,
    canResume,
    isTimerActive,
    canOpenSetTimer,
    startTimer,
    resumeTimer: () => canResume && resume(),
    resetTimer,
    pauseTimer: () => canPause && pause(),
  };
}
