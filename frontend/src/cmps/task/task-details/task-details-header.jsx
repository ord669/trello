import { useNavigate } from "react-router-dom"
import { CloseIcon, TaskTitleIcon } from "../../../assets/svg/icon-library"
import { FiCreditCard } from "react-icons/fi";

import { closeDynamicModal, openDynamicModal } from "../../../store/modal/modal.action"
import { DetilsTitle } from "./task-details-title"
import { useEffect, useState } from "react";

export function DetailsHeader({ onUpdateHeadline, task, group, boardId, setnoBg, noBg }) {
    const navigate = useNavigate()
    let background
    let showImgBg

    useEffect(() => {
        if (!task.style.background) setnoBg(true)
        return () => {
        }
    }, [])

    function onCloseTask() {
        closeDynamicModal()
        navigate(`/board/${boardId}`)
    }

    if (!task.style.background.includes('https')) {
        background = {
            backgroundColor: `${task.style.background}`,
            minHeight: "116px",
            maxHeight: "116px",
        }
        showImgBg = false
    } else {
        background = {
            backgroundImage: `url(${task.style.background})`,
            minHeight: "160px",
            maxHeight: "160px",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
        showImgBg = true
    }

    return (
        <section className='header-title-container'>
            <div className="image-cover-container">
                <button onClick={onCloseTask}
                    className="btn details-close-btn"><CloseIcon />
                </button>
                {showImgBg && !noBg && <div style={background} className="task-details-cover"></div>}
                {!showImgBg && !noBg && <div style={background} className="task-details-img "></div>}
                <button className="btn-bar "
                    onClick={(ev) => openDynamicModal({ ev, name: 'cover', task })}
                ><FiCreditCard /> Cover</button>

            </div>
            <div className="header-title-title-container flex  align-center">
                <TaskTitleIcon className='icon-title' />
                <DetilsTitle onUpdateHeadline={onUpdateHeadline} task={task} group={group} />
            </div>
        </section>
    )
}