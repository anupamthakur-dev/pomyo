import type {
  TimerBus,
  TimerEventMap,
  TimerPlugin,
} from "../timer/timer.types";
import type { MODE } from "../type";

export class TitleBarPlugin implements TimerPlugin {
  id = "titlebar-plugin";

  private unsub: (() => void)[] = [];
  private defaultTitle: string;
  private options: Record<string, string | boolean>;
  private mode: MODE = "focus";
  private lastRemainings: number = 0;

  constructor(options?: { showWhenPaused?: boolean; prefix?: string }) {
    this.options = options ? options : {};
    this.defaultTitle = document.title;
  }

  attach(bus: TimerBus) {
    this.unsub.push(
      bus.subscribe("tick", this.handleTick),
      bus.subscribe("status", this.handleStatus)
    );
  }

  detach() {
    this.unsub.forEach((fn) => fn());
    this.restoreTitle();
  }

  private handleTick = (ctx: TimerEventMap["tick"]) => {
    if (this.lastRemainings === ctx.remaining) return;
    document.title = this.formatTitle(ctx);
    this.lastRemainings = ctx.remaining;
  };

  private handleStatus = (ctx: TimerEventMap["status"]) => {
    
    if (ctx.status === "paused" && !this.options?.showWhenPaused) {
      this.restoreTitle();
    }
    
    if (ctx.status === "idle") {
      this.restoreTitle();
    }

    this.mode = ctx.mode;
  };

  private restoreTitle = () => {
    document.title = this.defaultTitle;
  };

  private formatTitle(ctx: TimerEventMap["tick"]) {
    // if (this.options?.format) return this.options.format(ctx);

    const mm = String(Math.floor(ctx.remaining / 60)).padStart(2, "0");
    const ss = String(ctx.remaining % 60).padStart(2, "0");

    const suffix = this.mode === "focus" ? "Focus Time" : "Break Time";

    return `${this.options?.prefix ?? ""}${mm}:${ss} - ${suffix}`;
  }
}
