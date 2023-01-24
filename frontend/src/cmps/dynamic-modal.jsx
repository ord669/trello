import { useSelector } from "react-redux";
import { CloseIcon } from "../assets/svg/icon-library";
import { utilService } from "../services/util.service";
import { closeDynamicModal, updateDynamicModalPos } from "../store/modal/modal.action";
import { BoardStarred } from "./board-starred";
import { AttachmentModal } from "./task/task-modals/attachment/attachment-modal";
import { CheckListModal } from "./task/task-modals/check-list/check-list-modal";
import { CoverModal } from "./task/task-modals/cover/cover-modal";
import { LabelsModal } from "./task/task-modals/labels/labels-modal";
import { MembersModal } from "./task/task-modals/members/members-modal";

export function DynamicModal() {
    const { modalPos, modalDetails } = useSelector(storeState => storeState.modalModule)
    console.log('modalDetails: ', modalDetails);
    console.log('modalPos: ', modalPos);
    const { currTask } = useSelector(storeState => storeState.taskModule)
    const { board } = useSelector(storeState => storeState.boardModule)

    const windowSize = utilService.getWindowDimensions()
    const elementStartLeft = (modalPos.left)
    const elementStartRight = (modalPos.right)
    const elementStartTop = (modalPos.top)
    const elementStartBottom = (modalPos.bottom)
    const clickedElemntWidth = modalPos.width
    const clickedElemntHeight = modalPos.height

    function DynamicModalContent({ type, func }) {
        switch (type) {
            case 'labels':
                return <LabelsModal board={board} currTask={currTask} onSelectLabel={func.onSelectLabel} />
            case 'members':
                return <MembersModal board={board} currTask={currTask} getMembers={func.getMembers} onSelectMember={func.onSelectMember} />
            case 'add checklist':
                return <CheckListModal board={board} currTask={currTask} getMembers={func.getMembers} onSelectMember={func.onSelectMember} />
            case 'cover':
                return <CoverModal board={board} currTask={currTask} onCoverChangeBg={func.onCoverChangeBg} />
            case 'attachment':
                return <AttachmentModal board={board} currTask={currTask} />
            default:
                break;
        }
    }

    function renderPos() {
        const bottomMargin = 5
        const modalWidth = 304
        const modalHeight = 400
        let posToRender = 'downRight'

        if (elementStartLeft + modalWidth > windowSize.width) posToRender = "downLeft"
        if (elementStartBottom + modalHeight > windowSize.height) posToRender = "upRight"
        switch (posToRender) {
            case 'downRight':
                return {
                    top: `${elementStartBottom + bottomMargin}px`,
                    left: `${elementStartLeft}px`,
                }
            case 'downLeft':
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
                    transform: "translateY(-100%)",
                }
            default:
                break;
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
                <DynamicModalContent type={modalDetails.name} func={modalDetails.func} />

            </div>

        </section>
    )
}