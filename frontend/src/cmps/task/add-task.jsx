import { useState } from "react"
import { PlusIcon } from "../../assets/svg/icon-library"
import { groupService } from "../../services/group.service.local"

export function AddTask({groupId}) {
    const [isShown, setIsShown] = useState(false)
    const [title, setTilte] = useState('')

    function onAddTask() {
        if (!title) return
        const task = groupService.getEmptyTask()
        task.title = title
        // saveTask(groupId,task)
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