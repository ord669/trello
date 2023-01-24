import { useState } from "react"
import { ArrowDownIcon } from "../../../assets/svg/icon-library"
import { utilService } from "../../../services/util.service"
import { saveTask } from "../../../store/board/board.action"
import { openDynamicModal } from "../../../store/modal/modal.action"

export function DueDate({ task }) {
    const [isDone, setIsDone] = useState(task.isDone)
    const [day, year, hour] = utilService.formatDate(task.dueDate).split(',')

    function handleChange({ target }) {
        const taskToSave = { ...task, isDone: target.checked }
        saveTask(taskToSave)
        setIsDone(target.checked)
    }

    return (
        <section className='due-date'>
            <p>Due date</p>
            <div className="due-date-input flex">
                <input className="icon-title"
                    type="checkbox"
                    onChange={handleChange}
                    checked={isDone} />
                <button className="btn-link" onClick={(ev) => openDynamicModal({ ev, name: 'dates', func: {} })}>
                    {`${day} at ${hour}`}
                    {isDone && <span className="complete">complete</span>}
                    <span className="icon"><ArrowDownIcon /></span>
                </button>
            </div>
        </section>
    )
}