import { useEffect, useState } from "react"
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

    console.log('boards:', boards)
    return (
        <section className='board-index'>
        </section>
    )
}