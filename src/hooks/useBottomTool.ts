import { useModal } from "../context/modalProvider";
import type { ITodo, MODE } from "../type";
import { pomyoCamera } from "../core/controllers";
import { useTodoPanel } from "../store/UI/todoPanel.store";
import useTimerActions from "./useTimerActions";
import { useCallback } from "react";
import { useNotifyStore } from "../store/notify.store";
import { generateUUID } from "../uitls/helper";
import { useFlags } from "../store/flags.store";
import { useTomatoStore } from "../store/tomato.store";

export default function useBottomTool() {
  const { open, modal } = useModal();
  const { canOpenSetTimer } = useTimerActions();
  const notify = useNotifyStore((s) => s.notify);
  const closeTodoPanel = useTodoPanel((state) => state.close);
  
  const  {attachModelPlugin,detachModelPlugin} = useTomatoStore()

  const editingMode = modal.type === "set-timer" ? modal.mode : null;
  const openSetting = () => {
    open({ type: "settings" });
  };

  const isSetTimerActive = modal.type === "set-timer" ? true : false;

  const closeSetTimer = () => {
    if (!pomyoCamera.api || !pomyoCamera.camera) return;
    pomyoCamera.wideShot();
    attachModelPlugin()

  };

  const setTimer = (mode: MODE) => {
    if (!pomyoCamera.api || !pomyoCamera.camera) return;
    pomyoCamera.closeShot(); // zoom in
    closeTodoPanel();
   detachModelPlugin();
    open({ type: "set-timer", mode, onClose: closeSetTimer });
  };

  const openSetTimer = useCallback(
    (mode: MODE) => {
      if (!canOpenSetTimer) {
        notify({
          id: generateUUID(),
          title: "Timer Active",
          message: "Please stop the timer before changing the time.",
          type: "info",
        });

        return;
      }
      setTimer(mode);
    },
    [canOpenSetTimer]
  );

  const openAddTodo = () => {
    open({ type: "todo-add-form" });
  };
  const openUpdateTodo = (todo: ITodo) => {
    open({ type: "todo-update-form", todo });
  };

  return {
    openSetting,
    openSetTimer,
    openAddTodo,
    openUpdateTodo,
    editingMode,
    isSetTimerActive,
  };
}
