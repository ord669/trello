import { DescriptionIcon } from "../../assets/svg/icon-library";

export function TaskDetailsDescription({ description }) {
    return (
        <div className="task-details-description ">
            <div className="flex align-center gap-10">
                <DescriptionIcon className='icon-title' />
                <h1>Description</h1>
            </div>
            <textarea type="text" defaultValue={description} />
        </div>
    )
}