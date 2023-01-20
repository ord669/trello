import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { groupService } from "../../services/group.service.local"
import { updateDrag } from "../../store/board/board.action"
import { AddGroup } from "./add-group"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups, board }) {

    function onDragEnd(result) {
        console.log('result:', result)
        if (!result.destination) return
        const { source, destination } = result
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return
        updateDrag(result)
        //TODO: reorder columns
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