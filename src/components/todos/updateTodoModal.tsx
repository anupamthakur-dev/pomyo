import { useCallback, useState } from "react";
import GhostBtn from "../buttons/ghostBtn";
import IconBtn from "../buttons/IconButton";
import FlexContainer from "../flexContainer";
import {
  convertToMinutes,
  generateUUID,
} from "../../uitls/helper";
import { sessionCopy } from "../../uitls/helper";
import { useTodoStore } from "../../store/todo.store";
import type { ITodo } from "../../type";
import Stepper from "./Stepper";
import TaskFocusDurationSelector from "./TaskFocusDurationSelector";
import { useSettingsStore } from "../../store/settings.store";
import { useNotifyStore } from "../../store/notify.store";

export default function UpdateTodoModal({ todo,close }: { todo: ITodo,close:()=>void}) {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const getSetting  = useSettingsStore.getState().getSetting;
  const notify = useNotifyStore(s=>s.notify)
  const [sessions, setSessions] = useState<number>(todo.estimatedPomo);
  const [title, setTitle] = useState<string>(todo.title);
  const [taskFocusDuration, setIsTaskFocusDuration] = useState('previous');

  const handleUpdateTodo = useCallback(() => {
    
    
     if(title.trim().length === 0 ){
     notify({
      id:generateUUID(),
      title:'Invalid Input',
      message:'Title must not be empty.',
      type:'info'
     })
     return;
    }
    const newTodo: ITodo = {
      id: generateUUID(),
      title,
      focusDuration: taskFocusDuration === 'current'? getSetting("focusTime") : todo.focusDuration,
      estimatedPomo: sessions,
      completedPomo: todo.completedPomo,
      status: todo.status,
    };

    updateTodo(todo.id, newTodo);
    notify({
      id:generateUUID(),
      title:'Task updated',
      message:title,
      type:'success'
     })
  }, [sessions, title, taskFocusDuration]);

  const totalFocusDuration = useCallback((): number => {

    let duration: number = todo.focusDuration;

    if (taskFocusDuration === 'current') {
      duration = getSetting('focusTime');
    }

    return convertToMinutes(duration).min
  }, [taskFocusDuration])

  return (
    <FlexContainer className="todo-modal" direction="column">
      <div className="todo-modal_head">
        <h3>Update To-Do</h3>
      </div>

      <div className="todo-modal_body customScrollBar">
        <label htmlFor="todo_title" className="label">
          Title
        </label>
        <input
          type="text"
          name="todo_title"
          id="todo_title"
          className="todo_title"
          defaultValue={title}
          placeholder="What’s your mission today?"
          onChange={(e) => setTitle(e.target.value)}
        />

        {todo.focusDuration !== getSetting("focusTime") && 
        <TaskFocusDurationSelector checkedDuration={taskFocusDuration} prevDuration={todo.focusDuration} handleChange={(value) => setIsTaskFocusDuration(value)} />}{" "}
        <label htmlFor="todo_sessions" className="subText">
          Focus Session
        </label>
        <div className="xsText">
          <span key={sessions ?? "default"} className="animate-text">
            {sessions
              ? sessionCopy(sessions)
              : "Choose a session count that matches your focus level today."}
          </span>
        </div>
        <div className="xsText animate-text" key={sessions ?? "default"}>
          Total Focus -{" "}
          <span style={{ fontWeight: 600, color: "var(--accent)" }}>
            {totalFocusDuration() * sessions}  mins
          </span>{" "}
         
        </div>
        <Stepper
          value={sessions}
          handleChange={(value) => setSessions(value)}
        />
      </div>
      <FlexContainer className="todo-modal_foot" justify="space-between">
        <GhostBtn action={close} text="close">
          Cancel
        </GhostBtn>
        <IconBtn
          text="Update"
          icon="Plus"
          action={handleUpdateTodo}
          type="hero"
        />
      </FlexContainer>
    </FlexContainer>
  );
}
