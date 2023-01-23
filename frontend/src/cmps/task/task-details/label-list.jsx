import { PlusIcon } from "../../../assets/svg/icon-library"
import { LabelPreview } from "./label-preview"

export function LabelList({ task, onSelectLabel }) {

    return (
        <section>
            <p>Labels</p>
            <section className="label-list">
                {task.labelIds.map((labelId) =>
                        <LabelPreview key={labelId} labelId={labelId} onSelectLabel={onSelectLabel}/>
                        )}
                <button className="btn-link"><PlusIcon /></button>
            </section>
        </section>
    )
}