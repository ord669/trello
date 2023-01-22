import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { GroupList } from "../cmps/group/group-list"
import { ToolBar } from "../cmps/tool-bar"
import { loadBoard } from "../store/board/board.action"
import { ArrowDownIcon } from "../assets/svg/icon-library"
import { FastAverageColor } from "fast-average-color"
import { utilService } from "../services/util.service"

export function BoardDetails() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    function getBgStyle() {
        utilService.getBgUrlIsDark(board.style.background)

        const bg = board.style.background
        let style
        if (bg.includes('https')) {
            style = {
                backgroundImage: `url(${bg})`
            }
        }
        else {
            utilService.getBgIsDarkColorHex(board.style.background)

            style = {
                background: bg
            }
        }
        return style
    }

    return (
        <section style={getBgStyle()} className='board-details'>
            <ToolBar board={board} />
            <GroupList groups={board?.groups || []} board={board} />
            <section className="open-main-menu">
                <div className="icon-container"><ArrowDownIcon /></div>
            </section>
            <Outlet />
        </section>
    )
}