import sfx from "../../uitls/sfx.json";
import SoundSelect from "./soundSelect.form";
import useSoundSetting from "../../hooks/useSoundSetting";

export default function TimerSounds() {
  const {
    handleAlarmChange,
    handleAlarmVolume,
    handleMusicChange,
    handleMusicVolume,
    selectedAlarm,
    selectedMusic,
    musicVolume,
    alarmVolume,
    toggleAlarm,
    toggleMusic,
    isAlarm,
    isMusic,
  } = useSoundSetting();

  const availableSounds = sfx;

  return (
    <>
      <SoundSelect
        label="Alarm"
        enabled={isAlarm}
        options={availableSounds.alarm}
        selectedSound={selectedAlarm}
        onSoundChange={(val) => handleAlarmChange(val)}
        volume={alarmVolume}
        onVolumeChange={(val) => handleAlarmVolume(val)}
        onToggle={toggleAlarm}
      />
      <SoundSelect
        label="Music"
        enabled={isMusic}
        options={availableSounds.music}
        selectedSound={selectedMusic}
        onSoundChange={(val) => handleMusicChange(val)}
        volume={musicVolume}
        onVolumeChange={(val) => handleMusicVolume(val)}
        onToggle={toggleMusic}
      />
    </>
  );
}
