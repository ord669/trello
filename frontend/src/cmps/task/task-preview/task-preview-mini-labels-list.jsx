import { TaskPreviewLabels } from "./task-preview-mini-labels"

export function MiniLabelList({ task, onSelectLable }) {
    return (
        <section >
            {/* <p>Labels</p> */}
            <div className="mini-labels-list-container">
                {task.labelIds.map((labelId, idx) =>
                    <div onClick={() => { onSelectLable(labelId) }} key={idx}>
                        <TaskPreviewLabels labelId={labelId} />
                    </div>
                )
                }
            </div>

        </section>
    )
}