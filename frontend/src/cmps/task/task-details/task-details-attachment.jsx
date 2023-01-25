import { AttachmentIcon } from "../../../assets/svg/icon-library";
import { utilService } from "../../../services/util.service";
import { openDynamicModal } from "../../../store/modal/modal.action";

export function TaskDetailsAttachment({ task, attachment, onRemoveAttach, onEditAttach }) {

    function time(timestamp) {
        return utilService.formatTime(timestamp)
    }

    return (
        <section className='task-details-attachment'>

            <div className="task-details-attachment-content-container">
                <div className="task-details-attachment-content">
                    <div className="img-container">
                        <div style={{ backgroundImage: `url(${attachment.file})` }} ></div>
                    </div>
                    <div className="attachment-details">
                        <p>{attachment.title && attachment.title}</p>
                        <div className="attachment-details-crud">
                            <p>{attachment.createdAt && time(attachment.createdAt)}</p>
                            <ul className="">
                                <li onClick={() => onRemoveAttach(attachment._id)}>Delete</li>
                                <li onClick={(ev) => openDynamicModal({ ev, name: 'edit attachment', func: { onEditAttach }, data: { attachment }, task })}>Edit</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}