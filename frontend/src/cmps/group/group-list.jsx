import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { groupService } from "../../services/group.service.local"
import { saveBoard } from "../../store/board/board.action"
import { AddGroup } from "./add-group"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups, board }) {

    function onDragEnd(result) {
        console.log('result:', result)
        if (!result.destination) return
        const { source, destination } = result
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return
        // if (result.destination.index === result.source.index) return
        const groupsToSave = groupService.reorderGroups(source, destination, groups)
        const boardToSave = { ...board, groups: groupsToSave }
        saveBoard(boardToSave)
        //TODO: reorder columns
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className='group-list'>
                {groups.map(group => <GroupPreview key={group._id} group={group} />)}
                <AddGroup />
            </section >
        </DragDropContext>
    )
}