// src/components/Model.tsx
import { memo, useEffect, useRef } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";


import { INITIAL_Y } from "../uitls/defaultVal";

import { useSettingsStore } from "../store/settings.store";
import { useTomatoStore } from "../store/tomato.store";
import type { ModelSpring } from "../type";

function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const initialRotateTarget = useSettingsStore.getState().settings.focusTime;

  const { animationController, model,attachModelPlugin,detachModelPlugin } = useTomatoStore();
// @ts-ignore
  const [springs, api] = useSpring<ModelSpring>(() => ({
    positionY: INITIAL_Y,
    rotationZ: 0,
    config: { tension: 60, friction: 16 },
  }));
  
  // Register model + animation controller once
  useEffect(() => {
    if (!animationController || !model) return;

    animationController.setAnimationApi(api);

    animationController.introSeperateAndRotate(initialRotateTarget);

    attachModelPlugin()

    return () => {
      animationController.setAnimationApi(null);
      animationController.isIntroDone = false;
      detachModelPlugin()
    };
  }, [animationController,model, initialRotateTarget]);

  if (!model) return <div>NO model !!!</div>;

  return (
    <group ref={groupRef}>
      <primitive object={model.tomato_bottom} />
       {/* @ts-ignore */}
      <a.primitive
        object={model.tomato_top}
        position-y={springs.positionY }
        rotation-z={springs.rotationZ }
      />
    </group>
  );
}

export default memo(Model);
