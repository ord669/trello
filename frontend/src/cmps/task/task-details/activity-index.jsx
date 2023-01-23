import { useState } from "react"
import { ActivityIcon } from "../../../assets/svg/icon-library"
import { AddComment } from "./add-comment"
import { CommentList } from "./comment-list"

export function ActivityIndex({ activities }) {
    const [isShown, setIsShown] = useState(false)

    return (
        <section className="activity-index">
            <section className="activity-header">
                <ActivityIcon className="icon-title" />
                <section>
                    <h3>Activity</h3>
                    <button className="btn-link" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>{isShown ? 'Hide details' : 'Show details'}</button>
                </section>
            </section>
            <AddComment />
            <CommentList activities={activities} />
        </section>
    )
}