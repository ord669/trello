import { useState } from "react"
import { saveTask } from "../../../store/board/board.action"

export function TaskDetailsDescription({ description, handleChange }) {
    const [isShown, setIsShown] = useState(false)

    function onShownDesc() {
        setIsShown(prev => !prev)

    }
    function handleKeyPress(ev) {
        console.log('ev: ', ev)
        if (ev.keyCode === 13) {
            ev.target.blur()
            //Write you validation logic here
        }
    }

    return (
        <div className="task-details-description">
            <h3>Description</h3>
            <div className="des-container">
                {!isShown ?
                    <p onClick={onShownDesc} className={`${description.length > 0 ? 'description-fake-text-area-after-filled' : 'description-fake-text-area'}`}> {description || 'add a more detailed description…'}</p>
                    :
                    <div>
                        <textarea autoFocus type="text"
                            name="description"
                            defaultValue={description.length > 0 ? description : ''}
                            placeholder={description || 'add a more detailed description…'}
                            onChange={handleChange}
                            onKeyDown={(ev) => handleKeyPress(ev)}
                            onBlur={() => setIsShown((prev) => !prev)}
                        />
                        <div className="desc-btn flex align-cetner ">
                            <button onClick={() => {
                                try {
                                    saveTask()
                                } catch (err) {
                                    console.log('err from desc btn', err)
                                }
                                setIsShown((prev) => !prev)
                            }} className="btn-add">Save</button>
                            <button onClick={() => setIsShown(prev => !prev)}
                                className="btn-cancel">Cancel</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}