export function TaskPreview({ task }) {


    function onOpenTaskDetails(taskId) {
        console.log(taskId);
    }


    return (
        <section onClick={() => onOpenTaskDetails(task.id)} className='task-preview'>
            <h4>{task.title}</h4>
            <h4>{task.style.bgColor}</h4>
            <h4>{task.style.img}</h4>
            <div className="task-icons">

            </div>
        </section>
    )
}

