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
import { removeTask, saveTask } from "../store/board/board.action"
import { DetailsHeader } from "../cmps/task/task-details/task-details-header"
import { DueDate } from "../cmps/task/task-details/task-details-due-date"
import { TaskDetailsAttachment } from "../cmps/task/task-details/task-details-attachment"
import { setTaskToEdit } from "../store/task/task.action"
import { taskService } from "../services/task.service.local"

export function TaskDetails() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const { taskId, groupId } = useParams()
    const [group, setGroup] = useState({})
    const [task, setTask, handleChange] = useForm(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!board.groups.length) return
        loadTask()
    }, [board])

    function loadTask() {
        const currGroup = board.groups.find(group => group._id === groupId)
        const currTask = currGroup.tasks.find(task => task._id === taskId)
        setTask(currTask)
        setGroup(currGroup)
        setTaskToEdit(currTask)
    }

    function onRemoveTask() {
        removeTask(groupId, taskId)
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
                <DetailsHeader onUpdateHeadline={onUpdateHeadline} boardId={board._id} task={task} group={group} />
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
                        <TaskDetailsDescription handleChange={handleChange} description={task.description} />
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
                            <button className="btn-link">Add an attachment</button>

                        </div>}
                    <ActivityIndex board={board} currTask={task} />
                </div>
                <TaskDetailsSideMenu
                    addCheckList={addCheckList}
                    onRemoveTask={onRemoveTask}
                    task={task}
                />
            </div>
        </section>
    )
}
