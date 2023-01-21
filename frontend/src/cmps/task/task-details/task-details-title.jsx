import { handleKeyPress } from "../../../customHooks/enterOutFocues";

export function DetilsTitle({ onUpdateHeadline, task, group }) {
    return (
        <section className='detils-title'>
            <div className="task-details-title">
                <div className="task-title-container ">
                    <textarea type="text"
                        name="title"
                        onChange={onUpdateHeadline}
                        onKeyDown={(e) => handleKeyPress(e)}
                        defaultValue={task.title} />
                    <p>in list {group.title}</p>
                </div>
            </div>
        </section>
    )
}