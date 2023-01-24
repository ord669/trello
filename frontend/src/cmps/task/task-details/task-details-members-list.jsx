import { PlusIcon } from "../../../assets/svg/icon-library"
import { openDynamicModal } from "../../../store/modal/modal.action"
import { UserAvatarIcon } from "../../user-avatar-icon"

export function MembersList({ board, task, getMembers, onSelectMember }) {
    return (
        <section className='members-List'>
            <p>Members</p>
            <div className="members-icons-container  ">
                {getMembers(board, task).map((member, idx) =>
                    <div onClick={() => {
                        onSelectMember(member._id)
                    }} key={idx}>
                        <UserAvatarIcon member={member} />
                    </div>)}
                <div className="user-avatar-icon details-user-avatar-icon"
                    onClick={(ev) =>
                        openDynamicModal({
                            ev,
                            name: 'members',
                            func: {
                                getMembers,
                                onSelectMember
                            }
                        })}
                >
                    <PlusIcon />
                </div>
            </div>
        </section>
    )
}