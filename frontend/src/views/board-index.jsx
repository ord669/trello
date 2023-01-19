import { useEffect, useState } from "react"
import { BoardPreview } from "../cmps/board-preview"
import { boardService } from "../services/board.service.local"

export function BoardIndex() {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        loadBoards()
    }, [])

    async function loadBoards() {
        const boards = await boardService.query()
        setBoards(boards)
    }

    return (
        <section className='board-index'>
            {boards.length && boards.map(board => <BoardPreview key={board._id} board={board} />)}
            <section>Create new board</section>
        </section>
    )
}