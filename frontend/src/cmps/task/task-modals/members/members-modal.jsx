import { useForm } from "../../../../customHooks/useForm";

import { ModalMembersList } from "./members-modal-list";

export function MembersModal({ board, currTask, getMembers, onSelectMember }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })

    return (
        <section className='members-modal-container'>
            <div className="members-modal-header">
                <input onChange={handleChange} type="text" name="txt" placeholder="Search members" />
            </div>
            <ModalMembersList filterBy={filterBy} board={board} currTask={currTask} getMembers={getMembers} onSelectMember={onSelectMember} />
        </section>
    )
}