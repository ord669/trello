import { useEffect, useState } from "react"
import { Clock, EmptyStarIcon } from "../assets/svg/icon-library"
import { BoardList } from "../cmps/board-list"
// import { boardService } from "../services/board.service.local"
import { boardService } from "../services/board.service"

export function BoardIndex() {
    const [boards, setBoards] = useState([])
    console.log('boards:', boards);

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
            {!!boards.length && <BoardList boards={[boards[0]]} setBoards={setBoards} isCreate={true} />}
            <section className="title">Your boards</section>
            <BoardList boards={boards} setBoards={setBoards} />
        </section>
    )
}