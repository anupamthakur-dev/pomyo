import TimerWorker from "../timer/timer.worker.ts?worker";
import type { Listener, Unsubscribe } from "../type";
import { EventEmitter } from "./eventEmitter";
import type { TimerBus, TimerCommandMessage, TimerEventMessage} from './timer.types'



export class TimerEngine implements TimerBus {
  private isWorkerReady:boolean=false;
  private worker: Worker;
  private emitter = new EventEmitter();

  constructor() {
    this.worker = new TimerWorker();
    this.worker.onmessage = this.handleMessage;
  }

  private handleMessage = (e: MessageEvent<TimerEventMessage>) => {
    const message = e.data;
    if(message.type==="ready"){
    
       this.isWorkerReady = true;
       this.emitter.emit("ready", null);
       return;
    }
    this.emitter.emit(message.type,message.payload);
  };

  subscribe:TimerBus['subscribe']=(
    type,
    cb
  ) => {
    return this.emitter.on(type, cb);
  }

  post:TimerBus['post']=(type,payload)=> {
    console.log("commmand :", {type,payload})
    this.worker.postMessage({type,payload});
  }
  isReady(){
    return this.isWorkerReady;
  }
  destroy() {
    this.worker.terminate();
  }
}
