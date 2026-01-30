// timer.worker.ts (patched resume behavior)
import type { ITimerInit } from "../type";
import type { TimerCommandMessage } from "./timer.types";
import { TimerController } from "../controller/timerController";

class MyTimer extends TimerController {
  protected _onTicking(): void {
    postMessage({ type: "tick", payload: { remaining: this.remainingsSec } });
  }

  protected _onTimerFinish(): void {
    let payload = {
      mode: this.mode,
    };
    postMessage({ type: "complete", payload });
  }

  protected _onStatusUpdate(): void {
    postMessage({
      type: "status",
      payload: { status: this._status, mode: this.mode },
    });
  }

  protected _onInit(duration: number): void {
    postMessage({ type: "init", payload: { duration } });
  }
}

const pomodoro = new MyTimer();
postMessage({ type: "ready" });

self.onmessage = (message: MessageEvent<TimerCommandMessage>) => {
  const command = message.data;
 
  switch (command.type) {
    case "INIT":
      pomodoro.init(command.payload as ITimerInit);

      break;
    case "START":
      pomodoro.start();
      break;

    case "PAUSE":
      pomodoro.pause();
      break;

    case "RESUME":
      pomodoro.resume();
      break;

    case "RESET":
      pomodoro.reset(command.payload.duration);
      break;

    default:
      console.warn("Unknown worker command:", command);
  }
};
