import { TaskDetailsLabels } from "../../task-details/task-details-labels"
import { useEffect, useState } from "react"

export function LabelsModalList({ filterBy, board, currTask, onSelectLable }) {

    // function filteredMembers(filterBy) {
    //     let filteredMembers = [...board.members]
    //     if (filterBy !== undefined) {
    //         const regex = new RegExp(filterBy, 'i')
    //         filteredMembers = board.members.filter(member => regex.test(member.fullname))
    //     }
    //     return filteredMembers
    // }

    return (
        <section className='modal-labels-list-container'>
            <h4>Labels</h4>
            <div className="labels-modal-list-body">
                {board.labels.map((label, idx) =>
                    <div
                        className="label-container"
                        onClick={() => { onSelectLable(label._id) }}
                        key={label._id}>
                        <input type="checkbox" />
                        <div>{label.title}</div>
                        {/* <button> <PenIcon /></button> */}

                    </div>)}

            </div>
        </section>
    )
}
