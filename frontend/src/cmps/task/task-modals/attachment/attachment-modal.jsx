import { useForm } from "../../../../customHooks/useForm"
import { taskService } from "../../../../services/task.service"
import { saveTask } from "../../../../store/task/task.action"
import { ImgUploader } from "../../../img-uploader"

export function AttachmentModal({ currTask }) {
    const [attachment, setAttachment, handleChange] = useForm('')

    async function onUploadedAttach(url, title = 'uploded img') {
        currTask.attachments.push(taskService.getAttachment(url, title))
        try {
            saveTask(currTask)
        } catch (err) {
            console.log('err', err)
        }
    }

    return (
        <section className='attachs-modal-container'>
            <div className="modal-header">
                <div className="uploads-container uploads-btn no-paddin-full">
                    <ImgUploader onUploaded={onUploadedAttach} type={'attach'} styleClass={{ attachLableBtn: '' }} content={{ title: 'Computer' }} showFile={false} />
                </div>
                <hr />
                <div className="attach-link">
                    Attach a link
                    <input
                        type="text"
                        name="attachLink"
                        autoFocus
                        onChange={handleChange}
                        placeholder="Paste any link here..." />
                </div>
            </div>
        </section>
    )
}