import { Draggable } from "react-beautiful-dnd"
import { useNavigate } from "react-router-dom"
import { PenIcon } from "../../../assets/svg/icon-library"
import { openDynamicModal } from "../../../store/modal/modal.action"
import { TaskPreviewIcons } from "./task-preview-icons"
import { MiniLabelList } from "./task-preview-mini-labels-list"

export function TaskPreview({ task, idx }) {
    const navigate = useNavigate()

    const styleBgColor = {  //better to to from scss
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
        if (task.style.bgColor) return styleBgColor
        if (task.style.img) return styleBgImg
    }


    return (
        <Draggable draggableId={task._id} index={idx}>
            {(provided, snapshot) => (
                <section className={`task-preview ${snapshot.isDragging ? 'dragged' : ''}`}
                    onClick={(ev) => {

                        openDynamicModal(ev)
                        navigate(`${task.groupId}/${task._id}`)
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>

                    {task.style && <div style={taskPreviewImgCover()} className="task-preview-comver-img">
                    </div>}
                    <div className="task-preview-details">
                        {task.labelIds &&
                            <MiniLabelList task={task} />}
                        <p>{task.title}</p>
                        <div className="task-icons">
                        </div>
                    </div>
                    <div className="task-preview-edit-icon">
                        <div className="task-preview-edit display-none">
                            <PenIcon />
                        </div>
                    </div>

                    {/* <div className="task-preview-icons-container">
                        <TaskPreviewIcons />
                    </div> */}
                </section>
            )}
        </Draggable>
    )
}