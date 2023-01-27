import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { GroupList } from "../cmps/group/group-list"
import { ToolBar } from "../cmps/tool-bar"
import { dispatchBoard, loadBoard } from "../store/board/board.action"
import { ArrowDownIcon, LoaderIcon } from "../assets/svg/icon-library"
import { DynamicModal } from "../cmps/dynamic-modal"
import { MainSidemenu } from "../cmps/main-side-menu"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SET_BOARD } from "../store/board/board.reducer"
import { socketService, SOCKET_EVENT_SAVE_BOARD } from "../services/socket.service"

export function BoardDetails() {
    const { dynamicModalStatus } = useSelector(storeState => storeState.modalModule)
    const { board } = useSelector(storeState => storeState.boardModule)
    const { boardId } = useParams()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        loadBoard(boardId)
        socketService.on(SOCKET_EVENT_SAVE_BOARD, dispatchBoard)

        return () => {
            socketService.off(SOCKET_EVENT_SAVE_BOARD, dispatchBoard)
            dispatch({ type: SET_BOARD, board: null })
        }
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
    if (!board) return <div style={{ marginTop: "300px" }} className="loader" > <LoaderIcon /></div >
    return (
        <section style={getBgStyle()} className={isOpenMenu ? 'board-details open-menu' : 'board-details'}>
            <ToolBar board={board} />
            <GroupList groups={board?.groups || []} board={board} />
            {!isOpenMenu && <section className="open-main-menu">
                <div onClick={() => setIsOpenMenu(prev => !prev)} className="icon-container"><ArrowDownIcon /></div>
            </section>}
            < MainSidemenu board={board} isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
            <Outlet />
            {dynamicModalStatus && <DynamicModal />}
        </section >
    )
}
