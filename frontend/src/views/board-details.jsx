import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AddGroup } from "../cmps/group/add-group"
import { GroupList } from "../cmps/group/group-list"
import { groupService } from "../services/group.service.local"

export function BoardDetails() {
    const [groups, setGroups] = useState([])
    const { boardId } = useParams()
    console.log('boardId: ', boardId);

    useEffect(() => {
        ; (async () => {
            const groups = await groupService.query(boardId)
            console.log('boardId:', boardId)
            console.log('groups:', groups)
            setGroups(groups)
        })()
    }, [])

    return (
        <section className='board-details'>
            <GroupList groups={groups} />
        </section>
    )
}