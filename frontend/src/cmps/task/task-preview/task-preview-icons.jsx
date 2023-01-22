import { AttacheIcon, CheckListIcon, ClockIcon, EyeIcon } from "../../../assets/svg/icon-library";

export function TaskPreviewIcons() {
    return (
        <section className='task-preview-icons flex'>
            <AttacheIcon />
            <ClockIcon />
            <CheckListIcon />
            <EyeIcon />
        </section>
    )
}