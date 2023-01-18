import { TaskList } from "../task/task-list";
import { AddTask } from "../task/add-task";

export function GroupPreview({ group }) {

    return (
        <section className='group-preview'>
            <h2>{group.title}</h2>
            <TaskList tasks={group.tasks} />

            <AddTask />
        </section>
    )
}