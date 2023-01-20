import { useEffect, useRef, useState } from "react"
import { EmptyStarIcon, FilterIcon, FullStarIcon, MoreTreeDotsIcon, StartIconEmpty } from "../assets/svg/icon-library"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveBoard } from "../store/board/board.action"
import { TaskFilter } from "./task/task-filter"
import { UserAvatarIcon } from "./user-avatar-icon"

export function ToolBar({ board }) {
    const [title, setTitle] = useState('')
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [isStarred, setIsStarred] = useState(false)

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

    function setBoardIsStarred() {
        const updatedBoard = board
        updatedBoard.isStarred = !updatedBoard.isStarred
        saveBoard(updatedBoard)
    }

    const admin = board.createdBy

    return (
        <section className='tool-bar full'>

            <div className="flex ">
                <span className="board-title edit-title-input"
                    onChange={handleChange}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={onSaveTitle}>{title}</span>

                <div onClick={setBoardIsStarred} className="tool-bar-star">
                    {board.isStarred ? <FullStarIcon /> : <EmptyStarIcon />}
                </div>

            </div>
            <div className="tool-bar-btns">
                <button onClick={() => setIsOpenFilter(prev => !prev)} className="btn-header ">
                    <FilterIcon className="spacing" />
                    Filter
                </button>
                {isOpenFilter && <TaskFilter boardId={board._id} setIsOpenFilter={setIsOpenFilter} />}
                <p>|</p>
                <div className="flex align-center">
                    {admin && <UserAvatarIcon member={admin} />}
                    {admin && <UserAvatarIcon member={admin} />}
                    {admin && <UserAvatarIcon member={admin} />}
                    <p>|</p>

                </div>
                <button className="btn-header btn-header-square">
                    <MoreTreeDotsIcon className="icon" />
                </button>

            </div>
        </section>
    )
}