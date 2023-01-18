import { PenIcon } from "../../assets/svg/icon-library";

export function TaskPreview({ task }) {


    function onOpenTaskDetails(taskId) {
        console.log(taskId);
    }


    return (
        <section className='task-preview'>
            <p>{task.title}</p>

            <div className="task-icons">

            </div>
            <div className="task-preview-edit display-none">
                <PenIcon />
            </div>
        </section>
    )
}

