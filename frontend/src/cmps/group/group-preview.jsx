import { TaskList } from "../task/task-list";

export function GroupPreview({ group }) {
    console.log('group preview: ', group.tasks);
    return (
        <section className='group-preview'>
            <TaskList tasks={group.tasks} />
        </section>
    )
}