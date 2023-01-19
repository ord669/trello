import { useEffect, useRef, useState } from "react"
import { FilterIcon, MoreTreeDotsIcon, StartIconEmpty } from "../assets/svg/icon-library"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveBoard } from "../store/board/board.action"
import { UserAvatarIcon } from "./user-avatar-icon"

export function ToolBar({ board }) {
    const [title, setTitle] = useState('')

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
            <span className="board-title edit-title-input"
                onChange={handleChange}
                contentEditable
                suppressContentEditableWarning
                onBlur={onSaveTitle}>{title}</span>
            <div className="tool-bar-btns">

                <button className="btn-header ">
                    <FilterIcon className="spacing" />
                    Filter
                </button>
                <p>|</p>
                {admin && <UserAvatarIcon member={admin} />}
                <p>|</p>
                <button className="btn-header btn-header-square">
                    <MoreTreeDotsIcon className="icon" />
                </button>

            </div>
        </section>
    )
}