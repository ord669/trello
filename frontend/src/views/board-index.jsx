import { useEffect, useState } from "react"
import { Clock, EmptyStarIcon } from "../assets/svg/icon-library"
import { BoardList } from "../cmps/board-list"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function BoardIndex() {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        loadBoards()
    }, [])

    async function loadBoards() {
        const boards = await boardService.query()
        setBoards(boards)
    }

    const starredBoards = boards.filter(board => board.isStarred)

    return (
        <section className='board-index'>
            {!!starredBoards.length &&
                <>
                    <section className="title"><EmptyStarIcon />Starred boards</section>
                    <BoardList boards={starredBoards} setBoards={setBoards} />
                </>}
            <section className="title"><Clock /> Recently viewed</section>
            <BoardList boards={boards.splice(0, 3)} setBoards={setBoards} isCreate={true}/>
            <section className="title">Your boards</section>
            <BoardList boards={boards} setBoards={setBoards} />
        </section>
    )
}