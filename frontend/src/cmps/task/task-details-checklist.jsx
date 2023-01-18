import { ChecklistIcon } from "../../assets/svg/icon-library";


export function TaskDetailsChecklist() {
    return (
        <section className='task-details-checklist'>
            <div className="flex align-center">
                <ChecklistIcon />
                <h1>CheckList</h1>
            </div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </section>
    )
}