import { AddGroup } from "../cmps/add-group"
import { GroupList } from "../cmps/group-list"

export function BoardDetails() {
    return (
        <section className='board-details'>
            <GroupList />
            <AddGroup />
        </section>
    )
}