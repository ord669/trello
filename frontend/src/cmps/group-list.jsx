import { AddTask } from "./add-task"
import { GroupPreview } from "./group-preview"

export function GroupList() {
    const groups = [1, 2, 3]
    return (
        <section className='group-list'>
            {groups.map(group => <GroupPreview />)}
            <AddTask />
        </section>
    )
}