import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useTomatoStore } from "../store/tomato.store";
import { useBootStore } from "../store/boot.store";


export const TomatoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { nodes } = useGLTF("/pomodoro.glb");
  const setModel = useTomatoStore((s) => s.setModel);
  const markReady = useBootStore((s) => s.markReady);

  useEffect(() => {
    if (nodes) {
      setModel(nodes);
      markReady("model");
    }
  }, [nodes, setModel, markReady]);

  return <>{children}</>;
}