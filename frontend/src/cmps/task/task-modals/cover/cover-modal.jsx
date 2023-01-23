import { useForm } from "../../../../customHooks/useForm";

export function CoverModal({ board, currTask, getMembers, onSelectMember }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })

    return (
        <section className='members-modal-container'>
            <div className="members-modal-header">

            </div>
            <section className='modal-members-list-container'>
                <h4>Board members</h4>
                <div className="modal-members-list-body">

                </div>
            </section>
        </section>
    )
}