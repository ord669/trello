import { BoardPreview } from "./board-preview"

export function BoardList({ boards, onCreateBoard,onRemoveBoard }) {
    return (
        <section className='board-list'>
            {boards.length && boards.map(board => <BoardPreview key={board._id} board={board} onRemoveBoard={onRemoveBoard}/>)}
            <section onClick={onCreateBoard}>Create new board</section>
        </section>
    )
}