import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { GroupList } from "../cmps/group/group-list"
import { ToolBar } from "../cmps/tool-bar"
import { loadBoard } from "../store/board/board.action"
import { ArrowDownIcon } from "../assets/svg/icon-library"

export function BoardDetails() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    const style = {
        backgroundImage: `url(${board.style.bgImgURL})`
    }

    return (
        <section style={style} className='board-details'>
            <ToolBar board={board} />
            <GroupList groups={board?.groups || []} board={board} />
            <section className="open-main-menu">
                <div className="icon-container"><ArrowDownIcon /></div>
            </section>
            <Outlet />
        </section>

    )
}