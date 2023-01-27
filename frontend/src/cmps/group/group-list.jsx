import { useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { socketService, SOCKET_EMIT_DRAG_END, SOCKET_EVENT_DRAG_END, SOCKET_EVENT_SAVE_TASK } from "../../services/socket.service"
import { updateDrag, updateSocketDrag } from "../../store/board/board.action"
import { saveSocketTask } from "../../store/task/task.action"
import { AddGroup } from "./add-group"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups, board }) {

    useEffect(() => {
        socketService.on(SOCKET_EVENT_DRAG_END, updateSocketDrag)
        socketService.on(SOCKET_EVENT_SAVE_TASK, saveSocketTask)
        return () => {
            socketService.off(SOCKET_EVENT_DRAG_END, updateSocketDrag)
            socketService.off(SOCKET_EVENT_SAVE_TASK, saveSocketTask)
        }
    }, [])

    function onDragEnd(result) {
        const { source, destination } = result
        if (!result.destination ||
            destination.droppableId === source.droppableId &&
            destination.index === source.index) return
        socketService.emit(SOCKET_EMIT_DRAG_END, result)
        updateDrag(result)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={board._id || 'board'} direction="horizontal" type="GROUP">
                {provided => (
                    <section className='group-list'
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        {groups.map((group, idx) => <GroupPreview key={group._id} group={group} idx={idx} />)}
                        {provided.placeholder}
                        <AddGroup />
                    </section >
                )}
            </Droppable>
        </DragDropContext>
    )
}