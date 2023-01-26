import { useEffect, useState } from "react";
import { AttacheIcon, ChecklistIcon, CheckListIcon, ClockIcon, DescriptionIcon, EyeIcon } from "../../../assets/svg/icon-library";
import { utilService } from "../../../services/util.service";
import { saveTask } from "../../../store/task/task.action";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service";
import { UserAvatarIcon } from "../../user-avatar-icon";
import { taskService } from "../../../services/task.service.local";
import { toggleMemberAssigned } from "../../../store/task/task.action"
import { useSelector } from "react-redux";


export function TaskPreviewIcons({ task }) {
    // const [todosIsDone, setTodosIsDone] = useState(false)
    const [allTodosLength, setAllTodosLength] = useState('')
    const [allTodosIsDone, setAllTodosIsDone] = useState('')
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
            checklist.todos.map(todo => {
                if (todo.isDone) acc++
            })
            return acc

        }, 0)
        setAllTodosIsDone(doneTodos)

    }

    function getTodosLength() {
        if (!task.checklists) return
        const allTodosLength = task.checklists.reduce((acc, checklist) => {
            checklist.todos.map(todo => {
                if (todo) acc++
            })
            return acc
        }, 0)
        setAllTodosLength(allTodosLength)
    }

    function checkListStyle() {
        let style = {}
        if (allTodosIsDone === allTodosLength) {
            style = {
                background: '#61bd4f',
                color: '#fff',
            }
        }
        return style


    }

    function dueDateStyle() {
        let style
        if (task.isDone) {
            style = {
                background: '#61bd4f',
                color: '#fff',
            }
        }
        return style
    }

    return (
        <section className='task-preview-icons flex align-center gap-10 '>
            {!!task.checklists.length && <div style={checkListStyle()} className="tpi-checklists ">
                <ChecklistIcon style={{ fill: 'red' }} />
                <div >
                    {allTodosIsDone}/{allTodosLength}
                </div>
            </div>}
            {!!task.dueDate && <div style={dueDateStyle()} onClick={(ev) => setDueDateIsDone(ev)} className="tpi-due-date"><ClockIcon /> {day}</div>}
            {!!task.description && <DescriptionIcon />}
            {taskService.getMembers(board, task).map((member, idx) =>
                <div key={member._id}>
                    <UserAvatarIcon member={member} />
                </div>)}

        </section >
    )
}