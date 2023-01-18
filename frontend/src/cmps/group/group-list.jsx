import { AddGroup } from "./add-group"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups }) {

    return (
        <section className='group-list'>
            {groups.map(group => <GroupPreview group={group} />)}
            <AddGroup />
        </section >
    )
}