import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { utilService } from "../../services/util.service";
import { MiniLabelList } from "./task-preview/task-preview-mini-labels-list";
import { closeDynamicModal, openDynamicModal, updateDynamicModalPos } from "../../store/modal/modal.action"
import { useForm } from "../../customHooks/useForm";
import { saveTask } from "../../store/board/board.action";

export function QuickTaskEdit({ task, setIsQuickEdit, quickEditModalPos }) {
    const [editAnimation, setEditAnimation] = useState(false)
    setTimeout(() => { setEditAnimation(true) }, 100)

    const [title, setTitle, handleChange] = useForm(task.title)

    const windowSize = utilService.getWindowDimensions()

    const { boardId } = useParams()
    const navigate = useNavigate()

    let background

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

    function renderPos() {
        const maxHeight = 150
        let pos = 'normal'
        if (quickEditModalPos.height + quickEditModalPos.y + maxHeight > windowSize.height) pos = 'toLow'

        switch (pos) {
            case 'normal':
                return {
                    top: `${quickEditModalPos.y}px`,
                    left: `${quickEditModalPos.x}px`,
                    width: `${quickEditModalPos.width}px`,
                }
            case 'toLow':
                return {
                    top: `${quickEditModalPos.y}px`,
                    left: `${quickEditModalPos.x}px`,
                    width: `${quickEditModalPos.width}px`,
                    transform: `translateY(-50%)`,
                }
            default:
                break;
        }

    }
    function checkPress(ev) {
        const pressedClickPos = ev.target.getBoundingClientRect()
        setIsQuickEdit(false)
    }
    let left = false
    if (quickEditModalPos.x + quickEditModalPos.width > windowSize.width) left = true

    return (
        <section onClick={(ev) => {
            ev.stopPropagation()
            setIsQuickEdit(false)
            closeDynamicModal()
        }} className='quick-task-edit'>

            <div onClick={(ev) => {
                ev.preventDefault()
                ev.stopPropagation()
            }} style={renderPos()} className='quick-task-edit-container'>

                <div className={`${!left ? `quick-edit-side` : 'quick-card-editor-buttons-left'} ${editAnimation && 'fade-in'}`}>
                    <button className="edit-side-btn">Open card</button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'labels', task })} className="edit-side-btn">Edit labels</button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'members', task })} className="edit-side-btn">Change members</button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'cover', task })} className="edit-side-btn">Change cover</button>
                    <button className="edit-side-btn">Copy</button>
                    <button className="edit-side-btn">Edit dates</button>
                    <button className="edit-side-btn">Archive</button>
                </div>

                <div className="quick-task-edit-content">

                    {task.style && <div style={background} className="task-preview-comver-img">
                    </div>}
                    <div className="quick-task-edit-details">
                        {task.labelIds &&
                            <MiniLabelList task={task} />}

                        <textarea type="text" name='title' onChange={handleChange} defaultValue={title} />
                        <div className="task-icons">
                        </div>
                    </div>
                    <div className="task-preview-edit-icon">

                    </div>
                </div>

                <button onClick={(ev) => {
                    task.title = title.title
                    saveTask(task)
                    setIsQuickEdit(false)
                    closeDynamicModal()
                }} className="btn-add">Save</button>
            </div>
        </section>
    )
}