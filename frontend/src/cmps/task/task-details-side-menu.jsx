import { ChecklistIcon, LabelIcon, ManIcon } from "../../assets/svg/icon-library";


export function TaskDetailsSideMenu() {
    return (
        <section className='task-details-side-menu'>
            <button className=" side-menu-item btn-link"> <ManIcon /> Members</button>
            <button className=" side-menu-item btn-link"> <LabelIcon /> Labels</button>
            <button className="side-menu-item btn-link"> <ChecklistIcon /> Checklist</button>

        </section>
    )
}