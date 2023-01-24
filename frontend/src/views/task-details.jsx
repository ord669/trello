import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { AttachmentIcon, DescriptionIcon } from "../assets/svg/icon-library"
import { LabelList } from "../cmps/task/task-details/label-list"
import { MembersList } from "../cmps/task/task-details/task-details-members-list"
import { ActivityIndex } from "../cmps/task/task-details/activity-index"
import { TaskDetailsChecklist } from "../cmps/task/task-details/task-details-checklist"
import { TaskDetailsDescription } from "../cmps/task/task-details/task-details-description"
import { LabelPreview } from "../cmps/task/task-details/label-preview"
import { TaskDetailsSideMenu } from "../cmps/task/task-details/task-details-side-menu"
import { UserAvatarIcon } from "../cmps/user-avatar-icon"
import { useForm } from "../customHooks/useForm"
import { removeTask, saveTask, toggleTaskLabel, toggleMemberAssigned } from "../store/board/board.action"
import { DetailsHeader } from "../cmps/task/task-details/task-details-header"
import { DueDate } from "../cmps/task/task-details/task-details-due-date"
import { groupService } from "../services/group.service.local"
import { ImgUploader } from "../cmps/img-uploader"
import { TaskDetailsAttachment } from "../cmps/task/task-details/task-details-attachment"
import { setTaskToEdit } from "../store/task/task.action"

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

    function getMembers() {
        let members = board.members.filter(member => task.memberIds.indexOf(member._id) !== -1)
        return members
    }

    function onUpdateHeadline(ev) {
        handleChange(ev)
        saveTask(task)
    }

    function onSelectMember(memberId) {
        toggleMemberAssigned(memberId, groupId, taskId)
    }
    function onSelectLabel(labelId) {
        console.log('labelId fro, details: ', labelId);
        toggleTaskLabel(labelId, groupId, taskId)
    }

    function addCheckList(checklist) {
        task.checklists.push(checklist)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    async function onCoverChangeBg(bg) {
        task.style.background = bg
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
        saveTask(task)
    }

    if (!task) return <p>Loading..</p>
    console.log('task: ', task);
    return (
        <section className='task-details'>
            <div className="black-screen" onClick={() => navigate(`/board/${board._id}`)}></div>
            <div className="main-task-details">
                <DetailsHeader onUpdateHeadline={onUpdateHeadline} onCoverChangeBg={onCoverChangeBg} boardId={board._id} task={task} group={group} />
                <div className="task-details-content">
                    <div className="task-details-content-label-members-date">
                        {!!task?.memberIds?.length &&
                            <MembersList getMembers={getMembers} board={board} task={task} onSelectMember={onSelectMember} />
                        }
                        {!!task?.labelIds?.length &&
                            <LabelList task={task} onSelectLabel={onSelectLabel} />
                        }
                        {!!task?.dueDate &&
                            <DueDate dueDate={task.dueDate} task={task} />
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

                                <TaskDetailsAttachment key={attachment._id} task={task} attachment={attachment} onRemoveAttach={onRemoveAttach} />
                            )}
                            <button className="btn-link">Add an attachment</button>

                        </div>}
                    <ActivityIndex board={board} currTask={task} />
                </div>
                <TaskDetailsSideMenu
                    addCheckList={addCheckList}
                    getMembers={getMembers}
                    onSelectMember={onSelectMember}
                    onSelectLabel={onSelectLabel}
                    onRemoveTask={onRemoveTask}
                />
            </div>
        </section>
    )
}
