import { usePomyoStore } from "../core/timer";

export default function useTimerActions() {
  const { start, resume, pause, reset, status } = usePomyoStore();

  const canStart = status === "idle" || status === "completed";
  const canPause = status === "ticking";
  const canResume = status === "paused";
  // const showReset = hasStartedOnce;
  const isTimerActive = status === "ticking";
  const canOpenSetTimer = !isTimerActive;
  const showReset = !canStart || canPause || canResume;

  function startTimer() {
    if (!canStart) return;

    start();
  }

  function resetTimer() {
    reset();
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
