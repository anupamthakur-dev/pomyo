import type { Listener, MODE,TimerStatus } from "../type";



export type TimerCommandMap ={
  INIT: {mode: MODE; duration: number };
  START: undefined;
  PAUSE: undefined;
  RESUME: undefined;
  RESET: {duration:number};
}
export type TimerEventMap ={
  ready : undefined;
  tick:{remaining:number};
  init: { duration: number };
  complete: {  mode: MODE  };
  status: { status: TimerStatus,mode:MODE };
}

export type MessageFrom<T extends Record<string, object | undefined>>={
  [K in keyof T]: T[K] extends undefined
    ? { type: K }
    : { type: K; payload: T[K] };
}[keyof T]


export type TimerEventMessage = MessageFrom<TimerEventMap>;
export type TimerCommandMessage = MessageFrom<TimerCommandMap>;

export function createMessage<K extends keyof TimerCommandMap>(
  type: K,
  ...args: TimerCommandMap[K] extends undefined
    ? []
    : [payload: TimerCommandMap[K]]
){
  return args.length === 0
    ? { type }
    : { type, payload: args[0] };
}


export interface TimerBus {
  subscribe<T extends keyof TimerEventMap>(
    eventName: T,
    cb: Listener
  ): () => void;

  post<K extends keyof TimerCommandMap>(type:K,payload?: TimerCommandMap[K]): void;
}



export interface TimerPlugin {
  id: string;
  attach(bus: TimerBus): void;
  detach(): void;
}

export interface TitleContext {
  remaining: number; // seconds
  status: "running" | "paused" | "stopped";
  session: "focus" | "break";
}
