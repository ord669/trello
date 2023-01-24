import { PlusIcon } from "../../../assets/svg/icon-library"
import { taskService } from "../../../services/task.service.local"
import { toggleMemberAssigned } from "../../../store/board/board.action"
import { openDynamicModal } from "../../../store/modal/modal.action"
import { UserAvatarIcon } from "../../user-avatar-icon"

export function MembersList({ board, task }) {
    return (
        <section className='members-List'>
            <p>Members</p>
            <div className="members-icons-container  ">
                {taskService.getMembers(board, task).map((member, idx) =>
                    <div onClick={() => {
                        toggleMemberAssigned(member._id, task.groupId, task._id)
                    }} key={idx}>
                        <UserAvatarIcon member={member} />
                    </div>)}
                <div className="user-avatar-icon details-user-avatar-icon"
                    onClick={(ev) => openDynamicModal({ ev, name: 'members', task })}>
                    <PlusIcon />
                </div>
            </div>
        </section>
    )
}