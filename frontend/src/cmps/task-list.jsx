import { TaskPreview } from "./task-preview"

export function TaskList() {
    const tasks = [1, 2, 3]
    return (
        <section className='task-list'>
{tasks.map(task=><TaskPreview />)}
        </section>
    )
}