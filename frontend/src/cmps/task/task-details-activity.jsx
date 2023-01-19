import { ActivityIcon } from "../../assets/svg/icon-library";

export function TaskDetailsActivity() {
    return (
        <section className='task-details-activity flex align-center gap-10'>
            <ActivityIcon className='icon-title' />
            <h1>Activity</h1>
        </section >
    )
}