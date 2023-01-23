import { PenIcon } from "../../../../assets/svg/icon-library"
import { LabelPreview } from "../labels/label-modal-preview"

export function LabelsModalList({ filterBy, board, currTask, onSelectLable }) {

    function filteredLabels(filterBy) {
        let filteredLabels = [...board.labels]
        if (filterBy !== undefined) {
            const regex = new RegExp(filterBy, 'i')
            filteredLabels = board.labels.filter(member => regex.test(member.title))
        }
        return filteredLabels
    }
    function checkForLabelIncluded(labelId) {
        if (currTask.labelIds.includes(labelId)) return true
        else return false
    }
    return (
        <section className='modal-labels-list-container'>
            <h4>Labels</h4>
            <div className="labels-modal-list-body">
                {filteredLabels(filterBy.txt).map((label, idx) =>

                    <div
                        className="label-container"
                        onClick={() => { onSelectLable(label._id) }}
                        key={label._id}>
                        <input type="checkbox" onChange={() => { }} checked={checkForLabelIncluded(label._id)} />
                        <LabelPreview label={label} />

                        <button> <PenIcon /></button>

                    </div>)}
                {/* <button className="create-btn btn-link">Create a new label</button> */}

            </div>
        </section>
    )
}
