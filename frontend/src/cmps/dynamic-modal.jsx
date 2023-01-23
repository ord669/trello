import { useSelector } from "react-redux";
import { CloseIcon } from "../assets/svg/icon-library";
import { utilService } from "../services/util.service";
import { closeDynamicModal, updateDynamicModalPos } from "../store/modal/modal.action";
import { BoardStarred } from "./board-starred";
import { DueDate } from "./task/task-details/task-details-due-date";
import { MembersModal } from "./task/task-modals/members/members-modal";

export function DynamicModal() {
    const { modalPos, modalDetails } = useSelector(storeState => storeState.modalModule)
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
                return
            case 'members':
                return <MembersModal board={board} currTask={currTask} getMembers={func.getMembers} onSelectMember={func.onSelectMember} />
            default:
                break;
        }
    }

    function renderPos() {
        const bottomMargin = 5
        const modalWidth = 304
        const modalHeight = 100
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
                    transform: "translateY(-100%)",

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
                <div onClick={() => { closeDynamicModal() }} className="dynamic-modal-header-close-icon">
                    <CloseIcon />
                </div>
                <span className="dynamic-modal-header-title">headline</span>
            </div>

            <div className="dynamic-modal-content-container">
                <DynamicModalContent type={modalDetails.name} func={modalDetails.func} />

            </div>

        </section>
    )
}