import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { CloseIcon, TitleIcon } from "../assets/svg/icon-library";
import { TaskDetailsActivity } from "../cmps/task/task-details-activity";
import { TaskDetailsChecklist } from "../cmps/task/task-details-checklist";
import { TaskDetailsDescription } from "../cmps/task/task-details-description";
import { TaskDetailsLabels } from "../cmps/task/task-details-labels";
import { TaskDetailsSideMenu } from "../cmps/task/task-details-side-menu";
import { removeTask } from "../store/board/board.action";

export function TaskDetails() {
    const [isShown, setIsShown] = useState(false)
    const { board } = useSelector(storeState => storeState.boardModule)
    const { taskId, groupId } = useParams()
    const [task, setTask] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (!board.groups.length) return
        loadTask()
    }, [board])

    function loadTask() {
        const currGroup = board.groups.find(group => group._id === groupId)

        const currTask = currGroup.tasks.find(task => task._id === taskId)
        console.log('currGroup.tasks: ', currGroup.tasks);
        setTask(currTask)
        console.log('currTask: ', currTask);
    }

    function onRemoveTask() {
        removeTask(groupId, taskId)
        navigate(`/board/${board._id}`)
    }
    if (task) return <p>Loading..</p>

    return (
        <section className='task-details'>
            <div className="black-screen" onClick={() => navigate(`/board/${board._id}`)}></div>
            <div className="main-task-details">

                <button onClick={() => navigate(`/board/${board._id}`)}
                    className="btn details-close-btn"><CloseIcon />
                </button>

                <div className="task-details-cover full-task"></div>

                <div className="task-details-title flex align-center gap-10">
                    <TitleIcon className='icon-title' />
                    <textarea type="text"
                        defaultValue={task.title} />

                </div>

                <div className="task-details-content">
                    {task.labelIds && <ul className="labels-list clean-list ">
                        {task.labelIds.map((labelId, idx) =>
                            <li key={idx}>
                                <TaskDetailsLabels labelId={labelId} />
                            </li>
                        )
                        }
                    </ul>}
                    <TaskDetailsDescription description={task.description} />


                    {task.checklists &&

                        <TaskDetailsChecklist checklists={task.checklists} />
                    }
                    <TaskDetailsActivity />
                </div>

                <TaskDetailsSideMenu onRemoveTask={onRemoveTask} />

            </div>
        </section >
    )
}
