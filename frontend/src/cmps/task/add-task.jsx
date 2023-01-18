import { useState } from "react"
import { useSelector } from "react-redux"
import { PlusIcon } from "../../assets/svg/icon-library"
import { groupService } from "../../services/group.service.local"
import { removeTask, saveTask } from "../../store/board/board.action"

export function AddTask({ groupId }) {
    const [isShown, setIsShown] = useState(false)
    const [title, setTilte] = useState('')
    // const boa        useSelector()

    function onAddTask() {
        if (!title) return
        saveTask(groupId, title)
        setIsShown(prevIsShown => !prevIsShown)
        setTilte('')
    }

    function handleChange({ target }) {
        setTilte(target.value)
    }


    return (
        <section className='add-task'>
            {isShown ?
                <>
                    <input type="text"
                        name="title"
                        value={title}
                        onChange={handleChange} />
                    <button onClick={onAddTask}>Add a card</button>
                    <button onClick={() => setIsShown(prevIsShown => !prevIsShown)}>X</button>
                </>
                :
                <div onClick={() => setIsShown(prevIsShown => !prevIsShown)}>
                    <PlusIcon /> Add a Card
                    {/* <p>Add a Card</p> */}
                </div>}
        </section>
    )
}