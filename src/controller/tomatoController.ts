// TomatoController.ts
import { SpringRef } from "@react-spring/core";
import { secondsToRadians } from "../uitls/helper";
import { INITIAL_Y, SEPERATE_Y } from "../uitls/defaultVal";
import type { ModelSpring } from "../type";

export class TomatoAnimationController {
  private _INITIAL_Y = INITIAL_Y;
  private _SEPERATE_Y = SEPERATE_Y;
  public isIntroDone = false;

  private animationApi: SpringRef<ModelSpring> | null = null;


  setAnimationApi(
    api: SpringRef<ModelSpring> |null
  ) {
    this.animationApi = api;
  }
// target = seconds i.e is later on covert to radian
  private _introAnimation(target: number) {
    if (!this.animationApi) return;

    const rad = this._Radian(target);

    this.animationApi.start({
      from: { positionY: this._INITIAL_Y, rotationZ: 0 },
      to: async (next) => {
        await next({ positionY: this._SEPERATE_Y });
        await next({ rotationZ: rad });
      },
    });
   
  }

  private _Radian = secondsToRadians;
  // targetRotation = seconds i.e is later on covert to radian
  introSeperateAndRotate(targetRotation: number) {
    if (!this.animationApi) return;

    if (!this.isIntroDone) {
      this._introAnimation(targetRotation);
      this.isIntroDone = true;
      return;
    }
    // used for init event. Rotate to setted duration of pomo
    this.tickRotate(targetRotation);
  }
// target = seconds i.e is later on covert to radian
  tickRotate(rotation: number) {
    if (!this.animationApi) return;

    const rad = this._Radian(rotation);

    this.animationApi.start({ rotationZ: rad });
  }
}
