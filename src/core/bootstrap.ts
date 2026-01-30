import { engine } from "./timer";
import { useBootStore } from "../store/boot.store";
import { useSettingsStore } from "../store/settings.store";
import { bindAudioToSettings } from "../store/pomyoAudio.store";
import { usePomyoAudioStore } from "./controllers";

const { markReady } = useBootStore.getState();

//engine = timerEngine


engine.subscribe("ready", () => {
  markReady("worker");
  markReady("engine");
});
// defensive sync check
if (engine.isReady()) {
  markReady("worker");
  markReady("engine");
}

if(useSettingsStore.persist.hasHydrated()){
  bindAudioToSettings(usePomyoAudioStore);
}else{
  console.log('not hydrated')
}