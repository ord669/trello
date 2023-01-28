import { TaskPreviewLabels } from "./task-preview-mini-labels"

export function MiniLabelList({ task, onSelectLabel }) {
    return (
            <div className="mini-labels-list-container">
                {task.labelIds.map((labelId, idx) =>
                    <div onClick={() => { onSelectLabel(labelId) }} key={idx}>
                        <TaskPreviewLabels labelId={labelId} />
                    </div>)}
            </div>
    )
}