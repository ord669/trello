import { useEffect } from "react"
import { useState } from "react"
import { UserAvatarIcon } from "../../../user-avatar-icon"

export function ModalMembersList({ filterBy, board, currTask, getMembers, onSelectMember }) {

    function filteredMembers(filterBy) {
        let filteredMembers = [...board.members]
        if (filterBy !== undefined) {
            const regex = new RegExp(filterBy, 'i')
            filteredMembers = board.members.filter(member => regex.test(member.fullname))
        }
        return filteredMembers
    }

    return (
        <section className='modal-members-list-container'>
            <h4>Board members</h4>
            {/* <div className="modal-members-list-body">
                {filteredMembers(filterBy.txt).map((member, idx) =>
                    <div onClick={() => onSelectMember(member._id)} key={idx} className={"member-container"}>
                        <div className="modal-member-icon">
                            <UserAvatarIcon member={member} />
                        </div>
                        <div className="member-container-text-container">
                            <p>{member.fullname}</p>
                            <p>{`(${member.username})`}</p>
                        </div>
                        {getMembers(board, currTask).some(currMember => currMember._id === member._id)
                            && <button className={`clean-btn fa-solid fa-check `} ></button>}
                    </div>)}

            </div> */}
        </section>
    )
}