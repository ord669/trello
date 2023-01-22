import { useState } from "react"
import { BoardPreview } from "./board-preview"
import { CreateBoard } from "./create-board"

export function BoardList({ boards, onRemoveBoard, setBoards }) {
    const [isShown, setIsShown] = useState(false)

    function toggleIsStarred(ev, board) {
        ev.stopPropagation()
        const boardToSave = { ...board, isStarred: !board.isStarred }
        setBoards(prevBoards => prevBoards.map(currBoard => currBoard._id === board._id ? boardToSave : currBoard))
    }

    return (
        <section className='board-list'>
            <section className="new-board">
                <section className="add-board" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>Create new board</section>
                {isShown && <CreateBoard setIsCreateBoard={setIsShown} />}
            </section>
            {!!boards.length && boards.map(board => <BoardPreview key={board._id} board={board} onRemoveBoard={onRemoveBoard} toggleIsStarred={toggleIsStarred} />)}
        </section >
    )
}