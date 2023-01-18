import { AddGroup } from "../cmps/group/add-group";
import { GroupList } from "../cmps/group/group-list";

export function BoardDetails() {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        ; (async () => {
            const groups = await groupService.query('b101')
            console.log('groups:', groups)
            setGroups(groups)
        })
    }, [])

    return (
        <section className='board-details'>
            <GroupList />
            <AddGroup />
        </section>
    )
}