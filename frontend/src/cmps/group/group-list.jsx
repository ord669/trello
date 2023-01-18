import { AddGroup } from "./add-group"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups }) {

    return (
        <section className='group-list'>
            {groups.map(group =>
                <GroupPreview key={group.id} group={group} />
            )}
            <AddGroup />

        </section>
    )
}