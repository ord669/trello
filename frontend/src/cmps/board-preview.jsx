import { useNavigate } from "react-router-dom"

export function BoardPreview({ board }) {
    const navigate = useNavigate()
    return (
        <section className='board-preview' onClick={() => navigate(`/board/${board._id}`)}>
            board-preview
        </section>
    )
}