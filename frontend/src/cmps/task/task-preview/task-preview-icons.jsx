import { useEffect, useState } from "react"
import { CheckboxIcon, ChecklistIcon, ClockIcon, DescriptionIcon } from "../../../assets/svg/icon-library"
import { utilService } from "../../../services/util.service"
import { saveTask } from "../../../store/task/task.action"
import { showSuccessMsg } from "../../../services/event-bus.service"
import { UserAvatarIcon } from "../../user-avatar-icon"
import { taskService } from "../../../services/task.service"
import { useSelector } from "react-redux"

export function TaskPreviewIcons({ task }) {
    const [todosLength, setTodosLength] = useState('')
    const [todosIsDone, setTodosIsDone] = useState('')
    const [day] = utilService.formatDate(task.dueDate).split(',')
    const { board } = useSelector(storeState => storeState.boardModule)

    useEffect(() => {
        getTodosIsDone()
        getTodosLength()
    }, [task])

    async function setDueDateIsDone(ev) {
        ev.stopPropagation()
        task.isDone = !task.isDone
        try {
            await saveTask(task)
            showSuccessMsg('Task is Done')
        } catch (err) {
            console.log(err)
        }
    }

    function getTodosIsDone() {
        if (!task.checklists) return
        const doneTodos = task.checklists.reduce((acc, checklist) => {
            checklist.todos.forEach(todo => {
                if (todo.isDone) acc++
            })
            return acc
        }, 0)
        setTodosIsDone(doneTodos)
    }

    function getTodosLength() {
        if (!task.checklists) return
        const allTodosLength = task.checklists.reduce((acc, checklist) => {
            checklist.todos.forEach(todo => {
                if (todo) acc++
            })
            return acc
        }, 0)
        setTodosLength(allTodosLength)
    }

    function checkListStyle() {
        let style = {}
        if (todosIsDone === todosLength) {
            style = {
                background: '#61bd4f',
                color: '#fff',
            }
        }
        return style
    }

    function dueDateStyle() {
        if (task.isDone) return {
            background: '#61bd4f',
            color: '#fff',
        }
        if (Date.now() > task.dueDate) return {
            background: '#eb5a46',
            color: '#fff'
        }
    }

    return (
        <section className='task-preview-icons flex align-center gap-10 warp '>
            {!!task.checklists.length && <div style={checkListStyle()} className="tpi-checklists ">
                <ChecklistIcon style={{ fill: 'red' }} />
                <div >
                    {todosIsDone}/{todosLength}
                </div>
            </div>}
            {!!task.dueDate && <div style={dueDateStyle()} onClick={(ev) => setDueDateIsDone(ev)} className="tpi-due-date">
                <span className="clock-icon"><ClockIcon /> </span>
                <span className="checkbox-icon">{task.isDone ? <ChecklistIcon style={{ fill: 'red' }} /> : <CheckboxIcon />}</span>
                {day}</div>}
            {!!task.description && <DescriptionIcon />}
            <div className="tpi-members ">
                {taskService.getMembers(board, task).map((member, idx) =>
                    <div key={member._id}>
                        <UserAvatarIcon member={member} />
                    </div>)}
            </div>
        </section>
    )
}