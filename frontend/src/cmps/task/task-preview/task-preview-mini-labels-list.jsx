import { TaskPreviewLabels } from "./task-preview-mini-labels"

export function MiniLabelList({ task, onSelectLabel, type }) {
    return (
        <section>
            <div className="mini-labels-list-container">
                {task.labelIds.map((labelId, idx) =>
                    <div onClick={() => { onSelectLabel(labelId) }} key={idx}>
                        <TaskPreviewLabels type={type} labelId={labelId} />
                    </div>)}
            </div>
        </section>
    )
}