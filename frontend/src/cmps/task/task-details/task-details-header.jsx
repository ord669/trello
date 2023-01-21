import { useEffect, useState } from "react";
import { TaskTitleIcon, TitleIcon } from "../../../assets/svg/icon-library";
import { DetilsTitle } from "./task-details-title";

export function DetailsHeader({ onUpdateHeadline, task, group }) {

    const [isCover, setIsCover] = useState()

    useEffect(() => {

    }, [])

    let styleBgColor
    let styleBgImg

    if (task.style) {
        styleBgColor = {
            backgroundColor: `${task.style.bgColor}`,
            minHeight: "116px",
            maxHeight: "116px",
        }
        styleBgImg = {
            backgroundImage: `url(${task.style.img})`,
            minHeight: "160px",
            maxHeight: "160px",
        }
    }

    function taskPreviewImgCover() {
        console.log('in:')
        if (task.style.bgColor) return styleBgColor
        else return styleBgImg
    }

    return (
        <section className='header-title-container'>
            <div className="image-cover-container">
                {/* <button onClick={() => navigate(`/board/${board._id}`)}
                    className="btn details-close-btn"><CloseIcon />
                </button> */}

                {task.style.bgColor && <div style={taskPreviewImgCover()} className="task-details-cover"></div>}
                {!task.style.bgColor && <div style={taskPreviewImgCover()} className="task-details-img "></div>}
            </div>

            <div className="header-title-title-container flex  align-center">
                <TaskTitleIcon className='icon-title' />
                <DetilsTitle onUpdateHeadline={onUpdateHeadline} task={task} group={group} />
            </div>
        </section>
    )
}