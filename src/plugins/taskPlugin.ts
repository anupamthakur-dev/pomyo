import { usePomyoStore } from "../core/timer";
import { useTodoStore } from "../store/todo.store";
import type { TimerPlugin, TimerBus } from "../timer/timer.types";

export class TaskPlugin implements TimerPlugin {
  id = "task-plugin";
  private unsub?: (() => void)[];
  private taskId: string;

  constructor(taskId: string) {
    this.taskId = taskId;
  }

  attach(bus: TimerBus) {
    const unsubComplete = bus.subscribe("complete", (e) => {
      const todoStore = useTodoStore.getState();
      const pomyoStore = usePomyoStore.getState();

      if (e.mode === "focus" && !todoStore.isTaskCompleted(this.taskId)) {
        todoStore.recordCompletion(this.taskId);
      }

      if (todoStore.isTaskCompleted(this.taskId)) {
        pomyoStore.blockAutoStartOnce('task-completed');
      }
    });

    this.unsub = [unsubComplete];
  }

  detach() {
    this.unsub?.forEach((unsub) => unsub());
    this.unsub = undefined;
  }
}
