export function TaskPreview({ task }) {
    return (
        <section className='task-preview'>
            <h4>{task.title}</h4>
            <h4>{task.style.bgColor}</h4>
            <h4>{task.style.img}</h4>

            <div className="task-icons">

            </div>
        </section>
    )
}