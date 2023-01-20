import { TaskList } from "../task/task-list"
import { AddTask } from "../task/add-task"
import { removeGroup } from "../../store/board/board.action"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { GroupHeader } from "./group-header"
import { DragDropContext, Draggable } from "react-beautiful-dnd"

export function GroupPreview({ group, idx }) {

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
            <GroupHeader onRemoveGroup={onRemoveGroup} group={group} />
            <TaskList tasks={group.tasks} groupId={group._id} />
            <AddTask groupId={group._id} />
        </section>
    )
}