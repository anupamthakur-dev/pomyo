import { useSettingsStore } from "../store/settings.store";
import type { SoundSetting } from "../type";
import { playDemo, stopAlarm, stopAllPlay } from "../uitls/audio";

export default function useSoundSetting() {
  const { updateSettings, getSetting } = useSettingsStore();

  const selectedMusic = getSetting().music.sound;
  const selectedAlarm = getSetting().alarm.sound;

  const musicVolume = getSetting().music.volume;
  const alarmVolume = getSetting().alarm.volume;

  const isAlarm = getSetting().enableAlarm;
  const isMusic = getSetting().enableMusic;

  const handleAlarmChange = (value: string) => {
    stopAllPlay();

    playDemo(value, getSetting().alarm.volume);
    updateSettings({ alarm: { ...getSetting().alarm, sound: value } });
  };
  const handleMusicChange = (value: string) => {
    stopAllPlay();

    playDemo(value, getSetting().music.volume);
    updateSettings({ music: { ...getSetting().music, sound: value } });
  };

  const handleAlarmVolume = (vol: number) => {
    stopAllPlay();
    playDemo(getSetting().alarm.sound, vol);
    updateSettings({ alarm: { ...getSetting().alarm, volume: vol } });
  };
  const handleMusicVolume = (vol: number) => {
    stopAllPlay();
    playDemo(getSetting().music.sound, vol);
    updateSettings({ music: { ...getSetting().music, volume: vol } });
  };

  const toggleMusic = () => {
    updateSettings({ enableMusic: !getSetting().enableMusic });
  };
  const toggleAlarm = () => {
    updateSettings({ enableAlarm: !getSetting().enableAlarm });
  };

  return {
    handleAlarmChange,
    handleAlarmVolume,
    handleMusicChange,
    handleMusicVolume,
    toggleAlarm,
    toggleMusic,
    musicVolume,
    alarmVolume,
    selectedAlarm,
    selectedMusic,
    isAlarm,
    isMusic
  };
}
