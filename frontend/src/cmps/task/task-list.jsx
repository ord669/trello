import { TaskPreview } from "./task-preview"

export function TaskList({ tasks }) {

    return (
        <section className='task-list'>
            {tasks.map(task => <TaskPreview key={task._id} task={task} />)}
        </section>
    )
}