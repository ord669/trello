import { Draggable } from "react-beautiful-dnd"
import { useNavigate, useParams } from "react-router-dom"
import { PenIcon } from "../../assets/svg/icon-library"

export function TaskPreview({ task, idx }) {
    const { boardId } = useParams()
    const navigate = useNavigate()

    return (
        <Draggable draggableId={task._id} index={idx}>
            {(provided,snapshot) => (
                <section
                    // className='task-preview'
                    className={`task-preview ${snapshot.isDragging  ? 'dragged' : ''}`}
                    onClick={() => { navigate(`${task.groupId}/${task._id}`) }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <p>{task.title}</p>
                    <div className="task-icons">
                    </div>

                    <div className="task-preview-edit display-none">
                        <PenIcon />
                    </div>
                </section>
            )}
        </Draggable>
    )
}