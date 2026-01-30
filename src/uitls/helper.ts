import { v4 as UUID } from "uuid";
import type { MODE, timerConfig } from "../type";
import { useSettingsStore } from "../store/settings.store";
import { MAX_VOLUMN } from "../controller/audioController";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const modeMapToSetting = {
  focus: "focusTime",
  "short-break": "BreakTime",
  "long-break": "LongBreakTime",
};

export function convertToSeconds(min: number, sec: number): number {
  if (isNaN(min) || isNaN(sec)) return 0;
  return min * 60 + sec;
}

export function convertToMinutes(seconds: number) {
  if (isNaN(seconds)) return { min: 0, sec: 0 };

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return { min, sec };
}

export function secondsToRadians(seconds: number): number {
  return -(seconds / 3600) * (2 * Math.PI);
}

export function formatTimerValue(
  current: number | null | undefined,
  defaultValue: number
): string {
  const value = current ?? defaultValue;
  return value.toString().padStart(2, "0");
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getTodayDate(): string {
  const now = new Date();

  const day = now.getDate();
  // .getMonth() is 0-indexed (0 = Jan, 11 = Dec), so we add 1
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  return `${day}, ${month}, ${year}`;
}

export const sessionCopy = (count: number) => {
  if (count <= 2) return "Light and easy — warming up nicely ☕";
  if (count <= 4) return "Solid focus zone. Consistent and smart 💪";
  if (count <= 6) return "Deep work mode activated. Respect 🔥";
  return "Full beast mode. Please remember to blink 🧠⚡";
};
export const levelColor = (count: number) => {
  if (count <= 2) return "var(--level-low)";
  if (count <= 4) return "var(--level-medium)";
  if (count <= 6) return "var(--level-high)";
  return "var(--level-extreme)";
};

export const generateUUID = (): string => {
  return UUID();
};

export const getSavedTimerConfig = (): timerConfig => {
  const { focusTime, breakTime, longBreakTime } =
    useSettingsStore.getState().settings;

  return {
    focus: focusTime,
    shortBreak: breakTime,
    longBreak: longBreakTime,
  };
};

export function decideNextSession(
  completedSession: MODE,
  focusSessionCompleted: number
): MODE {
  if (completedSession === "focus") {
       const nextCount = focusSessionCompleted + 1;

    if (nextCount % 4 === 0) {
      return "long-break";
    }

    return "short-break";
  }
  return "focus";
}

export function getModeDuration(mode: MODE, time: timerConfig): number {
  if (mode === "focus") {
    return time.focus;
  }

  if (mode === "short-break") {
    return time.shortBreak;
  }

  return time.longBreak;
}

export function percentToVolumn(percent:number):number{
   return MAX_VOLUMN * percent / 100
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

