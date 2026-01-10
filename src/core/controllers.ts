import { AudioManager } from "../controller/audioController";
import { CameraController } from "../controller/cameraController";
import { TomatoAnimationController } from "../controller/tomatoController";

export const pomyoSound = new AudioManager();
export const tomatoAnimate = new TomatoAnimationController();
export const pomyoCamera = new CameraController();
