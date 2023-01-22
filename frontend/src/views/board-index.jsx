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

    async function onRemoveBoard(ev, boardId) {
        console.log('boardId:', boardId)
        ev.stopPropagation()
        try {
            await boardService.remove(boardId)
            setBoards(prevBoards => prevBoards.filter(board => board._id !== boardId))
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board, try later')
        }
    }

    const starredBoards = boards.filter(board => board.isStarred)

    return (
        <section className='board-index'>
            {!!starredBoards.length &&
                <>
                    <section className="title"><EmptyStarIcon />Starred boards</section>
                    <BoardList boards={starredBoards} onRemoveBoard={onRemoveBoard} setBoards={setBoards} />
                </>}
            <section className="title"><Clock /> Recently viewed</section>
            <BoardList boards={boards} onRemoveBoard={onRemoveBoard} setBoards={setBoards} />
        </section>
    )
}