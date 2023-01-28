import { useNavigate } from 'react-router-dom'
import { utilService } from '../services/util.service'
import { useSelector } from "react-redux"

export function ActivityPreview({ activity }) {
    return (
        <section className="activity-preview">
            <div className="activity-img"
                style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}>
            </div>
            <div className='activity-content'>
                <div className=' flex align-center gap-5 warp'>
                    <span className='activity-fullname'>
                        {activity.byMember.fullname}
                    </span>
                    <span>{activity.diff}</span>
                    <DynamicCmp cmpType={activity.type} activity={activity} />
                </div >
                <p className=" activity-time">{utilService.formatTime(activity.createdAt)}</p>
            </div >
        </section >
    )
}


function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'task':
            return <BoardTaskActivity {...props} />
        case 'group':
            return <BoardGroupActivity {...props} />
        case 'bg':
            return <BoardBgActivity {...props} />
        case 'todo':
            return <BoardTodoActivity {...props} />

    }
}


function BoardTaskActivity({ activity }) {
    const { board } = useSelector(storeState => storeState.boardModule)
    const navigate = useNavigate()

    function onNavigate() {
        const task = board.groups.
            find(g => g._id === activity.task.groupId).tasks
            .find(t => t._id === activity.task._id)
        if (!task) return
        navigate(`/board/${board._id}/${activity.task.groupId}/${activity.task._id}`)
    }
    return (
        <section>
            {activity.diff === 'added' &&
                <div className='flex align-center gap-5 warp'>
                    <span onClick={() => onNavigate()} className='activity-task'>
                        {activity.task.title}</span>
                    <span>to</span>
                    <span>{activity.task.group}</span>
                </div>
            }
            {activity.diff === 'archived' && <div>
                <div div className='flex align-center gap-5 warp'>
                    <span className='activity-task'>
                        {activity.task.title}</span>
                </div>
            </div>}
        </section >
    )
}

function BoardGroupActivity({ activity }) {

    return (
        <section>
            {activity.diff === 'added' && <div className='flex align-center gap-5'>
                <span>{activity.txt}</span>
                <span>at board</span>
            </div>}
            {activity.diff === 'archived' && <div className='flex align-center gap-5'>
                <span>list</span>
                <span>{activity.txt}</span>
            </div>}




        </section>
    )

}

function BoardBgActivity({ activity }) {

    return (
        <div className='flex align-center gap-5'>
            <span>change the background of this board</span>
        </div>

    )

}

function BoardTodoActivity({ activity }) {
    const { board } = useSelector(storeState => storeState.boardModule)
    const navigate = useNavigate()

    function onNavigate() {
        const task = board.groups.
            find(g => g._id === activity.task.groupId).tasks
            .find(t => t._id === activity.task._id)
        if (!task) return
        navigate(`/board/${board._id}/${activity.task.groupId}/${activity.task._id}`)
    }
    return (
        <section>
            {
                activity.diff === 'completed' &&
                <div className='flex align-center gap-5' >
                    <span>{activity.task.todo}</span>
                    <span>on</span>
                    <span onClick={() => onNavigate()} className='activity-task'>
                        {activity.task.title}</span>
                </div>
            }
        </section>
    )
}