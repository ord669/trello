import { Draggable } from "react-beautiful-dnd"
import { useNavigate } from "react-router-dom"
import { PenIcon } from "../../../assets/svg/icon-library"
import { TaskPreviewIcons } from "./task-preview-icons"
import { MiniLabelList } from "./task-preview-mini-labels-list"
import { useEffect } from "react"
import { useRef } from "react"
import { QuickTaskEdit } from "../quick-task-edit"
import { useState } from "react"

export function TaskPreview({ task, idx }) {
    const navigate = useNavigate()
    const elTaskPreview = useRef()
    const [quickEditModalPos, setQuickEditModalPos] = useState(null)
    const [isQuickEdit, setIsQuickEdit] = useState(false)

    let background

    useEffect(() => {
        elTaskPreview.current.addEventListener('contextmenu', (ev) => {
            ev.preventDefault()
            setIsQuickEdit(true)
            setQuickEditModalPos(elTaskPreview.current.getBoundingClientRect())
        })
    }, [])

    if (!task?.style?.background?.includes('https')) {
        background = {
            backgroundColor: `${task.style.background}`,
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "32px",
        }

    } else {
        background = {
            backgroundImage: `url(${task.style.background})`,
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "125px",
            width: "100%",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
    }

    return (
        <Draggable draggableId={task._id} index={idx}>
            {(provided, snapshot) => (
                <section className={`task-preview ${snapshot.isDragging ? 'dragged' : ''}`}
                    onClick={() => navigate(`${task.groupId}/${task._id}`)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {isQuickEdit &&
                        <QuickTaskEdit
                            task={task}
                            setIsQuickEdit={setIsQuickEdit}
                            quickEditModalPos={quickEditModalPos}
                        />}
                    <div ref={elTaskPreview} className="task-preview-container"
                        {...provided.dragHandleProps}
                        style={{ cursor: 'pointer' }}
                    >
                        {task.style.background && <div style={background} className="task-preview-comver-img">
                        </div>}
                        <div className="task-preview-details" >
                            {!!task.labelIds.length &&
                                <MiniLabelList task={task} />}
                            <p>{task.title}</p>
                            {<TaskPreviewIcons task={task} />}
                        </div>
                        <div className="task-preview-edit-icon">
                            <div className="task-preview-edit display-none">
                                <PenIcon />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Draggable>
    )
}