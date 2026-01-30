import { useEffect } from "react";
import { useSettingsStore } from "../store/settings.store";

import { useBootStore } from "../store/boot.store";

export function SettingsHydrationGate() {
  const markReady = useBootStore(s => s.markReady);


  useEffect(() => {
    if (useSettingsStore.persist.hasHydrated()) {

      markReady('settings')
      return;
    }

    const unsub = useSettingsStore.persist.onFinishHydration(() => {

      markReady("settings")
    });

    return () => unsub?.();
  }, []);


  return null;
}
