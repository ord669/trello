import { ArchiveImge, AttachmentIcon, ChecklistIcon, ClockIcon, LabelIcon, ManIcon, CopyIcon } from "../../../assets/svg/icon-library"
import { closeDynamicModal, openDynamicModal } from "../../../store/modal/modal.action"

export function TaskDetailsSideMenu({ onRemoveTask, addCheckList, task }) {

    return (
        <section className='task-details-side-menu'>
            <p>Add to card</p>
            <section className="side-menu-btn-container">
                {/* ----------------members---------------- */}
                <button onClick={(ev) => openDynamicModal({ ev, name: 'members', task })}
                    className="details-btn-side-menu"> <ManIcon /> Members</button>

                {/* ----------------labels---------------- */}
                <button onClick={(ev) => openDynamicModal({ ev, name: 'labels', task })}
                    className="details-btn-side-menu"> <LabelIcon /> Labels</button>

                {/* ----------------Checklist---------------- */}
                <button onClick={(ev) => openDynamicModal({ ev, name: 'add checklist', func: { addCheckList }, task })}
                    className="details-btn-side-menu" > <ChecklistIcon /> Checklist</button>

                {/* ----------------dates---------------- */}
                <button onClick={(ev) => openDynamicModal({ ev, name: 'dates', func: {}, task })} className="details-btn-side-menu"> <ClockIcon /> Dates</button>

                {/* ----------------attachment---------------- */}
                <button onClick={(ev) => openDynamicModal({ ev, name: 'attachment', task })} className="attachment-icon details-btn-side-menu"> <AttachmentIcon /> Attachment</button>

                {/* ----------------copy---------------- */}

                <button onClick={(ev) => openDynamicModal({ ev, name: 'copy card', task })} className="attachment-icon details-btn-side-menu"> <CopyIcon /> Copy</button>

                {/* ------------------------------------------ */}
                <button onClick={onRemoveTask} className="details-btn-side-menu"> <ArchiveImge /> Archive</button>
            </section>
        </section>
    )
}