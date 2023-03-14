import { useState } from "react"
import { saveTask } from "../../../store/task/task.action"

export function TaskDetailsDescription({ task, handleChange }) {
    const [isShown, setIsShown] = useState(false)

    function onShownDesc() {
        setIsShown(prev => !prev)
    }
    function handleKeyPress(ev) {
        if (ev.keyCode === 13) {
            ev.target.blur()
            saveTask(task)
        }
    }

    return (
        <div className="task-details-description">
            <h3>Description</h3>
            <div className="des-container">
                {!isShown ?
                    <p onClick={onShownDesc} className={`${task.description.length > 0 ? 'description-fake-text-area-after-filled' : 'description-fake-text-area'}`}> {task.description || 'add a more detailed description…'}</p>
                    :
                    <div>
                        <textarea autoFocus type="text"
                            name="description"
                            defaultValue={task.description.length > 0 ? task.description : ''}
                            placeholder={task.description || 'add a more detailed description…'}
                            onChange={handleChange}
                            onKeyDown={(ev) => handleKeyPress(ev)}
                            onBlur={() => {
                                saveTask(task)
                                setIsShown((prev) => !prev)
                            }}
                        />
                        <div className="desc-btn flex align-center">
                            <button onClick={() => {
                                try {
                                    saveTask(task)
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