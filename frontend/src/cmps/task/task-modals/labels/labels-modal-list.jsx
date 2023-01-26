import { useState } from "react"
import { PenIcon } from "../../../../assets/svg/icon-library"
import { LabelPreview } from "../labels/label-modal-preview"

export function LabelsModalList({ filterBy, board, currTask, toggleTaskLabel }) {
    function filteredLabels(filterBy) {
        let filteredLabels = [...board.labels]
        if (filterBy !== undefined) {
            const regex = new RegExp(filterBy, 'i')
            filteredLabels = board.labels.filter(member => regex.test(member.title))
        }
        return filteredLabels
    }
    function checkForLabelIncluded(labelId) {
        console.log('labelId: ', labelId);
        console.log('currTask: ', currTask.labelIds);
        if (currTask.labelIds.includes(labelId)) return true
        return false
    }
    return (
        <section className='modal-labels-list-container'>
            <h4>Labels</h4>
            <div className="labels-modal-list-body">
                {filteredLabels(filterBy.txt).map((label, idx) =>
                    <LabelPreview label={label} checkForLabelIncluded={checkForLabelIncluded} currTask={currTask} />

                )}
                {/* <button className="create-btn btn-link">Create a new label</button> */}

            </div>
        </section>
    )
}
