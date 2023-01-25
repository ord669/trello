import { useSelector } from "react-redux"
import { CloseIcon } from "../assets/svg/icon-library"
import { utilService } from "../services/util.service"
import { closeDynamicModal, updateDynamicModalPos } from "../store/modal/modal.action"
import { BoardStarred } from "./board-starred"
import { AttachmentModal } from "./task/task-modals/attachment/attachment-modal"
import { DatesModal } from "./task/task-modals/dates/dates-modal"
import { CheckListModal } from "./task/task-modals/check-list/check-list-modal"
import { CopyModal } from "./task/task-modals/copy/copy-modal";
import { CoverModal } from "./task/task-modals/cover/cover-modal"
import { LabelsModal } from "./task/task-modals/labels/labels-modal"
import { MembersModal } from "./task/task-modals/members/members-modal"
import { EditAttachment } from "./task/task-modals/attachment/edit-attachment-modal";
import { taskService } from "../services/task.service.local"
import { toggleMemberAssigned, toggleTaskLabel } from "../store/board/board.action"

export function DynamicModal() {
    const { modalPos, modalDetails } = useSelector(storeState => storeState.modalModule)
    console.log('modalDetails: ', modalDetails);
    const { board } = useSelector(storeState => storeState.boardModule)

    const windowSize = utilService.getWindowDimensions()
    const elementStartLeft = (modalPos.left)
    const elementStartRight = (modalPos.right)
    const elementStartTop = (modalPos.top)
    const elementStartBottom = (modalPos.bottom)
    const clickedElemntWidth = modalPos.width
    const clickedElemntHeight = modalPos.height

    function DynamicModalContent({ type, func, data, currTask }) {

        switch (type) {
            case 'labels':
                return <LabelsModal board={board} currTask={currTask} toggleTaskLabel={toggleTaskLabel} />
            case 'members':
                return <MembersModal board={board} currTask={currTask} getMembers={taskService.getMembers} toggleMemberAssigned={toggleMemberAssigned} />
            case 'add checklist':
                return <CheckListModal board={board} currTask={currTask} addCheckList={func.addCheckList} />
            case 'cover':
                return <CoverModal board={board} currTask={currTask} />
            case 'attachment':
                return <AttachmentModal board={board} currTask={currTask} />
            case 'dates':
                return <DatesModal board={board} currTask={currTask} />
            case 'copy card':
                return <CopyModal board={board} currTask={currTask} />
            case 'edit attachment':
                return <EditAttachment board={board} currTask={currTask} attachment={data.attachment} onEditAttach={func.onEditAttach} />
            default:
                break
        }
    }

    function renderPos() {
        console.log('in pos:')
        const bottomMargin = 5
        const modalWidth = 304
        let modalHeight = 220
        let posToRender = 'downRight'

        switch (modalDetails.name) {
            case 'copy card':
            case 'cover':
                modalHeight = 370
                break;
            case 'dates':
            case 'labels':
                modalHeight = 480
                break;
            default:
                break;
        }
        console.log('modalDetails.name: ', modalDetails.name);
        console.log('modalHeight: ', modalHeight);

        if (modalPos.x + modalWidth > windowSize.width) posToRender = "downLeft"
        if (elementStartBottom + modalHeight > windowSize.height) posToRender = "upRight"
        if (elementStartBottom + modalHeight > windowSize.height &&
            modalPos.x + modalWidth > windowSize.width) posToRender = "upLeft"

        switch (posToRender) {
            case 'downRight':
                return {
                    top: `${elementStartBottom + bottomMargin}px`,
                    left: `${elementStartLeft}px`,
                }
            case 'downLeft':
                console.log('downLeft: ');
                return {
                    top: `${elementStartBottom + bottomMargin}px`,
                    left: `${elementStartLeft - modalWidth}px`
                }
            case 'upRight':
                return {
                    top: `${elementStartBottom - clickedElemntHeight}px`,
                    left: `${elementStartLeft}px`,
                    transform: "translateY(-50%)",

                }
            case 'upLeft':
                return {
                    top: `${elementStartBottom + bottomMargin}px`,
                    left: `${elementStartLeft - modalWidth}px`,
                    transform: "translateY(-50%)",
                }
            default:
                break
        }
    }

    return (
        <section style={renderPos()} className='dynamic-modal-container'>
            <div className="dynamic-modal-header">
                <div onClick={() => closeDynamicModal()} className="dynamic-modal-header-close-icon">
                    <CloseIcon />
                </div>
                <span className="dynamic-modal-header-title">{modalDetails.name}</span>
            </div>

            <div className="dynamic-modal-content-container">
                <DynamicModalContent type={modalDetails.name} func={modalDetails.func} data={modalDetails.data} currTask={modalDetails.task} />

            </div>

        </section>
    )
}