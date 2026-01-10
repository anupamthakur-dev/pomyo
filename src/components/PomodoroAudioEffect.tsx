import { useBootStore } from '../store/boot.store.ts';
import { useEffect } from 'react';
import gearSound from "../assets/gear3.mp3";
import sfxs from '../uitls/sfx.json';
import { pomyoSound } from '../core/controllers.ts';

import { playComplete, playTicking, stopTicking } from '../uitls/audio';

import { usePomyoStore } from '../core/timer.ts';
import type {TimerEventMap } from '../timer/timer.types.ts';


export default function PomodoroAudioEffects() {
    const subscribe= usePomyoStore(s=>s.subscribeToEvent);
    const markReady = useBootStore(s=>s.markReady);

   useEffect(() => {
  let cancelled = false;

  const unlockHandler = () => {
    pomyoSound.unlock();
  };

  async function initSounds() {
    const sounds = {
      ...sfxs.ticking,
      ...sfxs.complete,
      gear: gearSound,
    };

    try {
      await pomyoSound.loadAll(sounds);

      if (!cancelled) {
        markReady("sounds"); // ✅ fires ONLY after all sounds loaded
      }
    } catch (err) {
      console.error("Failed to load sounds", err);
    }
  }

  initSounds();

  document.body.addEventListener("click", unlockHandler);

  return () => {
    cancelled = true;
    document.body.removeEventListener("click", unlockHandler);
  };
}, [markReady, pomyoSound]);


    useEffect(() => {
        const unsub = subscribe("status", (payload:TimerEventMap['status']) => {
            const { status } = payload
            if (status === "ticking") {
                playTicking();
                return;
            }

            // Anything else:
            stopTicking();
        });
        const unsub_complete = subscribe("complete", () => {

            playComplete();
        });

        return () => {
            unsub_complete();
            unsub();
        }; // cleanup to prevent leaks
    }, [subscribe]);
    return null
}
