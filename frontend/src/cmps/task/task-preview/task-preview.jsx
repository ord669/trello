import { Draggable } from "react-beautiful-dnd"
import { useNavigate } from "react-router-dom"
import { AttacheIcon, AttachmentIcon, ChecklistIcon, CheckListIcon, PenIcon } from "../../../assets/svg/icon-library"
import { openDynamicModal, quickEdit } from "../../../store/modal/modal.action"
import { TaskPreviewIcons } from "./task-preview-icons"
import { MiniLabelList } from "./task-preview-mini-labels-list"
import { useEffect } from "react"
import { useRef } from "react"
import { QuickTaskEdit } from "../quick-task-edit"
import { useState } from "react"
import { TaskPreviewLabels } from "./task-preview-mini-labels"
import { useSelector } from "react-redux"

export function TaskPreview({ task, idx }) {
    console.log('task: ', task);
    const navigate = useNavigate()
    const elTaskPreview = useRef()
    const [quickEditModalPos, setQuickEditModalPos] = useState(null)
    const [isQuickEdit, setIsQuickEdit] = useState(false)
    const [isShownLabels, setIsShownLabels] = useState(false)

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

    function setLabelsShown(ev) {
        ev.stopPropagation()
        setIsShownLabels(prev => !prev)

    }

    // function taskPreviewImgCover() {
    //     if (task.style.bgColor) return styleBgColor
    //     if (task.style.img) return styleBgImg
    // }

    return (
        <Draggable draggableId={task._id} index={idx}>
            {(provided, snapshot) => (
                <section className={`task-preview ${snapshot.isDragging ? 'dragged' : ''}`}
                    onClick={(ev) => navigate(`${task.groupId}/${task._id}`)}
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
                            {task.labelIds &&
                                <MiniLabelList task={task} />}
                            <p>{task.title}</p>
                            {<TaskPreviewIcons task={task} />}
                            <div>

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
                    </div>
                </section>
            )}
        </Draggable>
    )
}