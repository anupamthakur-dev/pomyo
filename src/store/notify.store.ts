import { create } from "zustand";
import type { NotifyStore } from "../type";

export const useNotifyStore = create<NotifyStore>((set, get) => ({
  current: null,
  countdown: null,
  dismissTimer: undefined,

  notify(notification) {
    const { dismissTimer } = get();

    if (dismissTimer) {
      clearTimeout(dismissTimer);
    }
    

    let timer: ReturnType<typeof setTimeout> | undefined;

    timer = setTimeout(() => {
      set({ current: null, dismissTimer: undefined });
    }, notification.autoCloseMs || 2000);

    set({
      current: notification,
      dismissTimer: timer,
    });
  },

  notifyCountdown(notification) {
    setTimeout(() => {
      set({ countdown: null });
    }, notification.countdown + 1000);
    set({
      countdown: notification,
    });
  },

  dismiss() {
    const { dismissTimer } = get();

    if (dismissTimer) {
      clearTimeout(dismissTimer);
    }

    set({ current: null, dismissTimer: undefined });
  },

  clear() {
    const { dismissTimer } = get();

    if (dismissTimer) {
      clearTimeout(dismissTimer);
    }

    set({ current: null, dismissTimer: undefined });
  },
}));
