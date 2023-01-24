import { useState } from "react"
import { taskService } from "../../../../services/task.service.local"
import { saveTask } from "../../../../store/board/board.action"
import { closeDynamicModal } from "../../../../store/modal/modal.action"

export function CheckListModal({ board, currTask, getMembers, onSelectMember }) {
    const [checklist, setChecklist] = useState(taskService.getEmptyChecklist)

    function handleChange({ target }) {
        const { value, name: feild } = target
        setChecklist(prevChecklist => ({ ...prevChecklist, [feild]: value }))
    }

    function onAddChecklist() {
        console.log(checklist)
        closeDynamicModal()
        const checklists = [checklist, ...currTask.checklists]
        const task = { ...currTask, checklists }
        // saveTask(task)
        // setTask(task)
    }

    return (
        <section className='members-modal-container'>
            {/* <section> */}
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
        // </section>
    )
}