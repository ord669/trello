import { useEffect, useState } from "react"
import { FilterIcon, ManShareIcon, MoreTreeDotsIcon } from "../assets/svg/icon-library"
import { handleKeyPress } from "../customHooks/enterOutFocues"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { utilService } from "../services/util.service"
import { saveBoard } from "../store/board/board.action"
import { Jarvis } from "../views/jarvis"
import { BoardSideMenu } from "./board-side-menu"
import { BoardStarred } from "./board-starred"
import { ShareModal } from "./share-modal"
import { TaskFilter } from "./task/task-filter"
import { UserAvatarIcon } from "./user-avatar-icon"

export function ToolBar({ board }) {
    const [title, setTitle] = useState('')
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)
    const [isOpenShare, setIsOpenShare] = useState(false)
    const [isOpenJarvis, setIsOpenJarvis] = useState(false)
    const [color, setColor] = useState('')
    const [btnShareBg, setBtnShareBg] = useState({})

    useEffect(() => {
        setTitle(board.title)
        setDynamicColor()
    }, [board, color])

    function handleChange({ target }) {
        setTitle(target.innerText)
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
    async function setDynamicColor() {
        if (!board) return
        const bg = board.style.background

        if (bg.includes('https')) {
            try {
                const colorIsDark = await utilService.getBgUrlIsDark(bg)
                const color = colorIsDark ? "#fff" : "#172b4d"
                const bgColor = colorIsDark ? "#fff" : "#0079BF"
                const btnShareStyle = {
                    background: colorIsDark ? "#fff" : "#0079BF",
                    color: colorIsDark ? "#172b4d" : "#fff"
                }
                setBtnShareBg(btnShareStyle)
                setColor(color)
            } catch (err) {
                console.error(err)
            }
        }

        else {
            const colorIsDark = utilService.getBgIsDarkColorHex(bg)
            const color = colorIsDark ? "#fff" : "#172b4d"
            const bgColor = colorIsDark ? "#fff" : "#0079BF"
            const btnShareStyle = {
                background: colorIsDark ? "#fff" : "#0079BF",
                color: colorIsDark ? "#172b4d" : "#fff"
            }
            setBtnShareBg(btnShareStyle)
            setColor(color)
        }

    }

    const admin = board.createdBy
    return (
        <section style={{ color }} className='tool-bar full'>

            <div className="flex ">
                <span className="board-title edit-title-input"
                    onInput={handleChange}
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
                <span className="span">|</span>
                <div className="flex align-center">
                    {board.members.map(member =>
                        <div key={member._id}><UserAvatarIcon member={member} /></div>
                    )}

                </div>
                <button style={btnShareBg} onClick={() => setIsOpenShare(prev => !prev)} className="btn-share"><ManShareIcon /> Share</button>
                <span className="span">|</span>
                <button onClick={() => setIsOpenSideMenu(prev => !prev)} className="btn-bar 
                btn-header-square">
                    <MoreTreeDotsIcon className="icon" />
                </button>
                <button onClick={() => setIsOpenJarvis(prev => !prev)} className=" btn-bar  btn-header-square">Jarvis</button>
                <BoardSideMenu isOpenSideMenu={isOpenSideMenu} board={board}
                    setIsOpenSideMenu={setIsOpenSideMenu} />
                {isOpenShare && <ShareModal setIsOpenShare={setIsOpenShare} />}
                {isOpenJarvis && <Jarvis setIsOpenJarvis={setIsOpenJarvis} />}
            </div>
        </section>
    )
}
