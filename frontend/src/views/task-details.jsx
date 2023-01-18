import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ChecklistIcon, CloseIcon, DescriptionIcon, LabelIcon, ManIcon } from "../assets/svg/icon-library";

export function TaskDetails() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const { taskId, groupId } = useParams()
    const [task, setTask] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (!board.groups) return
        loadTask()
    }, [board])

    function loadTask() {
        const currGroup = board.groups.find(group => group._id === groupId)
        console.log('currGroup: ', currGroup);
        const currTask = currGroup.tasks.find(task => task._id === taskId)
        setTask(currTask)
    }

    return (
        <section className='task-details'>
            <div className="black-screen" onClick={() => navigate(`/board/${board._id}`)}></div>
            <div className="main-task-details">
                <button onClick={() => navigate(`/board/${board._id}`)}
                    className="btn details-close-btn"><CloseIcon />
                </button>

                <div className="task-details-cover full-task"></div>

                <div className="task-details-title">{task.title}</div>

                <div className="task-details-content">
                    <div className="task-details-labels">
                        <h1>labels</h1>
                    </div>
                    <div className="task-details-description">
                        <div className="flex">
                            <DescriptionIcon />
                            <h1>Description</h1>
                        </div>
                        <textarea type="text" defaultValue={task.description} />
                    </div>
                    <div className="task-details-checklist">
                        <h1>CheckList</h1>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>

                    <div className="task-details-activity">
                        <h1>Activity</h1>
                    </div>
                </div>

                <div className="task-details-side-menu">
                    <h1>add to card</h1>
                    <button className=" side-menu-item btn-link"> <ManIcon /> Members</button>
                    <button className=" side-menu-item btn-link"> <LabelIcon /> Labels</button>
                    <button className="side-menu-item btn-link"> <ChecklistIcon /> Checklist</button>
                </div>
            </div>
        </section>
    )
}
