import { ActivityPreview } from "../../activity-preview"
import { CommentPreview } from "./comment-preview"

export function CommentList({ activities }) {
    if (!activities) return
    return (
        <section className='comment-list'>
            {activities.map(act => act.type === 'act' ?
                <ActivityPreview activity={act} key={act._id} />
                :
                <CommentPreview comment={act} key={act._id} />)}
        </section>
    )
}