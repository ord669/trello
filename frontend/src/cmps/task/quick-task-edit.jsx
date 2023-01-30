import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { CgCreditCard } from "react-icons/cg"
import { MdLabelOutline } from "react-icons/md"
import { FiCreditCard } from "react-icons/fi"
import { HiOutlineCreditCard } from "react-icons/hi"
import { AiOutlineClockCircle } from "react-icons/ai"
import { BsArchive } from "react-icons/bs"

import { utilService } from "../../services/util.service"
import { MiniLabelList } from "./task-preview/task-preview-mini-labels-list"
import { closeDynamicModal, openDynamicModal, updateDynamicModalPos } from "../../store/modal/modal.action"
import { useForm } from "../../customHooks/useForm"
import { removeTask, saveTask } from "../../store/task/task.action"
import { IconContext } from "react-icons"
import { ManIcon } from "../../assets/svg/icon-library"

export function QuickTaskEdit({ task, setIsQuickEdit, quickEditModalPos }) {
    const [editAnimation, setEditAnimation] = useState(false)
    const [title, setTitle, handleChange] = useForm(task.title)
    const navigate = useNavigate()
    setTimeout(() => { setEditAnimation(true) }, 100)
    const windowSize = utilService.getWindowDimensions()

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

        // if (modalPos.x + modalWidth > windowSize.width) posToRender = "downLeft"
        // if (elementStartBottom + modalHeight > windowSize.height) posToRender = "upRight"
        // if (elementStartBottom + modalHeight > windowSize.height &&
        //     modalPos.x + modalWidth > windowSize.width) posToRender = "upLeft"

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
                break
        }

    }

    let left = false
    if (quickEditModalPos.right + quickEditModalPos.width > windowSize.width) left = true

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
                    <button className="edit-side-btn" onClick={() => {
                        navigate(`${task.groupId}/${task._id}`)
                        setIsQuickEdit(false)
                    }}
                    ><CgCreditCard /><span>Open card</span></button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'labels', task })} className="edit-side-btn">
                        <MdLabelOutline />
                        <span>Edit labels</span></button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'members', task })} className="edit-side-btn">
                        <ManIcon />
                        <span>Change members</span></button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'cover', task })} className="edit-side-btn">
                        <FiCreditCard />
                        <span>Change cover</span>
                    </button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'copy card', task })} className="edit-side-btn"> <HiOutlineCreditCard /> <span>Copy</span></button>
                    <button onClick={(ev) => openDynamicModal({ ev, name: 'dates', task })} className="edit-side-btn"><AiOutlineClockCircle /> <span>Edit dates</span></button>
                    <button onClick={() => removeTask(task)} className="edit-side-btn"><BsArchive /> <span>Archive</span></button>
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
                    try {
                        saveTask(task)
                    } catch (err) {
                        console.log('err quick edit title', err)
                    }
                    setIsQuickEdit(false)
                    closeDynamicModal()
                }} className="btn-add">Save</button>
            </div>
        </section>
    )
}