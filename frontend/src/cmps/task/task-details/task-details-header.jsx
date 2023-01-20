import { TitleIcon } from "../../../assets/svg/icon-library";
import { DetilsTitle } from "./task-details-title";

export function DetailsHeader({ onUpdateHeadline, task, group }) {
    return (
        <section className='header-title-container'>
            <div className="image-cover-container">
                {task?.style && <div className="task-details-cover"></div>}
                {/* {task?.style?.image && <div className="task-details-img "></div>} */}
            </div>

            <div className="header-title-title-container flex  align-center">
                <TitleIcon className='icon-title' />
                <DetilsTitle onUpdateHeadline={onUpdateHeadline} task={task} group={group} />
            </div>
        </section>
    )
}