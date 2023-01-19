import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BoardList } from "../cmps/board-list"
import { BoardPreview } from "../cmps/board-preview"
import { MainSidemenu } from "../cmps/main-side-menu"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function BoardIndex() {
    const [boards, setBoards] = useState([])
    const navigate = useNavigate()
    console.log('boards:', boards)

    useEffect(() => {
        loadBoards()
    }, [])

    async function loadBoards() {
        const boards = await boardService.query()
        setBoards(boards)
    }

    async function onCreateBoard() {
        try {
            const title = prompt('Enter board title')
            if (!title) return
            const boardToSave = boardService.getEmptyBoard(title)
            const savedBoard = await boardService.save(boardToSave)
            // setBoards(prevBoards => [...prevBoards, savedBoard])
            navigate(`/board/${savedBoard._id}`)
            showSuccessMsg('Board created')
        } catch (err) {
            showErrorMsg('Cannot create new board')
        }
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

    return (
        <section className='board-index'>
            <MainSidemenu />
            <main>
                <h1>YOUR WORKSPACES</h1>
                <BoardList boards={boards} onCreateBoard={onCreateBoard} onRemoveBoard={onRemoveBoard} />
            </main>
        </section>
    )
}