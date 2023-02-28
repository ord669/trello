import { useState } from "react"
import { boardService } from "../services/board.service"
import { showUserMsg } from "../services/event-bus.service"
import { socketService, SOCKET_EMIT_SAVE_BOARD } from "../services/socket.service"
import { BoardPreview } from "./board-preview"
import { CreateBoard } from "./create-board"

export function BoardList({ boards, setBoards, isCreate }) {
    const [isShown, setIsShown] = useState(false)

    async function toggleIsStarred(ev, board) {
        ev.stopPropagation()
        const boardToSave = { ...board, isStarred: !board.isStarred }
        try {
            boardService.save(boardToSave)
            socketService.emit(SOCKET_EMIT_SAVE_BOARD, boardToSave)
            setBoards(prevBoards => prevBoards.map(currBoard => currBoard._id === board._id ? boardToSave : currBoard))
        } catch (err) {
            showUserMsg('Cannot starred board')
        }
    }

    return (
        <section className='board-list'>
            {!!boards.length && boards.map(board => <BoardPreview key={board._id} board={board} toggleIsStarred={toggleIsStarred} />)}
            {isCreate && <section className="new-board">
                <section className="add-board" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>Create new board</section>
                {isShown && <CreateBoard setIsCreateBoard={setIsShown} />}
            </section>}
        </section >
    )
}