import { useState } from "react"
import { taskService } from "../../../../services/task.service.local"
import { closeDynamicModal } from "../../../../store/modal/modal.action"

export function CheckListModal({ board, currTask, addCheckList }) {
    const [checklist, setChecklist] = useState(taskService.getEmptyChecklist)

    function handleChange({ target }) {
        const { value, name: feild } = target
        setChecklist(prevChecklist => ({ ...prevChecklist, [feild]: value }))
    }

    function onAddChecklist() {
        closeDynamicModal()
        addCheckList(checklist)
    }

    return (
        <section className='checklist-modal-container'>
            <h4>Title</h4>
            <section className="modal-header">
                <input
                    type="text"
                    onChange={handleChange}
                    name="title"
                    autoFocus
                    onFocus={(ev) => ev.target.select()}
                    value={checklist.title} />
                <button className="btn-add" onClick={onAddChecklist}>Add</button>
            </section>
        </section>
    )
}