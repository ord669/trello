import { TaskDetailsLabels } from "./task-details-labels"

export function LabelList({ task, onSelectLable }) {
    return (
        <section className='labels-list-container'>
            <p>Labels</p>
            <ul className="flex clean-list ">
                {task.labelIds.map((labelId, idx) =>
                    <li onClick={() => { onSelectLable(labelId) }} key={idx}>
                        <TaskDetailsLabels labelId={labelId} />
                    </li>
                )
                }
            </ul>

        </section>
    )
}