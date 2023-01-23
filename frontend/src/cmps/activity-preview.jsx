import { useNavigate } from 'react-router-dom'
import {utilService} from '../services/util.service'

export function ActivityPreview({ activity }) {
    const navigate = useNavigate()

    function onNavigate(task) {
        // navigate(`/board/${board._id}/${task.groupId}/${task._id}`)

    }
    return (
        <section className='activity-preview'>
            <div className="activity-img"
                style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}>
            </div>
            <div className="activity-content">
                <p>
                    <span className="activity-fullname">
                        {activity.byMember.fullname}
                    </span>
                    {activity.txt}
                    {activity.task?.title && <span onClick={() => onNavigate(activity.task)} className="activity-task">{activity.task.title}</span>}
                </p>
                <p className="activity-time">{utilService.formatTime(activity.createdAt)}</p>
            </div>
        </section>
    )
}