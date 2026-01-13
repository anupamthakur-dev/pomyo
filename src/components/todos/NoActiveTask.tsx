import { useTodoPanel } from "../../store/UI/todoPanel.store"

export default function NoActiveTask() {
       const {open} = useTodoPanel()
    return (
        <div className="no-active-task">
            <p>Ready for the next focus</p>
            <button className="no-active-task_link" onClick={open}>Choose a task to continue </button>
        </div>
    )
}