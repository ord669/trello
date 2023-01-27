import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { AttachmentIcon, DescriptionIcon } from "../assets/svg/icon-library"
import { LabelList } from "../cmps/task/task-details/label-list"
import { MembersList } from "../cmps/task/task-details/task-details-members-list"
import { ActivityIndex } from "../cmps/task/task-details/activity-index"
import { TaskDetailsChecklist } from "../cmps/task/task-details/task-details-checklist"
import { TaskDetailsDescription } from "../cmps/task/task-details/task-details-description"
import { TaskDetailsSideMenu } from "../cmps/task/task-details/task-details-side-menu"
import { useForm } from "../customHooks/useForm"
import { removeTask, saveTask } from "../store/task/task.action"
import { DetailsHeader } from "../cmps/task/task-details/task-details-header"
import { DueDate } from "../cmps/task/task-details/task-details-due-date"
import { TaskDetailsAttachment } from "../cmps/task/task-details/task-details-attachment"
import { taskService } from "../services/task.service"
import { openDynamicModal } from "../store/modal/modal.action"

export function TaskDetails() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const { taskId, groupId } = useParams()
    const [group, setGroup] = useState({})
    const [task, setTask, handleChange] = useForm(null)
    const [noBg, setnoBg] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!board.groups.length) return
        loadTask()
    }, [board])

    function loadTask() {
        console.log('board: ', board);
        const currGroup = board.groups.find(group => group._id === groupId)
        console.log('groupId:', groupId);
        console.log('currGroup.tasks:', currGroup.tasks);
        const currTask = currGroup.tasks.find(task => task._id === taskId)
        console.log('currTask:', currTask);
        setTask(currTask)
        setGroup(currGroup)
    }

    function onRemoveTask() {
        removeTask(task)
        navigate(`/board/${board._id}`)
    }

    function onUpdateHeadline(ev) {
        handleChange(ev)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err from onUpdateHeadline', err)
        }
    }

    function addCheckList(checklist) {
        task.checklists.push(checklist)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    async function onChoosenDate({ target }) {
        task.dueDate = target.valueAsNumber
        try {
            saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    function onRemoveAttach(attachId) {
        task.attachments = task.attachments.filter(attach => attach._id !== attachId)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err from remove attach', err)
        }
    }

    function onEditAttach(attachment, title) {
        attachment.title = title.txt
        task.attachments = task.attachments.map(attach => attach._id !== attachment._id ? attach : attachment)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err from edit attach', err)
        }
    }

    if (!task) return <p>Loading..</p>
    return (
        <section className='task-details'>
            <div className="black-screen" onClick={() => navigate(`/board/${board._id}`)}></div>
            <div className="main-task-details">
                <DetailsHeader onUpdateHeadline={onUpdateHeadline} boardId={board._id} task={task} group={group} setnoBg={setnoBg} noBg={noBg} />
                <div className="task-details-content">
                    <div className="task-details-content-label-members-date">
                        {!!task?.memberIds?.length &&
                            <MembersList getMembers={taskService.getMembers} board={board} task={task} />
                        }
                        {!!task?.labelIds?.length &&
                            <LabelList task={task} />
                        }
                        {!!task?.dueDate &&
                            <DueDate task={task} />
                        }
                    </div>
                    <div className="description-container flex">
                        <DescriptionIcon className='icon-title' />
                        <TaskDetailsDescription handleChange={handleChange} task={task} />
                    </div>
                    {task?.checklists &&
                        <div className="checklists-container ">
                            {task.checklists.map(checkList =>
                                <TaskDetailsChecklist key={checkList._id} checklist={checkList} task={task} />
                            )}
                        </div>}
                    {task?.attachments &&
                        <div className="attachments-container ">
                            <div className="task-details-attachment-header">
                                <div className="attachment-icon">
                                    <AttachmentIcon />
                                </div>
                                <h3>Attachments</h3>
                            </div>
                            {task.attachments.map(attachment =>

                                <TaskDetailsAttachment key={attachment._id} task={task} attachment={attachment} onRemoveAttach={onRemoveAttach} onEditAttach={onEditAttach} />
                            )}
                            <button onClick={(ev) => openDynamicModal({ ev, name: 'attachment', task })} className="btn-link">Add an attachment</button>

                        </div>}
                    <ActivityIndex board={board} currTask={task} />
                </div>
                <TaskDetailsSideMenu
                    addCheckList={addCheckList}
                    onRemoveTask={onRemoveTask}
                    task={task}
                    setnoBg={setnoBg}
                />
            </div>
        </section>
    )
}
