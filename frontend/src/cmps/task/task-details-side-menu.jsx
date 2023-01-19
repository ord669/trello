import { ChecklistIcon, LabelIcon, ManIcon } from "../../assets/svg/icon-library";


export function TaskDetailsSideMenu({ onRemoveTask }) {
    return (
        <section className='task-details-side-menu'>
            <button className=" side-menu-item btn-link"> <ManIcon /> Members</button>
            <button className=" side-menu-item btn-link"> <LabelIcon /> Labels</button>
            <button className="side-menu-item btn-link"> <ChecklistIcon /> Checklist</button>
            <button onClick={onRemoveTask} className="side-menu-item btn-link"> remove task</button>

        </section>
    )
}