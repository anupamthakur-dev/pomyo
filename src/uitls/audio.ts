import { pomyoSound } from '../core/controllers';
import { useSettingsStore } from '../store/settings.store';

const maxVolume =25;
const settings = useSettingsStore.getState().settings;

export const playMusic=():void=>{
    if(!settings.enableMusic) return;
    const sfx = settings.music;
    stopAlarm();
    pomyoSound.loop(sfx.sound,sfx.volume/maxVolume);
}

export const playAlarm = ():void =>{
    if(!settings.enableAlarm) return;
    const sfx = settings.alarm;
    pomyoSound.stopAllLoops();
    pomyoSound.play(sfx.sound,{volume:sfx.volume/maxVolume})
}

export const playDemo=(sfxName:string,volume:number):void=>{
    pomyoSound.play(sfxName,{volume:volume/maxVolume},true);
}

export const stopAlarm = ():void =>{
    const sfx = settings.alarm;
    pomyoSound.stop(sfx.sound);
}

export const stopMusic =()=>{
    const sfx = settings.music;
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