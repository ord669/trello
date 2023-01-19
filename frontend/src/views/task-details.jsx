import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { CloseIcon, PlusIcon, TitleIcon } from "../assets/svg/icon-library";
import { TaskDetailsActivity } from "../cmps/task/task-details-activity";
import { TaskDetailsChecklist } from "../cmps/task/task-details-checklist";
import { TaskDetailsDescription } from "../cmps/task/task-details-description";
import { TaskDetailsLabels } from "../cmps/task/task-details-labels";
import { TaskDetailsSideMenu } from "../cmps/task/task-details-side-menu";
import { UserAvatarIcon } from "../cmps/user-avatar-icon";
import { useForm } from "../customHooks/useForm";
import { removeTask, saveTask, selectLableAndChange, selectMemberAndChange } from "../store/board/board.action";

export function TaskDetails() {
    const [isShown, setIsShown] = useState(false)
    const { board } = useSelector(storeState => storeState.boardModule)
    const { taskId, groupId } = useParams()
    // const [task, setTask] = useState({})

    const [group, setGroup] = useState({})

    const [task, setTask, handleChange] = useForm({})

    const navigate = useNavigate()

    useEffect(() => {
        if (!board.groups.length) return
        loadTask()
    }, [board])

    function onSaveTask() {
        console.log('task from on savr: ', task);
        saveTask(task)
    }

    function loadTask() {
        const currGroup = board.groups.find(group => group._id === groupId)
        const currTask = currGroup.tasks.find(task => task._id === taskId)
        setTask(currTask)
        setGroup(currGroup)
    }

    function onRemoveTask() {
        removeTask(groupId, taskId)
        navigate(`/board/${board._id}`)
    }

    function getMembers() {
        var members = board.members.filter(member => task.memberIds.indexOf(member._id) !== -1);
        console.log('members: ', members);

        return members
    }

    function onUpdateHeadline(ev) {
        handleChange(ev)
        onSaveTask(task)
    }

    function onSelectMember(memberId) {
        selectMemberAndChange(memberId, groupId, taskId)
    }
    function onSelectLable(labelId) {
        console.log('labelId send label: ', labelId);
        // console.log('labelIds: ', labelIds);
        selectLableAndChange(labelId, groupId, taskId)
    }

    if (!task) return <p>Loading..</p>
    console.log('task: ', task);
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
                    <div className="task-title ">
                        <textarea type="text"
                            name="title"
                            onChange={onUpdateHeadline}
                            defaultValue={task.title} />
                        <p>in list {group.title}</p>
                    </div>
                </div>

                <div className="task-details-content">
                    <div className="task-details-content-lable-members">

                        {!!task?.memberIds?.length &&
                            <div>
                                <p>Members</p>
                                <ul className="labels-list clean-list ">
                                    {getMembers().map((member, idx) =>
                                        <li onClick={() => {
                                            onSelectMember(member._id)
                                        }} key={idx}>
                                            <UserAvatarIcon member={member} />
                                        </li>
                                    )
                                    }
                                    <li className=" user-avatar-icon " >
                                        <PlusIcon />
                                    </li>
                                </ul>
                            </div>
                        }

                        {!!task?.labelIds?.length &&
                            <div className="labels-container">
                                <p>Labels</p>
                                <ul className="labels-list clean-list ">
                                    {task.labelIds.map((labelId, idx) =>
                                        <li onClick={() => { onSelectLable(labelId) }} key={idx}>
                                            <TaskDetailsLabels labelId={labelId} />
                                        </li>
                                    )
                                    }
                                </ul>
                            </div>
                        }

                    </div>
                    <TaskDetailsDescription handleChange={handleChange} description={task.description} onSaveTask={onSaveTask} />

                    {task.checklists &&

                        <TaskDetailsChecklist checklists={task.checklists} />
                    }
                    <TaskDetailsActivity />
                    <div>{board.members.map((member, idx) =>
                        <button onClick={() => {
                            onSelectMember(member._id)
                        }} key={idx}>
                            <UserAvatarIcon member={member} />
                        </button>
                    )
                    }</div>
                    <div>{board.labels.map((label, idx) =>
                        <button onClick={() => {
                            onSelectLable(label._id)
                        }} key={idx}>
                            <TaskDetailsLabels labelId={label._id} />
                        </button>
                    )
                    }</div>
                </div>

                <TaskDetailsSideMenu onRemoveTask={onRemoveTask} />

            </div>

        </section >
    )
}
