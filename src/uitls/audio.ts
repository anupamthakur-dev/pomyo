import { pomyoSound } from '../core/controllers';
import { useSettingsStore } from '../store/settings.store';

const maxVolume =25;
const settings = useSettingsStore.getState().settings;

export const playTicking=():void=>{
    if(!settings.enableTicking) return;
    const sfx = settings.ticking;
    stopComplete();
    pomyoSound.loop(sfx.sound,sfx.volume/maxVolume);
}

export const playComplete = ():void =>{
    if(!settings.enableComplete) return;
    const sfx = settings.complete;
    pomyoSound.stopAllLoops();
    pomyoSound.play(sfx.sound,{volume:sfx.volume/maxVolume})
}

export const playDemo=(sfxName:string,volume:number):void=>{
    pomyoSound.play(sfxName,{volume:volume/maxVolume},true);
}

export const stopComplete = ():void =>{
    const sfx = settings.complete;
    pomyoSound.stop(sfx.sound);
}

export const stopTicking =()=>{
    const sfx = settings.ticking;
    pomyoSound.stopLoop(sfx.sound);
}

export const playGearIncrease = ()=>{
    pomyoSound.play("gear", { pitch: 1.1 });
}
export const playGearDecrease = ()=>{
    pomyoSound.play("gear", { pitch: 1.2 });
}

export const stopAllPlay=()=>{
    pomyoSound.stopAll();
}