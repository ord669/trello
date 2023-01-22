import { useEffect, useRef, useState } from "react"
import { EmptyStarIcon, FilterIcon, FullStarIcon, MoreTreeDotsIcon, StartIconEmpty } from "../assets/svg/icon-library"
import { handleKeyPress } from "../customHooks/enterOutFocues"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveBoard } from "../store/board/board.action"
import { BoardSideMenu } from "./board-side-menu"
import { BoardStarred } from "./board-starred"
import { TaskFilter } from "./task/task-filter"
import { UserAvatarIcon } from "./user-avatar-icon"

export function ToolBar({ board }) {
    const [title, setTitle] = useState('')
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

    useEffect(() => {
        setTitle(board.title)
    }, [board])

    function handleChange({ target }) {
        setTitle(target.value)
    }

    async function onSaveTitle() {
        const newTitle = title.trimEnd()
        if (newTitle === board.title) return
        try {
            const boardToSave = { ...board, title: newTitle }
            await saveBoard(boardToSave)
            showSuccessMsg('Changes saved')
        } catch (err) {
            showErrorMsg('Cannot update title, try later')
        }

    }


    const admin = board.createdBy

    return (
        <section className='tool-bar full'>

            <div className="flex ">
                <span className="board-title edit-title-input"
                    onChange={handleChange}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={onSaveTitle}
                    onKeyDown={(e) => handleKeyPress(e)}
                >{title}</span>

                <div className="tool-bar-star">
                    <BoardStarred board={board} />
                </div>

            </div>
            <div className={isOpenSideMenu ? 'tool-bar-btns right-open' : 'tool-bar-btns'}>
                <button onClick={() => setIsOpenFilter(prev => !prev)} className="btn-bar ">
                    <FilterIcon className="spacing" />
                    Filter
                </button>
                {isOpenFilter && <TaskFilter boardId={board._id} setIsOpenFilter={setIsOpenFilter} />}
                <span>|</span>
                <div className="flex align-center">
                    {admin && <UserAvatarIcon member={admin} />}
                    {admin && <UserAvatarIcon member={admin} />}
                    {admin && <UserAvatarIcon member={admin} />}
                    <span>|</span>

                </div>
                <button onClick={() => setIsOpenSideMenu(prev => !prev)} className="btn-bar btn-header-square">
                    <MoreTreeDotsIcon className="icon" />
                </button>
                <BoardSideMenu isOpenSideMenu={isOpenSideMenu} board={board}
                    setIsOpenSideMenu={setIsOpenSideMenu} />
                {/* {isOpenSideMenu && <BoardSideMenu isOpenSideMenu={isOpenSideMenu} board={board} setIsOpenSideMenu={setIsOpenSideMenu} />} */}

            </div>
        </section>
    )
}