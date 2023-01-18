import { TaskList } from "../task/task-list"
import { AddTask } from "../task/add-task"
import { removeGroup } from "../../store/board/board.action"

export function GroupPreview({ group }) {

    return (
        <section className='group-preview'>
            <button onClick={() => removeGroup(group.id)}>X</button>
            <h2>{group.title}</h2>
            <TaskList tasks={group.tasks} />

            <AddTask />
        </section>
    )
}