import { useState } from "react"
import { ArrowDownIcon } from "../../../assets/svg/icon-library"
import { utilService } from "../../../services/util.service"
import { saveTask } from "../../../store/task/task.action"
import { openDynamicModal } from "../../../store/modal/modal.action"

export function DueDate({ task }) {
    const [isDone, setIsDone] = useState(task.isDone)
    const [day, year, hour] = utilService.formatDate(task.dueDate).split(',')

    function handleChange({ target }) {
        const taskToSave = { ...task, isDone: target.checked }
        try {
            saveTask(taskToSave)
        } catch (err) {
            console.log('err from handle change', err)
        }
        setIsDone(target.checked)
    }

    function getDueDateLabel() {
        if (isDone) return <span className="complete label">complete</span>
        if (Date.now() > task.dueDate) return <span className="overdue label">overdue</span>
        if (Date.now() > task.dueDate - 1000 * 60 * 60 * 24) return <span className="due-soon label">due soon</span>
        return
    }

    return (
        <section className='due-date'>
            <p>Due date</p>
            <div className="due-date-input flex">
                <input className="icon-title"
                    type="checkbox"
                    onChange={handleChange}
                    checked={isDone} />
                <button className="btn-link" onClick={(ev) => openDynamicModal({ ev, name: 'dates', task })}>
                    {`${day} at ${hour}`}
                    {getDueDateLabel()}
                    <span className="icon"><ArrowDownIcon /></span>
                </button>
            </div>
        </section>
    )
}