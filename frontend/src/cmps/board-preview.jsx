import { useNavigate } from "react-router-dom"

export function BoardPreview({ board, onRemoveBoard }) {
    const navigate = useNavigate()
    return (
        <section className='board-preview' onClick={() => navigate(`/board/${board._id}`)}>
            {board.title}
            <button onClick={(ev) => onRemoveBoard(ev,board._id)}>X</button>
        </section>
    )
}