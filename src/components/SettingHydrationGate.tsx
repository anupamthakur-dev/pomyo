import { useEffect, useState } from "react";
import { useSettingsStore } from "../store/settings.store";

import { useBootStore } from "../store/boot.store";

export function SettingsHydrationGate() {
  const markReady  = useBootStore(s=>s.markReady);
const [hydrated, setHydrated] = useState(
  useSettingsStore.persist.hasHydrated()
);

useEffect(() => {
  if (useSettingsStore.persist.hasHydrated()) {
    setHydrated(true);
    markReady('settings')
    return;
  }

  const unsub = useSettingsStore.persist.onFinishHydration(() => {
    setHydrated(true);
    markReady("settings")
  });

  return () => unsub?.();
}, []);


  return null;
}
