import { useForm } from "../../../../customHooks/useForm";
import { AttachmentList } from "./attachment-modal-list";

export function AttachmentModal({ board, currTask, getMembers, onSelectMember }) {

    const [attachment, setAttachment, handleChange] = useForm('')
    console.log('attachment: ', attachment);
    const [title, setTitle, handleChangeTitle] = useForm('')
    console.log('title: ', title);

    return (
        <section className='members-modal-container'>
            <div className="modal-header">
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
            <button className="btn-link">Attach</button>
        </section>
    )
}