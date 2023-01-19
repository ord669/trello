import { useState } from "react"
// import { useSelector } from "react-redux"
import { PlusIcon } from "../../assets/svg/icon-library"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { removeTask, saveTask } from "../../store/board/board.action"

export function AddTask({ groupId }) {
    const [isShown, setIsShown] = useState(false)
    const [title, setTilte] = useState('')

    function onAddTask() {
        if (!title) return
        try {
            saveTask(groupId, title)
            setIsShown(prevIsShown => !prevIsShown)
            setTilte('')
            showSuccessMsg('Task Added successfully')
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    function handleChange({ target }) {
        setTilte(target.value)
    }

    return (
        <section className='add-task'>
            {isShown ?
                <>
                    <textarea
                        name="title"
                        placeholder="Enter a title for this card..."
                        value={title}
                        onChange={handleChange} />
                    <button className="btn-add-task" onClick={onAddTask}>Add card</button>
                    <button className="btn-close-form" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>X</button>
                </>
                :
                <section className="open-form" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>
                    {/* <PlusIcon /> Add a card */}
                    <PlusIcon />
                    <span>Add a card</span>
                </section>}
        </section>
    )
}