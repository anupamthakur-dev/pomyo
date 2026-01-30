import { create } from "zustand";
import * as THREE from "three";
import { TomatoAnimationController } from "../controller/tomatoController";
import { tomatoAnimate } from "../core/controllers";
import type { TimerPlugin } from "../timer/timer.types";
import { pluginRegistry, usePomyoStore } from "../core/timer";
import { ModelPlugin } from "../plugins/modelPlugin";
import { getModeDuration } from "../uitls/helper";

type TomatoState = {
  animationController: TomatoAnimationController | null;
  model: { [name: string]: THREE.Object3D<THREE.Object3DEventMap> } | null;

  plugin: TimerPlugin | null;

  attachModelPlugin(): void;
  detachModelPlugin(): void;

  setModel: (model: {
    [name: string]: THREE.Object3D<THREE.Object3DEventMap>;
  }) => void;
};

export const useTomatoStore = create<TomatoState>((set, get) => ({
  animationController: tomatoAnimate ?? null,
  model: null,
  plugin: new ModelPlugin(tomatoAnimate) ?? null,

  attachModelPlugin() {
    const { plugin,animationController } = get();
    if (!plugin || pluginRegistry.has("tomato-plugin")) return;

    pluginRegistry.register(plugin);
    if(!animationController?.isIntroDone) return;
    animationController?.tickRotate(getModeDuration(usePomyoStore.getState().mode,usePomyoStore.getState().timerConfig))
  },
  detachModelPlugin() {
    if (!pluginRegistry.has("tomato-plugin")) return;
    pluginRegistry.unregister("tomato-plugin");
  },

  setModel: (model) => set({ model }),
}));
