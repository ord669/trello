import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { BoardStarred } from "./board-starred"

export function BoardRecent({ setIsRecent, type }) {
    const navigate = useNavigate()
    const [boards, setBoards] = useState([])

    useEffect(() => {
        loadBoards()
    }, [])

    async function loadBoards() {
        try {
            const boards = await boardService.query()
            if (type === 'recent') setBoards(boards)
            else {
                const starredBoards = boards.filter(board => board.isStarred)
                setBoards(starredBoards)
            }

        } catch (err) {
            console.error(err)
        }
    }


    return (
        <section onBlur={() => console.log('in blur')} className='board-recent'>
            {boards.map(board =>
                <div key={board._id} className=" board-recent-card ">
                    <div onClick={() => navigate(`/board/${board._id}`)} className="recent-content">
                        <div style={{ backgroundImage: `url(${board.style.bgImgURL})` }} className="board-recent-img">
                        </div>
                        <div className="board-recent-title">
                            <p>{board.title}</p>
                        </div>
                    </div>
                    <button><BoardStarred board={board} /></button>
                </div>
            )}

        </section>
    )
}