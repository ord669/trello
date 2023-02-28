import { useForm } from "../../../../customHooks/useForm"

export function EditAttachment({ attachment, onEditAttach }) {
    const [title, setTitle, handleChange] = useForm({ txt: '' })

    return (
        <section className='modal-members-list-container'>
            <div className="modal-header">
                <h4>Board members</h4>

                <input
                    type="text"
                    name="txt"
                    autoFocus
                    onChange={handleChange}
                    placeholder="Search members" />
            </div>
            <button onClick={() => onEditAttach(attachment, title)} >Update</button>
        </section>
    )
}