import { useState, useEffect } from "react"
import { AddGroup } from "../cmps/add-group"
import { GroupList } from "../cmps/group-list"
import { groupService } from "../services/group.service.local"

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