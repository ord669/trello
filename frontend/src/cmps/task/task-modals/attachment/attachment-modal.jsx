import { useForm } from "../../../../customHooks/useForm";
import { AttachmentList } from "./attachment-modal-list";


export function AttachmentModal({ board, currTask, getMembers, onSelectMember }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })

    return (
        <section className='members-modal-container'>
            <div className="modal-header">
                <input
                    type="text"
                    name="txt"
                    autoFocus
                    onChange={handleChange}
                    placeholder="Search members" />
            </div>
            <AttachmentList board={board} currTask={currTask} />
        </section>
    )
}