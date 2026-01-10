import { createPomyoStore } from "../store/pomyo.store";
import { TimerEngine } from "../timer/timerEngine";
import { TimerPluginRegistry } from "../timer/timerPluginRegistry";

export const engine = new TimerEngine();
export const pluginRegistry = new TimerPluginRegistry(engine);
export const usePomyoStore = createPomyoStore(engine);