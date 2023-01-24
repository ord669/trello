import { useForm } from "../../../../customHooks/useForm";
import { taskService } from "../../../../services/task.service.local";
import { utilService } from "../../../../services/util.service";
import { saveTask } from "../../../../store/board/board.action";
import { ImgUploader } from "../../../img-uploader";
import { AttachmentList } from "./attachment-modal-list";

export function AttachmentModal({ board, currTask, getMembers, onSelectMember }) {

    const [attachment, setAttachment, handleChange] = useForm('')
    console.log('attachment: ', attachment);
    const [title, setTitle, handleChangeTitle] = useForm('')
    console.log('title: ', title);
    console.log('currTask: ', currTask);

    async function onUploadedAttach(url, title = 'uploded img') {
        console.log('url: ', url)

        currTask.attachments.push(taskService.getAttachment(url, title))
        // currTask.attachments.push({ 'file': url, title, createdAt: utilService.makeId() })
        console.log('currTask: ', currTask);
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
                {attachment &&
                    <input
                        type="text"
                        name="title"
                        autoFocus
                        onChange={handleChangeTitle}
                        placeholder="Link name (optional)" />}
            </div>
        </section>
    )
}