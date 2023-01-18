import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { GroupList } from "../cmps/group/group-list"
import { ToolBar } from "../cmps/tool-bar"
import { loadBoard } from "../store/board/board.action"



export function BoardDetails() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const { boardId } = useParams()
    console.log('boardId: ', boardId)

    useEffect(() => {
        loadBoard(boardId)
    }, [])

    return (
        <section className='board-details'>
            <ToolBar />
            <GroupList groups={board?.groups || []} />
        </section>


    )
}