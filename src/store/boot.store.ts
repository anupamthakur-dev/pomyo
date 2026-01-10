import { create } from "zustand";
import type { BootKey } from "../type";

interface BootState {
  readySet: Set<BootKey>;
  isBooted: boolean;
  markReady: (key: BootKey) => void;
}

// Keep static config outside the store to prevent recreation
const REQUIRED_BOOT_KEYS: BootKey[] = ['model', 'settings', 'sounds', 'worker','engine'];

export const useBootStore = create<BootState>((set) => ({
  readySet: new Set<BootKey>(),
  isBooted: false,

  markReady: (key: BootKey) => {
    set((state) => {
     
      const newSet = new Set(state.readySet).add(key);
      
      
      const allReady = REQUIRED_BOOT_KEYS.every((k) => newSet.has(k));

      return {
        readySet: newSet,
        isBooted: allReady,
      };
    });
  },
}));
