import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
} from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import { pomyoCamera } from "../../core/controllers";
import { useSpring, animated } from "@react-spring/three";

const CanvasContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
   
  const isMobile = window.matchMedia("(pointer : coarse)").matches;
  return (
    <div className="canvasContainer">
      <Canvas >
        <CameraBinder />
   
  {/* Key Light (top-front) */}
  <directionalLight
    position={[10, 10, 10]}
    intensity={isMobile?1.2 : 0.7}
    color="#ffffff"
  />

  {/* Fill Light (top-back) */}
  <directionalLight
    position={[-10, 5, 5]}
    intensity={isMobile?1.2 : 0.7}
    color="#ffeedd"
  />

  {/* Rim Light (back-top) */}
  <directionalLight
    position={[0, 15, -10]}
    intensity={isMobile?1.5 : 1}
    color="#80aaff"
  />

  {/* Bottom Light (warm underglow) */}
  <pointLight
    position={[0, -5, 0]}
    intensity={isMobile?1.5 : 0.7}
    color="#ffccaa"
  />

  {/* Front Light (bright and friendly) */}
  
<pointLight
    position={[0, 0, 5]}
    intensity={isMobile?7 : 6}
    color="#ffffff"
  />
  {/* Hemisphere Light (ambient sky & ground) */}
  <hemisphereLight
    color="#cceeff"
    groundColor="#c0c0c0"
    intensity={isMobile?1.5 : 1}
  />

  {/* Ambient Light */}
  <ambientLight intensity={isMobile?1.2 : 0.7} />
        {/* === Model === */}

        {children}

        {/* Environment & Controls */}
       {/* <Environment preset="sunset" background={false} />  */}
      </Canvas>
    </div>
  );
};

function CameraBinder() {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [spring, api] = useSpring(() => ({
    position: [0, 0, 5],
    lookAtX: 0,
    lookAtY: 0,
    lookAtz: 0,
    config: { mass: 1, tension: 90, friction: 18 },
  }));

  useEffect(() => {
    if (cameraRef.current) {
      pomyoCamera.setCamera(cameraRef.current);
      pomyoCamera.setApi(api);
    }
  }, []);

  const AnimatedCamera = animated(PerspectiveCamera);

  return (
    <AnimatedCamera
      position={spring.position as any}
      makeDefault
      ref={cameraRef}
      fov={60}
    ></AnimatedCamera>
  );
}

export default memo(CanvasContainer);
