import { TaskDetailsLabels } from "./task-details-labels"

export function LabelList({ task, onSelectLable }) {
    return (
        <section >
            <p>Labels</p>
            <div className="labels-list-container">
                {task.labelIds.map((labelId, idx) =>
                    <div onClick={() => { onSelectLable(labelId) }} key={idx}>
                        <TaskDetailsLabels labelId={labelId} />
                    </div>
                )
                }
            </div>

        </section>
    )
}