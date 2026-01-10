import type { Unsubscribe, Listener} from "../type";
import type {TimerEventMessage} from './timer.types'
export class EventEmitter {
  private _events: Record<TimerEventMessage['type'], Listener[]> = {
    tick: [],
    complete: [],
    status: [],
    init: [],
    ready:[]
  };

  on(eventName: TimerEventMessage['type'], callback: Listener): Unsubscribe {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push(callback);

    return () => {
      this._events[eventName] = this._events[eventName].filter(
        (l) => l !== callback
      );
    };
  }

  emit(eventName: TimerEventMessage['type'], ...args: any[]) {
    if (!this._events[eventName]) return;
    this._events[eventName].forEach((l) => l(...args));
  }
}
