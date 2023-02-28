import { TaskPreviewLabels } from "./task-preview-mini-labels"

export function MiniLabelList({ task, onSelectLabel }) {
    return (
        <div className="mini-labels-list-container">
            {task.labelIds.map(labelId =>
                <div onClick={() => { onSelectLabel(labelId) }} key={labelId}>
                    <TaskPreviewLabels labelId={labelId} />
                </div>)}
        </div>
    )
}