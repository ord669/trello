export function DetilsTitle({ onUpdateHeadline, task, group }) {
    return (
        <section className='detils-title'>
            <div className="task-details-title flex align-center gap-10">
                <div className="task-title-container ">
                    <textarea type="text"
                        name="title"
                        onChange={onUpdateHeadline}
                        defaultValue={task.title} />
                    <p>in list {group.title}</p>
                </div>
            </div>
        </section>
    )
}