import { ActivityPreview } from "./activity-preview"

export function BoardActivity({ board }) {
    return (
        <section className='board-activity'>
            {board.activities.map(activity =>
                <ActivityPreview key={activity._id} activity={activity} />
            )}
        </section >
    )
}