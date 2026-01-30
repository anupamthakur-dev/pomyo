import { useEffect, useRef, useState } from "react";

import { clamp, convertToMinutes, convertToSeconds } from "../uitls/helper";
import { usePomyoAudioStore } from "../core/controllers";
import type { MODE, Settings } from "../type";
import { useSettingsStore } from "../store/settings.store";
import { useTomatoStore } from "../store/tomato.store";

export function useSetTimerModal(mode: MODE) {
  const { animationController } = useTomatoStore();
  const { playGearDecrease, playGearIncrease } = usePomyoAudioStore();
  const { updateSettings,getSetting } = useSettingsStore();
  const [selectedMode, setSelectedMode] = useState<MODE>(mode);
  const [count,setCount] = useState(0);
  const currentCount = useRef<number>(0);
  const modeDuration = useRef<number | null>(null);
  const lastTouchX = useRef<number | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
   const STEP = 30; // pixels per step

  const handleDelta = (delta: number) => {
    if (modeDuration.current === null) return;

   
    const steps = Math.trunc(delta / STEP);

    if (steps === 0) return;

     const clampedSteps =clamp(steps,-1,1);

    const next = clamp(modeDuration.current + clampedSteps, 1, 59);
    if (next === modeDuration.current) return;

    modeDuration.current = next;
    currentCount.current = next;
  

    clampedSteps > 0 ? playGearIncrease() : playGearDecrease();

    animationController?.tickRotate(convertToSeconds(next, 0));
    setCount(next);
    scheduleCommit();
  };

  function updateModeSetting(mode: MODE, duration: number): Partial<Settings> {
    if (mode === "focus") {
      return { focusTime: convertToSeconds(duration,0) };
    }

    if (mode === "short-break") {
      return { breakTime: convertToSeconds(duration,0) };
    }
    return { longBreakTime: convertToSeconds(duration,0) };
  }

  function scheduleCommit() {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => {
      updateSettings(updateModeSetting(selectedMode, currentCount.current));
    }, 250);
  }

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    handleDelta(-e.deltaY);
  }

  const onTouchStart = (e: React.TouchEvent) => {
    lastTouchX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (lastTouchX.current === null) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - lastTouchX.current;

    lastTouchX.current = currentX;

    // deltaX is equivalent to wheel deltaY
    handleDelta(-deltaX);
  };

  const onTouchEnd = () => {
    lastTouchX.current = null;
  };

  function switchMode(mode:MODE){
    setSelectedMode(mode);
  }

  useEffect(()=>{
  //  currentCount.current = 0;

  if (selectedMode === "focus") {
  const duration = getSetting("focusTime"); 
  const minutes = convertToMinutes(duration).min;

  modeDuration.current = minutes;
  currentCount.current = minutes;

  setCount(minutes);
  animationController?.tickRotate(duration);
}

   if(selectedMode === 'short-break'){
    const duration =getSetting('breakTime');
    const minutes = convertToMinutes(duration).min;

    modeDuration.current = minutes;
    currentCount.current = minutes;

    setCount(minutes)
    animationController?.tickRotate(duration)
   }

   if(selectedMode === "long-break"){
    const duration =getSetting("longBreakTime");
    const minutes = convertToMinutes(duration).min;

    modeDuration.current = minutes;
    currentCount.current = minutes;

    setCount(minutes)
    animationController?.tickRotate(duration)
   }
    
   return ()=>{
    if (debounce.current) {
    clearTimeout(debounce.current);
  }
    currentCount.current = 0;
    modeDuration.current = null;
    debounce.current = null;
    lastTouchX.current = null;
   }
  },[selectedMode,animationController,getSetting,setCount])

  return { onWheel, onTouchEnd, onTouchMove, onTouchStart,switchMode,selectedMode,count};
}
