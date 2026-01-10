import { usePomyoStore } from "../core/timer";
import { useSettingsStore } from "./settings.store";

export function syncSettingsToPomyo() {
  let prev = useSettingsStore.getState().settings;

  useSettingsStore.subscribe(({ settings: next }) => {
    if (
      prev.focusTime !== next.focusTime ||
      prev.breakTime !== next.breakTime ||
      prev.longBreakTime !== next.longBreakTime
    ) {
      if (!usePomyoStore) return;
      usePomyoStore.getState().applyBaseTimerConfig({
        focus: next.focusTime,
        shortBreak: next.breakTime,
        longBreak: next.longBreakTime,
      });
    }

    prev = next;
  });
}

syncSettingsToPomyo();
