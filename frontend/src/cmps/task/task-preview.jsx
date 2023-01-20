import { Draggable } from "react-beautiful-dnd"
import { useNavigate, useParams } from "react-router-dom"
import { PenIcon } from "../../assets/svg/icon-library"

export function TaskPreview({ task, idx }) {
    console.log('task: ', task);
    const { boardId } = useParams()
    const navigate = useNavigate()

    const styleBgColor = {
        borderTopLeftRadius: "3px",
        borderTopRightRadius: "3px",
        height: "32px",
        backgroundColor: `${task.style.bgColor}`

    }
    const styleBgImg = {
        borderTopLeftRadius: "3px",
        borderTopRightRadius: "3px",
        height: "125px",
        width: "100%",
        backgroundImage: `url(${task.style.img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }

    function taskPreviewImgCover() {
        console.log('in:')
        if (task.style.bgColor) return styleBgColor
        else return styleBgImg
    }
    console.log(' taskPreviewImgCover(): ', taskPreviewImgCover());

    return (
        <Draggable draggableId={task._id} index={idx}>
            {(provided, snapshot) => (
                <section className={`task-preview ${snapshot.isDragging ? 'dragged' : ''}`}
                    onClick={() => { navigate(`${task.groupId}/${task._id}`) }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {task.style && <div style={taskPreviewImgCover()} className="task-preview-comver-img">
                    </div>}
                    <div className="task-preview-details">
                        <p>{task.title}</p>
                        <div className="task-icons">
                        </div>

                    </div>

                    <div className="task-preview-edit-icon">
                        <div className="task-preview-edit display-none">
                            <PenIcon />
                        </div>
                    </div>
                </section>
            )}
        </Draggable>
    )
}