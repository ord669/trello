import { useState } from "react"
import { CloseIcon } from "../../assets/svg/icon-library"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { taskService } from "../../services/task.service"
import { saveTask } from "../../store/task/task.action"

export function AddTask({ groupId, setIsShown }) {
    const [task, setTask] = useState(taskService.getEmptyTask())

    async function onAddTask() {
        if (!task.title) return
        task.groupId = groupId
        try {
            await saveTask(task)
            setTask(taskService.getEmptyTask())
            showSuccessMsg('Task Added successfully')
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    function handleChange({ target }) {
        setTask((prev) => ({ ...prev, title: target.value }))
    }

    return (
        <section className='add-task'>
            <textarea
                name="title"
                placeholder="Enter a title for this card..."
                value={task.title}
                onChange={handleChange} />
            <section className="form-btns">
                <button className="btn-add" onClick={onAddTask}>Add card</button>
                <button className="btn-close" onClick={() => setIsShown(prevIsShown => !prevIsShown)}><CloseIcon /></button>
            </section>
        </section>
    )
}