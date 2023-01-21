import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ActivityIcon, ChecklistIcon, CloseIcon, DescriptionIcon, PlusIcon, TitleIcon } from "../assets/svg/icon-library";
import { LabelList } from "../cmps/task/task-details/task-details-labels-list";
import { MembersList } from "../cmps/task/task-details/task-details-members-list";
import { TaskDetailsActivity } from "../cmps/task/task-details/task-details-activity";
import { TaskDetailsChecklist } from "../cmps/task/task-details/task-details-checklist";
import { TaskDetailsDescription } from "../cmps/task/task-details/task-details-description";
import { TaskDetailsLabels } from "../cmps/task/task-details/task-details-labels";
import { TaskDetailsSideMenu } from "../cmps/task/task-details/task-details-side-menu";
import { UserAvatarIcon } from "../cmps/user-avatar-icon";
import { useForm } from "../customHooks/useForm";
import { removeTask, saveTask, selectLableAndChange, selectMemberAndChange } from "../store/board/board.action";
import { DetilsTitle } from "../cmps/task/task-details/task-details-title";
import { DetailsHeader } from "../cmps/task/task-details/task-details-header";
import { DueDate } from "../cmps/task/task-details/task-details-due-date";

export function TaskDetails() {
    const [isShown, setIsShown] = useState(false)
    const { board } = useSelector(storeState => storeState.boardModule)
    const { taskId, groupId } = useParams()
    // const [task, setTask] = useState({})

    const [group, setGroup] = useState({})

    const [task, setTask, handleChange] = useForm(null)

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
            <div className="black-screen" onClick={() => navigate(`/board/${board._id}`)}>            </div>

            <div className="main-task-details">

                <DetailsHeader onUpdateHeadline={onUpdateHeadline} task={task} group={group} />

                <div className="task-details-content">
                    <div className="task-details-content-lable-members-date">
                        {!!task?.memberIds?.length &&
                            <MembersList getMembers={getMembers} onSelectMember={onSelectMember} />
                        }
                        {!!task?.labelIds?.length &&
                            <LabelList task={task} onSelectLable={onSelectLable} />
                        }

                        {!!task?.dueDate &&
                            <DueDate dueDate={task.dueDate} />
                        }
                    </div>

                    <div className="description-container flex">
                        <DescriptionIcon className='icon-title' />
                        <TaskDetailsDescription handleChange={handleChange} description={task.description} onSaveTask={onSaveTask} />
                    </div>

                    {task?.checklists &&
                        <div className="checklists-container flex">
                            <ChecklistIcon className="icon-title" />
                            {task.checklists.map(checkList =>

                                <TaskDetailsChecklist key={checkList._id} checklist={checkList} />

                            )}
                        </div>
                    }

                    <div className="activity-container flex">
                        <ActivityIcon className="icon-title" />
                        <TaskDetailsActivity />
                    </div>

                    {/* TODO////for dev only//// */}
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
