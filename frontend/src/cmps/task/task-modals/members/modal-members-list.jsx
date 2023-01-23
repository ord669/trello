import { UserAvatarIcon } from "../../../user-avatar-icon"

export function ModalMembersList({ board, onSelectMember }) {

    return (
        <section className='modal-members-list-container'>
            <h4>Board members</h4>
            <div className="modal-members-list-body">
                {board.members.map((member, idx) =>
                    <div onClick={() => onSelectMember(member._id)} key={idx} className={"member-container "}>
                        <div className="modal-member-icon">
                            <UserAvatarIcon member={member} />

                        </div>
                        <div className="member-container-text-container">
                            <p>{member.fullname}</p>
                            <p>{`(${member.username})`}</p>
                        </div>

                    </div>)}

            </div>
        </section>
    )
}