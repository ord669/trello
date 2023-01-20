import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { TaskPreview } from "./task-preview"

export function TaskList({ tasks, groupId }) {

    return (
        // <DragDropContext>
            <Droppable droppableId={groupId} type="TASK">
                {provided => (
                    <section className='task-list'
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        {tasks.map((task, idx) => <TaskPreview key={task._id} task={task} idx={idx} />)}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        // </DragDropContext>
    )
}