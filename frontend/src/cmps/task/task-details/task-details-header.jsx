import { useNavigate } from "react-router-dom"
import { CloseIcon, TaskTitleIcon } from "../../../assets/svg/icon-library"
import { FiCreditCard } from "react-icons/fi";

import { closeDynamicModal, openDynamicModal } from "../../../store/modal/modal.action"
import { DetilsTitle } from "./task-details-title"
import { useEffect, useState } from "react";
import { utilService } from "../../../services/util.service";

export function DetailsHeader({ onUpdateHeadline, task, group, boardId, setnoBg, noBg }) {
    const navigate = useNavigate()
    const [color, setColor] = useState('')
    let background
    let showImgBg

    useEffect(() => {
        if (!task.style.background) setnoBg(true)
        setDynamicColor()
        return () => {
        }
    }, [task])

    function onCloseTask() {
        closeDynamicModal()
        navigate(`/board/${boardId}`)
    }
    async function setDynamicColor() {
        if (!task.style.background) return
        const bg = task.style.background
        if (bg.includes('https')) {
            try {
                const colorIsDark = await utilService.getBgUrlIsDark(bg)
                const color = colorIsDark ? "#fff" : "#172b4d"
                setColor(color)
            } catch (err) {
                console.error(err)
            }
        }

        else {
            const colorIsDark = utilService.getBgIsDarkColorHex(bg)
            const color = colorIsDark ? "#fff" : "#172b4d"
            setColor(color)
        }
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
                <button style={{ stroke: color, color }} onClick={onCloseTask}
                    className="btn details-close-btn"><CloseIcon />
                </button>
                {showImgBg && !noBg && <div style={background} className="task-details-cover"></div>}
                {!showImgBg && !noBg && <div style={background} className="task-details-img "></div>}
                {!noBg && <button style={{ fill: color, color }} className="btn-bar "
                    onClick={(ev) => openDynamicModal({ ev, name: 'cover', task, func: { setnoBg } })} ><FiCreditCard /> Cover</button>}
            </div>
            <div className="header-title-title-container flex  align-center">
                <TaskTitleIcon className='icon-title' />
                <DetilsTitle onUpdateHeadline={onUpdateHeadline} task={task} group={group} />
            </div>
        </section>
    )
}