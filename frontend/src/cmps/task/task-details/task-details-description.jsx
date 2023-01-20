import { useRef, useState } from "react";
import { DescriptionIcon } from "../../../assets/svg/icon-library";

export function TaskDetailsDescription({ description, handleChange, onSaveTask }) {

    const [isShown, setIsShown] = useState(false)
    // const elTextArea = useRef()
    const inputReference = useRef(null);

    function onShownDesc() {
        setIsShown(prev => !prev)

    }
    return (
        <div className="task-details-description ">
            <h3>Description</h3>
            <div className="flex align-center gap-10">

            </div>
            <div>
                {!isShown ?
                    <p onClick={onShownDesc} className="description-fake-text-area"> {description || 'add a more detailed description…'}</p>
                    :
                    <div>
                        <textarea autoFocus type="text"
                            name="description"
                            defaultValue={description || 'add a more detailed description…'}
                            onChange={handleChange}
                        />
                        <div className="desc-btn flex align-cetner ">
                            <button onClick={() => {
                                onSaveTask()
                                setIsShown((prev) => !prev)
                            }} className="btn-add">Save</button>
                            <button onClick={() => setIsShown((prev) => !prev)}
                                className="btn-cancel">Cancel</button>
                        </div>

                    </div>
                }

            </div>

        </div >
    )
}