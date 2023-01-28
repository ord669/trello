import { TaskPreviewLabels } from "./task-preview-mini-labels"

export function MiniLabelList({ task, onSelectLabel, type }) {
    return (
            <div className="mini-labels-list-container">
                {task.labelIds.map((labelId, idx) =>
                    <div onClick={() => { onSelectLabel(labelId) }} key={labelId}>
                        <TaskPreviewLabels type={type} labelId={labelId} />
                    </div>)}
            </div>
    )
}