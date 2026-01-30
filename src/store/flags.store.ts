import { create } from "zustand";

interface flags {
    isTimerModal:boolean;
    reInitTimer:boolean;
    flagReinitTimer(flag:boolean):void;
    flagTimerModal(flag:boolean):void
}

export const useFlags = create<flags>((set)=>({
    isTimerModal:false,
    reInitTimer:false,
    flagTimerModal(flag) {
        set({isTimerModal:flag});
    },
    flagReinitTimer(flag) {
        set({reInitTimer:flag});
    },
}))