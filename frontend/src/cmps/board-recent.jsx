import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoaderIcon } from "../assets/svg/icon-library"
// import { boardService } from "../services/board.service.local"
import { boardService } from "../services/board.service"
import { BoardStarred } from "./board-starred"

export function BoardRecent({ type, setIsRecent }) {
    const navigate = useNavigate()
    const [boards, setBoards] = useState([])
    const [someBoardsIsStarred, setSomeBoardIsStarred] = useState(true)

    useEffect(() => {
        loadBoards()
    }, [])

    async function loadBoards() {
        try {
            const boards = await boardService.query()
            if (type === 'recent') setBoards(boards)
            else if (type === 'starred') {
                const starredBoards = boards.filter(board => board.isStarred)
                setBoards(starredBoards)
                const boardsIsStarred = boards.some(board => board.isStarred)
                setSomeBoardIsStarred(boardsIsStarred)
            }
        } catch (err) {
            console.error(err)
        }
    }

    function setStyle(BG) {
        let style
        if (BG.includes('https')) {
            style = {
                backgroundImage: `url(${BG})`
            }
        } else {
            style = {
                background: BG
            }
        }
        return style
    }

    function onNavigate(board) {
        setIsRecent(false)
        navigate(`/board/${board._id}`)
    }

    return (
        <section className='board-recent'>
            {(!boards.length && someBoardsIsStarred) && <div className="loader">
                <LoaderIcon />
            </div>}
            {(!someBoardsIsStarred && type === 'starred') && <div className="board-recent-empty">
                <img src="https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674313433/starred-board.cc47d0a8c646581ccd08_fcn5p9.svg" alt="" />
                <p>Star important boards to access them quickly and easily.</p>
            </div>}

            {boards && boards.map(board =>
                <div key={board._id} className=" board-recent-card ">
                    <div onClick={() => onNavigate(board)} className="recent-content">
                        <div style={setStyle(board.style.background)} className="board-recent-img">
                        </div>
                        <div className="board-recent-title">
                            <p>{board.title}</p>
                        </div>
                    </div>
                    <button><BoardStarred board={board} /></button>
                </div>)}
        </section>
    )
}