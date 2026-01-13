import { create } from "zustand";
import type { NotifyStore } from "../type";

export const useNotifyStore = create<NotifyStore>((set, get) => ({
  current: null,
  dismissTimer: undefined,

  notify(notification) {
    const { dismissTimer } = get();

    if (dismissTimer) {
      clearTimeout(dismissTimer);
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (notification.autoCloseMs) {
      timer = setTimeout(() => {
        set({ current: null, dismissTimer: undefined });
      }, notification.autoCloseMs);
    }

    set({
      current: notification,
      dismissTimer: timer,
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
