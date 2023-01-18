import { useNavigate, useParams } from "react-router-dom";
import { PenIcon } from "../../assets/svg/icon-library";

export function TaskPreview({ task }) {
    const { boardId } = useParams()
    const navigate = useNavigate()

    return (
        <section onClick={() => { navigate(`${task._id}`) }} className='task-preview'>
            <p>{task.title}</p>

            <div className="task-icons">
            </div>
            <div className="task-preview-edit display-none">
                <PenIcon />
            </div>
        </section>
    )
}