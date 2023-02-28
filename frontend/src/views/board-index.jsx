import { useEffect, useState } from "react"
import { Clock, EmptyStarIcon } from "../assets/svg/icon-library"
import { BoardList } from "../cmps/board-list"
import { boardService } from "../services/board.service"
import { socketService, SOCKET_EVENT_REMOVE_BOARD, SOCKET_EVENT_SAVE_BOARD } from "../services/socket.service"

export function BoardIndex() {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        loadBoards()
        socketService.on(SOCKET_EVENT_SAVE_BOARD, saveSocketBoard)
        socketService.on(SOCKET_EVENT_REMOVE_BOARD, removeSocketBoard)
        return () => {
            socketService.off(SOCKET_EVENT_SAVE_BOARD, saveSocketBoard)
            socketService.off(SOCKET_EVENT_REMOVE_BOARD, removeSocketBoard)
        }
    }, [])

    async function loadBoards() {
        const boards = await boardService.query()
        setBoards(boards)
    }

    function saveSocketBoard(socketBoard) {
        setBoards(prevBoards => {
            const boardIdx = prevBoards.findIndex(currBoard => currBoard._id === socketBoard._id)
            if (boardIdx !== -1) {
                prevBoards.splice(boardIdx, 1, socketBoard)
            } else {
                prevBoards.push(socketBoard)
            }
            return [...prevBoards]
        })
    }

    function removeSocketBoard(socketBoardId) {
        setBoards(prevBoards => prevBoards.filter(board => board._id === socketBoardId))
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
            {!!boards.length && <BoardList boards={[boards[0]]} setBoards={setBoards} />}
            <section className="sub-title">Your boards</section>
            <BoardList boards={boards} setBoards={setBoards} isCreate={true} />
        </section>
    )
}