import { AudioManager } from "../controller/audioController";
import { CameraController } from "../controller/cameraController";
import { TomatoAnimationController } from "../controller/tomatoController";
import { createPomyoAudioStore } from "../store/pomyoAudio.store";

export const pomyoSound = new AudioManager();
export const tomatoAnimate = new TomatoAnimationController();
export const pomyoCamera = new CameraController();
export const usePomyoAudioStore = createPomyoAudioStore(pomyoSound);
