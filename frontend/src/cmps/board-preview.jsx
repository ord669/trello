import { useNavigate } from "react-router-dom"
import { EmptyStarIcon, FullStarIcon } from "../assets/svg/icon-library"

export function BoardPreview({ board, toggleIsStarred }) {
    const navigate = useNavigate()
    return (
        <section className='board-preview' onClick={() => navigate(`/board/${board._id}`)}
            style={{ backgroundImage: `url(${board.style.background})` }}>
            <span className="board-hover">
                <h3>{board.title}</h3>
                <section className={`board-star ${board.isStarred ? 'show' : ''}`} onClick={(ev) => toggleIsStarred(ev, board)}>
                    {board.isStarred ? <FullStarIcon /> : <EmptyStarIcon />}
                </section>
            </span>
        </section>
    )
}