import { useEffect, useState } from "react"
import { useForm } from "../../../../customHooks/useForm"

export function EditAttachment({ filterBy, board, currTask, attachment, onEditAttach }) {
    console.log('attachment: from edit ', attachment);

    // function filteredMembers(filterBy) {
    //     let filteredMembers = [...board.members]
    //     if (filterBy !== undefined) {
    //         const regex = new RegExp(filterBy, 'i')
    //         filteredMembers = board.members.filter(member => regex.test(member.fullname))
    //     }
    //     return filteredMembers
    // }
    const [title, setTitle, handleChange] = useForm({ txt: '' })

    return (
        <section className='modal-members-list-container'>
            <div className="modal-header">
                <h4>Board members</h4>

                <input
                    type="text"
                    name="txt"
                    autoFocus
                    onChange={handleChange}
                    placeholder="Search members" />
            </div>
            <button onClick={() => onEditAttach(attachment, title)} >Update</button>
        </section>
    )
}