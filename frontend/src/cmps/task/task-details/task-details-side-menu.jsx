import { ArchiveImge, ChecklistIcon, LabelIcon, ManIcon } from "../../../assets/svg/icon-library"
import { closeDynamicModal, openDynamicModal } from "../../../store/modal/modal.action"

export function TaskDetailsSideMenu({ onRemoveTask, onAddCheckList, getMembers, onSelectMember, onSelectLabel }) {

    return (
        <section className='task-details-side-menu'>
            <p>Add to card</p>
            <section className="side-menu-btn-container">
                <button onClick={(ev) => openDynamicModal({ ev, name: 'members', func: { getMembers, onSelectMember } })}
                    className="details-btn-side-menu"> <ManIcon /> Members</button>
                <button onClick={(ev) => openDynamicModal({ ev, name: 'labels', func: { onSelectLabel } })}
                    className="details-btn-side-menu"> <LabelIcon /> Labels</button>
                <button onClick={(ev) => openDynamicModal({ ev, name: 'add checklist', func: { getMembers, onSelectMember } })}
                    className="details-btn-side-menu" > <ChecklistIcon /> Checklist</button>
                <button onClick={onRemoveTask} className="details-btn-side-menu"> <ArchiveImge /> Archive</button>
            </section>
        </section>
    )
}