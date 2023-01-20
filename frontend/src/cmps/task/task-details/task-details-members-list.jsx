import { PlusIcon } from "../../../assets/svg/icon-library"
import { UserAvatarIcon } from "../../user-avatar-icon"

export function MembersList({ getMembers, onSelectMember }) {
    return (
        <section className='members-List'>
            <p>Members</p>
            <ul className="flex clean-list ">
                {getMembers().map((member, idx) =>
                    <li onClick={() => {
                        onSelectMember(member._id)
                    }} key={idx}>
                        <UserAvatarIcon member={member} />
                    </li>
                )
                }
                <li className="user-avatar-icon" >
                    <PlusIcon />
                </li>
            </ul>
        </section>
    )
}