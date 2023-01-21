import { ArchiveImge, ChecklistIcon, LabelIcon, ManIcon } from "../../../assets/svg/icon-library";

export function TaskDetailsSideMenu({ onRemoveTask, onAddCheckList }) {
    return (
        <section className='task-details-side-menu'>
            <p>Add to card</p>
            <div className="side-menu-btn-container">
                <button className="details-btn-side-menu"> <ManIcon /> Members</button>
                <button className="details-btn-side-menu"> <LabelIcon /> Labels</button>
                <button className="details-btn-side-menu" onClick={onAddCheckList}> <ChecklistIcon /> Checklist</button>
                <button onClick={onRemoveTask} className="details-btn-side-menu"> <ArchiveImge /> Archive</button>
            </div>
        </section>
    )
}