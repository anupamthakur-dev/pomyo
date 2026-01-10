import {  useCallback, useEffect } from "react";
import { usePomyoStore } from "../core/timer";
import { pluginRegistry } from "../core/timer";
import { TaskPlugin } from "../plugins/taskPlugin";
import { useTodoStore } from "../store/todo.store";


export default function useActiveTodoTimer() {
  const {
    status,
    initTaskPomyo,
    reset,
    subscribeToEvent:subscribe,
  } = usePomyoStore();
  const {activeTodoId,deactivateActiveTodo,markCompleted} = useTodoStore();

  const isTimerActive = status === 'ticking';
  
  const markTaskCompleted = useCallback(()=>{
    if(isTimerActive) return;
    if(!activeTodoId) return;
    markCompleted(activeTodoId)
  },[isTimerActive,activeTodoId])

  const deactivateTask = ()=>{
    reset();
    deactivateActiveTodo();
    pluginRegistry.unregister('task-plugin');
  }

  useEffect(()=>{
    if(!activeTodoId) return;
    
    const task = useTodoStore.getState().getTodos().find( t=>t.id === activeTodoId);

    if(!task) return;

    pluginRegistry.register(new TaskPlugin(activeTodoId));
    initTaskPomyo(task.focusDuration);

    return ()=>{
      pluginRegistry.unregister('task-plugin');
    }

  },[activeTodoId,initTaskPomyo,pluginRegistry])
   
  return {
         isTimerActive,
         markTaskCompleted,
         deactivateTask
  }
}
