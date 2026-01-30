import type { TomatoAnimationController } from "../controller/tomatoController";
import type {
  TimerBus,
  TimerEventMap,
  TimerPlugin,
} from "../timer/timer.types";

export class ModelPlugin implements TimerPlugin {
  id = "tomato-plugin";
  private animator: TomatoAnimationController | null = null;
  private unsub?: (() => void)[] = [];
  
  constructor(animator:TomatoAnimationController){
    this.animator = animator;
  }
  attach(bus: TimerBus): void {
    this.unsub = [
      bus.subscribe("init", (payload: TimerEventMap["init"]) => {
        this.animator?.introSeperateAndRotate(payload.duration);
      }),
      bus.subscribe("tick",(payload:TimerEventMap['tick'])=>{
        this.animator?.tickRotate(payload.remaining)
      })
    ];
  }

  detach(): void {
      this.unsub?.forEach(cb => cb());
      this.unsub = undefined;

  }
}
