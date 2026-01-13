import { create } from "zustand";
import type { MODE, timerConfig, TimerStatus } from "../type";
import { type TimerBus, type TimerEventMap } from "../timer/timer.types";
import type { TimerEngine } from "../timer/timerEngine";
import {
  decideNextSession,
  getModeDuration,
  getSavedTimerConfig,
} from "../uitls/helper";

interface PomyoState {
  mode: MODE;
  focusSessionCompleted: number;
  baseTimerConfig: timerConfig;
  timerConfig: timerConfig;
  taskFocusOverride?: number;
  flowMode: boolean;
  status: TimerStatus;
  blockNextAutoStart:boolean;
  blockAutoStartOnce(reason:string):void;
  applyBaseTimerConfig: (base: timerConfig) => void;
  toggleFlowMode: () => void;
  start: () => void;
  initTaskPomyo: (focusDuration: number) => void;
  clearTaskPomyo: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  subscribeToEvent: TimerBus["subscribe"];
}

export function createPomyoStore(engine: TimerEngine) {
  return create<PomyoState>((set, get) => {
    // flag for is timer initailise atleast one time
    let isFirstInitialise = false;

    function resolveTimerConfig(base: timerConfig, override?: number) {
      if (!override) return base;
      return { ...base, focus: override } as timerConfig;
    }

    function scheduleNextSession(nextSession: MODE) {
      set({ mode: nextSession });

      if (!get().flowMode) return;

      if(get().blockNextAutoStart){
        set({blockNextAutoStart:false});
        return;
      }

      setTimeout(() => {
        engine.post("START");
      }, 1500);
    }

    function intialiseTimer(mode: MODE) {
      if (mode === "focus") {
        engine.post("INIT", { duration: get().timerConfig.focus, mode });
      }
      if (mode === "short-break") {
        engine.post("INIT", {
          duration: get().timerConfig.shortBreak,
          mode,
        });
      }
      if (mode === "long-break") {
        engine.post("INIT", {
          duration: get().timerConfig.longBreak,
          mode,
        });
      }

      scheduleNextSession(mode);
    }

    function onComplete(payload: TimerEventMap["complete"]) {
      const completedMode = payload.mode;
      let nextFocusCount = get().focusSessionCompleted;

      if (completedMode === "focus") {
        nextFocusCount += 1;
      }
      const nextMode = decideNextSession(completedMode, get().focusSessionCompleted);

      set({ focusSessionCompleted: nextFocusCount });
      intialiseTimer(nextMode);
    }

    function onStatus(payload: TimerEventMap["status"]) {
      set({ status: payload.status });
    }

    function subscribeToEngine() {
      engine.subscribe("complete", onComplete);
      engine.subscribe("status", onStatus);
    }

    const actions = {
      start() {
        if (!isFirstInitialise) {
          engine.post("INIT", {
            duration: get().timerConfig.focus,
            mode: "focus",
          });
          isFirstInitialise = true;
        }
        engine.post("START");
      },
      pause() {
        engine.post("PAUSE");
      },
      reset() {
        const m = get().mode;
        const d = get().timerConfig;
        if (m === "focus") {
          engine.post("RESET", { duration: d.focus });
          return;
        }
        if (m === "short-break") {
          engine.post("RESET", { duration: d.shortBreak });
          return;
        }
        if (m === "long-break") {
          engine.post("RESET", { duration: d.longBreak });
          return;
        }
      },
      resume() {
        engine.post("RESUME");
      },

      initTaskPomyo(duration: number) {
        set({
          timerConfig: resolveTimerConfig(get().baseTimerConfig, duration),
          focusSessionCompleted: 0,
          taskFocusOverride: duration,
          mode: "focus",
        });
        engine.post("INIT", { mode: "focus", duration });
      },

      clearTaskPomyo() {
        set({
          timerConfig: resolveTimerConfig(get().baseTimerConfig),
          focusSessionCompleted: 0,
          taskFocusOverride: undefined,
          mode: "focus",
        });
        engine.post("INIT", {
          mode: "focus",
          duration: get().baseTimerConfig.focus,
        });
      },
    };

    subscribeToEngine();

    return {
      mode: "focus",
      focusSessionCompleted: 0,
      baseTimerConfig: getSavedTimerConfig(),
      timerConfig: getSavedTimerConfig(),
      taskFocusOverride: undefined,
      flowMode: false,
      status: "idle",
      blockNextAutoStart:false,
      blockAutoStartOnce:(reason:string)=>{
        set({blockNextAutoStart:true})
        console.log(reason)
      },
      applyBaseTimerConfig(base) {
        set((state) => {
          const nextTimerConfig = resolveTimerConfig(
            base,
            state.taskFocusOverride
          );
          const shouldInit =
            state.status !== "ticking" && state.status !== "paused";
          if (shouldInit) {
            engine.post("INIT", {
              mode: state.mode,
              duration: getModeDuration(state.mode, base),
            });
          }
          return {
            baseTimerConfig: base,
            timerConfig: nextTimerConfig,
          };
        });
      },
      toggleFlowMode() {
        set({ flowMode: !get().flowMode });
      },
      ...actions,
      subscribeToEvent(eventName, cb) {
        return engine.subscribe(eventName, cb);
      },
    };
  });
}
