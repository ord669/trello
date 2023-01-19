import { TaskList } from "../task/task-list"
import { AddTask } from "../task/add-task"
import { removeGroup } from "../../store/board/board.action"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"

export function GroupPreview({ group }) {

    function onRemoveGroup() {
        try {
            removeGroup(group._id)
            showSuccessMsg('List removed successfully')
        } catch (err) {
            showErrorMsg('Cannot remove List')
        }
    }
    return (
        <section className='group-preview'>
            <section className="group-preview-header">
                <p>{group.title}</p>
                <button className="btn-remove-group" onClick={onRemoveGroup}>X</button>
            </section>
            {/* <h2>{group.title}</h2> */}
            <TaskList tasks={group.tasks} />

            <AddTask groupId={group._id} />
        </section>
    )
}