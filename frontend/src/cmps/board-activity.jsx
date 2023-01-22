import { utilService } from "../services/util.service";
import { useNavigate } from 'react-router-dom'


export function BoardActivity({ board }) {
    const navigate = useNavigate()

    function onNavigate(task) {
        navigate(`/board/${board._id}/${task.groupId}/${task._id}`)

    }



    return (
        <section className='board-activities'>
            {board.activities.map(activity =>
                <div className="board-activity-container" key={activity._id}>
                    <div className="activity-img "
                        style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}>
                    </div>
                    <div className="activity-content ">

                        <p>
                            <span className="activity-fullname">
                                {activity.byMember.fullname}
                            </span>
                            {activity.txt}
                            <span onClick={() => onNavigate(activity.task)} className="activity-task">{activity.task.title} </span>
                        </p>
                        <p className="activity-time">{utilService.formatTime(activity.createdAt)}</p>

                    </div>
                </div>

            )
            }
        </section >
    )
}