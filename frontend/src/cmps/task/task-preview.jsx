export function TaskPreview({ task }) {
    console.log('task: ', task);
    const review = task.review
    return (
        <section className='task-preview'>
            <h4>{task.title}</h4>
            <h4>{task.description}</h4>
            <h4>{task.dueDate}</h4>

        </section>
    )
}