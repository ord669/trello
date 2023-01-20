import { useRef, useState } from "react";
import { DescriptionIcon } from "../../../assets/svg/icon-library";

export function TaskDetailsDescription({ description, handleChange, onSaveTask }) {

    const [isShown, setIsShown] = useState(false)
    // const elTextArea = useRef()
    const inputReference = useRef(null);

    function onShownDesc() {
        setIsShown(prev => !prev)

    }
    function handleKeyPress(e) {
        console.log('e: ', e);
        if (e.keyCode === 13) {
            e.target.blur();
            //Write you validation logic here
        }
    }

    return (
        <div className="task-details-description">
            <h3>Description</h3>
            <div className="des-container">
                {!isShown ?
                    <p onClick={onShownDesc} className="description-fake-text-area"> {description || 'add a more detailed description…'}</p>
                    :
                    <div>
                        <textarea autoFocus type="text"
                            name="description"
                            defaultValue={description || 'add a more detailed description…'}
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyPress(e)}
                            onBlur={() => { setIsShown((prev) => !prev) }}
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