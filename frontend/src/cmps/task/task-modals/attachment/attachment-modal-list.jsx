import { useEffect, useState } from "react"

export function AttachmentList({ filterBy, board, currTask, getMembers, onSelectMember }) {

    // function filteredMembers(filterBy) {
    //     let filteredMembers = [...board.members]
    //     if (filterBy !== undefined) {
    //         const regex = new RegExp(filterBy, 'i')
    //         filteredMembers = board.members.filter(member => regex.test(member.fullname))
    //     }
    //     return filteredMembers
    // }

    return (
        <section className='modal-members-list-container'>
            <h4>Attachment</h4>
            <div className="modal-members-list-body">

            </div>
        </section>
    )
}