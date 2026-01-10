import { engine } from "./timer";
import { useBootStore } from "../store/boot.store";

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
