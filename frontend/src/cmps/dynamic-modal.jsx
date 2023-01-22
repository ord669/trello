import { useSelector } from "react-redux";
import { CloseIcon } from "../assets/svg/icon-library";
import { BoardStarred } from "./board-starred";
import { DueDate } from "./task/task-details/task-details-due-date";

export function DynamicModal(modalWidth = 304, elType = 'button') {
    const { pos, clickedElemntSize } = useSelector(storeState => storeState.modalModule)
    console.log('pos: ', pos);
    console.log('clickedElemntSize: ', clickedElemntSize);

    function DynamicModalContent({ type }) {
        console.log('type: ', type);
        switch (type) {
            case 'label':
                return <DueDate />
            case 'members':
                return
            default:
                break;
        }
    }

    function renderPos() {

        let elemntType = elType
        const btnHeight = 32
        const btnMarginDown = 10

        switch (elemntType) {
            case 'button':
                return {
                    top: "60px",
                }
            case 'members':
                return
            default:
                break;
        }
    }

    return (
        <section style={renderPos()} className='dynamic-modal-container'>
            <div className="dynamic-modal-header">
                <div className="dynamic-modal-header-close-icon">
                    <CloseIcon />
                </div>
                <span className="dynamic-modal-header-title">headline</span>
            </div>

            <div className="dynamic-modal-content-container">
                <DynamicModalContent type={'label'} />

            </div>

        </section>
    )
}