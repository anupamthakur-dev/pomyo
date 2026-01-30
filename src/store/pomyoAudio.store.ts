import { create } from "zustand";
import type { AudioManager } from "../controller/audioController";
import { useSettingsStore } from "./settings.store";
import { percentToVolumn } from "../uitls/helper";

interface PomyoAudioStore {
  music: string;
  alarm: string;
  musicVolume: number;
  alarmVolume: number;
  musicEnabled: boolean;
  alarmEnabled: boolean;
  playAlarm(): void;
  playLoop(): void;
  stopAll(): void;
  stopMusic?(): void; // future enhancement
  playMusic?(): void; // future enhancement
  stopLoop(): void;
  setMusicVolume(vol: number): void;
  setAlarmVolume(vol: number): void;
  setMusic(music: string): void;
  setAlarm(alarm: string): void;
  playDemo(music: string, volimn: number): void;
  playGearIncrease(): void;
  playGearDecrease(): void;
}

export function createPomyoAudioStore(pomyoSound: AudioManager) {
  return create<PomyoAudioStore>((set, get) => {
    function loop() {
      const { music, musicVolume, alarm } = get();
      pomyoSound.stop(alarm);
      pomyoSound.loop(music, percentToVolumn(musicVolume));
    }

    function alarm() {
      const { alarm, alarmVolume } = get();
      pomyoSound.stopAllLoops();
      pomyoSound.play(alarm, { volume: percentToVolumn(alarmVolume) });
    }

    return {
      music: "kitchen",
      alarm: "bell",
      musicVolume: 25,
      alarmVolume: 25,
      musicEnabled: true,
      alarmEnabled: true,
      playLoop: () => {
        const { musicEnabled } = get();
        if (!musicEnabled) return;
        loop();
      },
      playAlarm: () => {
        const { alarmEnabled } = get();
        if (!alarmEnabled) return;
        alarm();
      },
      stopLoop: () => {
        const { music } = get();
        pomyoSound.stopLoop(music);
      },
      stopAll: () => {
        pomyoSound.stopAll();
      },
      setAlarm(alarm) {
        set({ alarm });
      },
      setAlarmVolume(vol) {
        set({ alarmVolume: vol });
      },
      setMusic(music) {
        set({ music });
      },
      setMusicVolume(vol) {
        const { music } = get();
        pomyoSound.setLoopVolume(music, percentToVolumn(vol));
        set({ musicVolume: vol });
      },
      playDemo(music: string, volume: number) {
        pomyoSound.play(music, { volume: percentToVolumn(volume) }, true);
      },
      playGearDecrease() {
        pomyoSound.play("gear", { volume: 1, pitch: 1.2 });
      },
      playGearIncrease() {
        pomyoSound.play("gear", { volume: 1, pitch: 1.3 });
      },
    };
  });
}

export function bindAudioToSettings(
  audioStore: ReturnType<typeof createPomyoAudioStore>
) {
  const settings = useSettingsStore.getState().settings;

  // 1️⃣ initial sync (important)
  audioStore.setState(
    {
      music: settings.music.sound,
      alarm: settings.alarm.sound,
      musicVolume: settings.music.volume,
      alarmVolume: settings.alarm.volume,
      musicEnabled: settings.enableMusic,
      alarmEnabled: settings.enableAlarm,
    },
    false
  );

  // 2️⃣ live sync
  useSettingsStore.subscribe(({ settings }) => {
    audioStore.setState(
      {
        music: settings.music.sound,
        alarm: settings.alarm.sound,
        musicEnabled: settings.enableMusic,
        alarmEnabled: settings.enableAlarm,
      },
      false
    );

    audioStore.getState().setMusicVolume(settings.music.volume);
    audioStore.getState().setAlarmVolume(settings.alarm.volume);
  });
}
