import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { GroupList } from "../cmps/group/group-list"
import { ToolBar } from "../cmps/tool-bar"
import { loadBoard } from "../store/board/board.action"
import { ArrowDownIcon, LoaderIcon } from "../assets/svg/icon-library"
import { FastAverageColor } from "fast-average-color"
import { utilService } from "../services/util.service"
import { DynamicModal } from "../cmps/dynamic-modal"
import { MainSidemenu } from "../cmps/main-side-menu"
import { useState } from "react"
import { QuickTaskEdit } from "../cmps/task/quick-task-edit"

export function BoardDetails() {
    const { dynamicModalStatus } = useSelector(storeState => storeState.modalModule)
    const { board } = useSelector(storeState => storeState.boardModule)
    const { boardId } = useParams()
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    function getBgStyle() {
        const bg = board.style.background
        let style
        if (bg.includes('https')) {
            style = {
                backgroundImage: `url(${bg})`,
            }
        }
        else {
            style = {
                background: bg
            }
        }
        return style
    }
    if (!board) return <div className="loader"><LoaderIcon /></div>
    return (
        <section style={getBgStyle()} className={isOpenMenu ? 'board-details open-menu' : 'board-details'}>
            <ToolBar board={board} />
            <GroupList groups={board?.groups || []} board={board} />
            {!isOpenMenu && <section className="open-main-menu">
                <div onClick={() => setIsOpenMenu(prev => !prev)} className="icon-container"><ArrowDownIcon /></div>
            </section>}
            {isOpenMenu && < MainSidemenu board={board} isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />}
            <Outlet />
            {dynamicModalStatus && <DynamicModal />}

        </section >
    )
}
