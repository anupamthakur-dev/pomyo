import { useEffect } from "react";

import { useTomato } from "../context/tomatoProvider";
import { usePomyoStore } from "../core/timer";

export default function PomodoroTomatoBridge() {
  const subscribe = usePomyoStore(s => s.subscribeToEvent);
  const {animationController} = useTomato();

  useEffect(() => {
    if(!animationController) return;
    const unsubInit = subscribe("init", ({ duration }) => {
      animationController.introSeperateAndRotate(duration);
    });

    const unsubTick = subscribe("tick", ({ remaining }) => {
      animationController.tickRotate(remaining);
    });

    return () => {
      unsubInit();
      unsubTick();
    };
  }, [subscribe, animationController]);

  return null; // headless
}
