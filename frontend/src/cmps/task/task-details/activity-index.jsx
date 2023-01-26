import { useState } from "react"
import { ActivityIcon } from "../../../assets/svg/icon-library"
import { showErrorMsg } from "../../../services/event-bus.service"
import { taskService } from "../../../services/task.service.local"
import { saveBoard } from "../../../store/board/board.action"
import { AddComment } from "./add-comment"
import { CommentList } from "./comment-list"

export function ActivityIndex({ board, currTask }) {
    const [isShown, setIsShown] = useState(true)

    function saveComment(comment) {
        comment.task = { _id: currTask._id, title: currTask.title }
        const boardToSave = { ...board, activities: [comment, ...board.activities] }
        try {
            currTask.comments.push(comment)
            taskService.save(currTask)
            saveBoard(boardToSave)
        } catch (err) {
            console.log('Cannot save comment:', err)
            showErrorMsg('Cannot save comment')
        }
    }

    const taskActivities = board.activities.filter(act => act.task._id === currTask._id)

    return (
        <section className="activity-index">
            <section className="activity-header">
                <ActivityIcon className="icon-title" />
                <section>
                    <h3>Activity</h3>
                    <button className="btn-link" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>{isShown ? 'Hide details' : 'Show details'}</button>
                </section>
            </section>
            <AddComment saveComment={saveComment} />
            {isShown && <CommentList activities={taskActivities} />}
        </section>
    )
}