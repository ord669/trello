import { MembersList } from "../../task-details/task-details-members-list";
import { ModalMembersList } from "./modal-members-list";

export function MembersModal({ board, currTask, getMembers, onSelectMember }) {

    return (
        <section className='members-modal-container'>
            <div className="members-modal-header">
                <input type="text" />
            </div>
            <ModalMembersList board={board} getMembers={getMembers} onSelectMember={onSelectMember} />

        </section>
    )
}