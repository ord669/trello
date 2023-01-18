import { AddGroup } from "../cmps/group/add-group";
import { GroupList } from "../cmps/group/group-list";

export function BoardDetails() {
    return (
        <section className='board-details'>
            <GroupList />
            <AddGroup />
        </section>
    )
}