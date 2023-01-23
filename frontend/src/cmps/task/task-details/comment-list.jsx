import { ActivityPreview } from "../../activity-preview"

export function CommentList({ activities }) {
    
    if(!activities) return
    console.log('activities:', activities);
    return (
        <section className='comment-list'>
            {activities.map(activity => <ActivityPreview activity={activity} key={activity._id} />)}
        </section>
    )
}