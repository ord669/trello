import { Droppable } from "react-beautiful-dnd"
import { AddTask } from "./add-task"
import { TaskPreview } from "./task-preview/task-preview"

export function TaskList({ tasks, groupId, setIsShown, isShown }) {

    return (
        <Droppable droppableId={groupId} type="TASK">
            {provided => (
                <section className='task-list'
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    {tasks.map((task, idx) => <TaskPreview key={task._id} task={task} idx={idx} />)}
                    {provided.placeholder}
                    {isShown && <AddTask setIsShown={setIsShown} />}
                </section>
            )}
        </Droppable>
    )
}