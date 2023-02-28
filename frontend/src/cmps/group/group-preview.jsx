import { TaskList } from "../task/task-list"
import { removeGroup, saveActivity } from "../../store/board/board.action"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { GroupHeader } from "./group-header"
import { Draggable } from "react-beautiful-dnd"
import { PlusIcon } from "../../assets/svg/icon-library"
import { useState } from "react"
import { useSelector } from "react-redux"


export function GroupPreview({ group, idx }) {
    const [isShown, setIsShown] = useState(false)
    const { board } = useSelector(storeState => storeState.boardModule)

    function onRemoveGroup() {
        try {
            saveActivity({ board, type: 'group', diff: 'archived', txt: group.title })
            removeGroup(group._id)
            showSuccessMsg('List removed successfully')
        } catch (err) {
            showErrorMsg('Cannot remove List')
        }
    }

    return (
        <Draggable draggableId={group._id} index={idx}>
            {(provided, snapshot) => (
                <section className={`group-preview ${snapshot.isDragging ? 'dragged' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div {...provided.dragHandleProps}>
                        <GroupHeader onRemoveGroup={onRemoveGroup} group={group} />
                    </div>
                    <TaskList tasks={group.tasks} groupId={group._id} isShown={isShown} setIsShown={setIsShown} />
                    {!isShown && <section className="open-form" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>
                        <PlusIcon />
                        <span>Add a card</span>
                    </section>}
                </section>
            )}
        </Draggable>
    )
}