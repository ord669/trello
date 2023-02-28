import { useState } from "react"
import { CloseIcon } from "../../assets/svg/icon-library"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { taskService } from "../../services/task.service"
import { saveTask } from "../../store/task/task.action"
import { useSelector } from "react-redux"
import { saveActivity } from "../../store/board/board.action"

export function AddTask({ groupId, setIsShown }) {
    const [task, setTask] = useState(taskService.getEmptyTask())
    const { board } = useSelector(storeState => storeState.boardModule)

    async function onAddTask() {
        if (!task.title && !board) return
        const currGroup = board.groups.find(group => group._id === groupId)
        task.groupId = groupId
        try {
            const savedTask = await saveTask(task)
            await saveActivity({ board, type: 'task', diff: 'added', task: { _id: savedTask._id, groupId: savedTask.groupId, title: savedTask.title, group: currGroup.title } })
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