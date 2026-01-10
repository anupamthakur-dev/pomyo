import { useTodoStore } from "../store/todo.store";
import type { TimerPlugin,TimerBus } from "../timer/timer.types";

export class TaskPlugin implements TimerPlugin {
  id = "task-plugin";
  private unsub?: () => void;
  private taskId: string;

  constructor(taskId: string) {
    this.taskId = taskId;
  }

  attach(bus: TimerBus) {
    this.unsub = bus.subscribe("complete", (e) => {
      if (e.mode === "focus") {
        useTodoStore.getState().recordCompletion(this.taskId)
      }
    });
  }

  detach() {
    this.unsub?.();
    this.unsub = undefined;
  }
}
