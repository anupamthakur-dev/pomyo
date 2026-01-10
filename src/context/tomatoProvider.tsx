// TomatoContext.tsx
import { createContext, useContext, useEffect, useMemo } from "react";
import { tomatoAnimate } from "../core/controllers";
import { TomatoAnimationController } from "../controller/tomatoController";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

import { useBootStore } from "../store/boot.store";

const TomatoContext = createContext<{
  animationController: TomatoAnimationController | null;
  model: { [name: string]: THREE.Object3D<THREE.Object3DEventMap> } | null;
}>({ animationController: null, model: null });

export const TomatoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { nodes } = useGLTF("/pomodoro.glb");
  const  markReady  = useBootStore(s=>s.markReady);
  useEffect(() => {
    if (tomatoAnimate && nodes) {
      markReady('model');
    }
  }, [])
  const value = useMemo(
    () => ({
      animationController: tomatoAnimate,
      model: nodes,
    }),
    [tomatoAnimate, nodes]
  );
  return (
    <TomatoContext.Provider value={value}>{children}</TomatoContext.Provider>
  );
};

export const useTomato = () => {
  const ctx = useContext(TomatoContext);
  if (!ctx) throw new Error("useTomato must be used within TomatoProvider");
  return ctx;
};
