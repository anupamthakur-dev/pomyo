import type { Settings } from "../type";
export const defaultSettings: Settings = {
  focusTime: 1500,
  breakTime: 300,
  longBreakTime: 900,
  soundEnabled: true,
  accentColor: "#FF6347",
  music: {
    sound: "kitchen",
    volume: 25,
  },
  alarm: { sound: "cute", volume: 25 },
  enableAlarm: true,
  enableMusic: true,
};

export const INITIAL_Y: number = 0.657;
export const SEPERATE_Y: number = 0.825;
export const todos = [
  {
    id: "1234",
    title: "I study 2hrs today poppasopas soapsaps asopasoaps",
    estimatedPomo: 4,
    completedPomo: 1,
    status: "active",
  },
  {
    id: "1234",
    title: "I study 2hrs today poppasopas soapsaps asopasoaps",
    estimatedPomo: 4,
    completedPomo: 1,
    status: "completed",
  },
  {
    id: "1234",
    title: "work 4hrs on computer",
    estimatedPomo: 4,
    completedPomo: 1,
    status: "pending",
  },
];
