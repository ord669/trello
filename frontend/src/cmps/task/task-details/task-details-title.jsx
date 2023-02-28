import { handleKeyPress } from "../../../customHooks/enterOutFocues";

export function DetilsTitle({ onUpdateHeadline, task, group }) {
    return (
        <section className='detils-title'>
            <div className="task-details-title">
                <div className="task-title-container">
                    <textarea type="text"
                        name="title"
                        onChange={onUpdateHeadline}
                        onKeyDown={(ev) => handleKeyPress(ev)}
                        defaultValue={task.title} />
                    <p>in list <span>{group.title}</span></p>
                </div>
            </div>
        </section>
    )
}