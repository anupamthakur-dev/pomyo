import type { ITodo } from "../../type";

import { Icon } from "../icon";

export default function TaskCompleted({ task }: { task: ITodo }) {
    return (
        <div className="task-completed" key={task.id}>

            <div className="task-completed_icon"><Icon name="CircleCheckBig" strokeWidth={3}/></div>
            <div className="task-completed_label">task completed </div>

            <div className="task-completed_title">{task.title}</div>
        </div>
    )
}