import { PlusIcon } from "../../../assets/svg/icon-library"
import { UserAvatarIcon } from "../../user-avatar-icon"

export function MembersList({ getMembers, onSelectMember }) {
    return (
        <section className='members-List'>
            <p>Members</p>
            <div className="members-icons-container  ">
                {getMembers().map((member, idx) =>
                    <div onClick={() => {
                        onSelectMember(member._id)
                    }} key={idx}>
                        <UserAvatarIcon member={member} />
                    </div>)}
                <div className="user-avatar-icon details-user-avatar-icon" >
                    <PlusIcon />
                </div>
            </div>
        </section>
    )
}