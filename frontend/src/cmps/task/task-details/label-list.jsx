import { PlusIcon } from "../../../assets/svg/icon-library"
import { openDynamicModal } from "../../../store/modal/modal.action"
import { LabelPreview } from "./label-preview"

export function LabelList({ task, onSelectLabel }) {

    return (
        <section>
            <p>Labels</p>
            <section className="label-list">
                {task.labelIds.map((labelId) =>
                    <LabelPreview key={labelId} labelId={labelId} onSelectLabel={onSelectLabel} />
                )}
                <button className="btn-link"
                    onClick={(ev) =>
                        openDynamicModal({
                            ev,
                            name: 'labels',
                            func: {
                                onSelectLabel
                            }
                        })}
                ><PlusIcon /></button>
            </section>
        </section>
    )
}