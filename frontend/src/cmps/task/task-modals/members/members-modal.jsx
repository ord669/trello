import { useForm } from "../../../../customHooks/useForm";
import { ModalMembersList } from "./members-modal-list";

export function MembersModal({ board, currTask, getMembers, toggleMemberAssigned }) {

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
            <ModalMembersList filterBy={filterBy} board={board} currTask={currTask} getMembers={getMembers} toggleMemberAssigned={toggleMemberAssigned} />
        </section>
    )
}