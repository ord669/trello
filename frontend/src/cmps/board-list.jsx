import { BoardPreview } from "./board-preview"

export function BoardList({ boards, onCreateBoard, onRemoveBoard, setBoards }) {
    function toggleIsStarred(ev,board) {
        ev.stopPropagation()
        const boardToSave = { ...board, isStarred: !board.isStarred }
        setBoards(prevBoards => prevBoards.map(currBoard => currBoard._id === board._id ? boardToSave : currBoard))
    }
    return (
        <section className='board-list'>
            {!!boards.length && boards.map(board => <BoardPreview key={board._id} board={board} onRemoveBoard={onRemoveBoard} toggleIsStarred={toggleIsStarred}/>)}
            <section className="add-board" onClick={onCreateBoard}>Create new board</section>
        </section>
    )
}