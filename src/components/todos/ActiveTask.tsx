import { useTodoStore } from "../../store/todo.store";
import { Icon } from "../icon";
import type { ITodo } from "../../type";
import useActiveTodoTimer from "../../hooks/useActiveTodoTimer";
import NoActiveTask from "./NoActiveTask";
import FlexContainer from "../flexContainer";
import TaskCompleted from "./TaskCompleted";


export default function ActiveTask({
  isTimerModal,
}: {
  isTimerModal: boolean;
}) {
  const { activeTodoId, lastCompletedTodoId, todos } = useTodoStore();

  const activeTask = todos.find(t => t.id === activeTodoId);
  const completedTask = todos.find(t => t.id === lastCompletedTodoId);

  

 

  return (
    <div
      className={`active-task-holder ${activeTask || completedTask ? "is-active" : ""} ${
        isTimerModal ? "hidden" : ""
      }`}
    >
      {activeTask && <Task task={activeTask} />}
      {!activeTask && completedTask && <TaskCompleted task={completedTask} />}
      {!activeTask && !completedTask && <NoActiveTask />}
    </div>
  );
}

function Task({ task }: { task: ITodo }) {
  const { markTaskCompleted, deactivateTask } = useActiveTodoTimer();

  return (
    <FlexContainer align="center" className="task">
      {/* Left: Primary action */}
      <div className="task_action">
        <button
          className="btn btn-small"
          title="Mark task as completed"
          onClick={markTaskCompleted}
        >
          <Icon name="CircleCheck" />
        </button>
      </div>

      {/* Center: Task content */}
      <FlexContainer
        direction="column"
        gap="xs"
        justify="center"
        className="task_content"
      >
        {/* Title + progress */}
        <FlexContainer
          justify="space-between"
          align="center"
          gap="md"
          className="task_header"
        >
          <div className="task_title">{task.title}</div>

          <div className="task_progress">
            <span className="task_progress_done">{task.completedPomo}</span>
            <span className="task_progress_sep"> / </span>
            <span className="task_progress_total">{task.estimatedPomo}</span>
          </div>
        </FlexContainer>

        {/* Meta info */}
        <FlexContainer
          justify="space-between"
          align="center"
          gap="md"
          className="task_meta"
        >
          <div className="task_total_duration">
            {(task.focusDuration * task.estimatedPomo) / 60}{" "}
            <span className="task_duration_unit">min</span>
          </div>
          <div className="task_spend_duration">
            {(task.focusDuration * task.completedPomo) / 60}{" "}
            <span className="task_duration_unit">min</span>
          </div>
        </FlexContainer>
      </FlexContainer>

      {/* Right: Secondary action */}
      <button
        className="btn btn-small task_remove"
        title="Remove active task"
        onClick={deactivateTask}
      >
        <Icon name="X" />
      </button>
    </FlexContainer>
  );
}
