import { TaskDetailsLabels } from "./task-details-labels"

export function LabelList({ task, onSelectLable }) {

    return (
        <section>
            <p>Labels</p>
            <div className="labels-list-container">
                {task.labelIds.map((labelId) =>
                    <div onClick={() => { onSelectLable(labelId) }} key={labelId}>
                        <TaskDetailsLabels labelId={labelId} />
                    </div>)}
            </div>
        </section>
    )
}