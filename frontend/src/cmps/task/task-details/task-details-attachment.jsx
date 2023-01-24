import { AttachmentIcon } from "../../../assets/svg/icon-library";

export function TaskDetailsAttachment({ task, attachment }) {
    return (
        <section className='task-details-attachment'>
            <div className="task-details-attachment-header">
                <div className="attachment-icon">
                    <AttachmentIcon />
                </div>
                <h3>Attachments</h3>
            </div>
            <div className="task-details-attachment-content-container">
                <div className="task-details-attachment-content">
                    <div className="img-container">
                        <img src={attachment.file} />
                    </div>
                    <h3>{attachment.title && attachment.title}</h3>
                    <h3>{attachment.createdAt && attachment.createdAt}</h3>

                    {/* {attachment.file && <img style={{ backgroundImage: `url(${attachment.file})` }} />} */}
                </div>
            </div>

        </section>
    )
}