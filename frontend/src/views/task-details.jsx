import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChecklistIcon, CloseIcon, DescriptionIcon, LabelIcon, ManIcon } from "../assets/svg/icon-library";

export function TaskDetails() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const { taskId, groupId } = useParams()
    const [labels, setLabels] = useState([])

    console.log('board: ', board);
    console.log('groupId: ', groupId);
    console.log('taskId: ', taskId);

    return (
        <section className='task-details'>
            <div className="black-screen"></div>
            <div className="main-task-details">
                <button className=" btn details-close-btn"><CloseIcon /></button>
                <div className="task-details-cover">cover</div>
                <div className="task-details-title">title</div>
                <div className="task-details-content">
                    <div className="task-details-labels">
                        <h1>labels</h1>
                    </div>
                    <div className="task-details-description">
                        <div className="flex">
                            <DescriptionIcon />
                            <h1>Description</h1>
                        </div>
                        <input type="text" />
                    </div>
                    <div className="task-details-checklist">
                        <h1>CheckList</h1>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>

                    <div className="task-details-activity">
                        <h1>Activity</h1>
                    </div>

                </div>
                <div className="task-details-side-menu">
                    <h1>add to card</h1>
                    <button className="members side-menu-item btn-link"><ManIcon /> Members</button>
                    <button className="Labels side-menu-item btn-link"><LabelIcon /> Labels</button>
                    <button className="checklist side-menu-item btn-link"><ChecklistIcon /> Checklist</button>
                </div>
            </div>
        </section>
    )
}


