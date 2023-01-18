import { PlusIcon } from "../../assets/svg/icon-library"
import { useState } from "react"
import { groupService } from "../../services/group.service.local"
import { saveGroup } from "../../store/board/board.action"

export function AddGroup() {
    const [isShown, setIsShown] = useState(false)
    const [title, setTilte] = useState('')

    function onAddList() {
        if (!title) return
        const group = groupService.getEmptyGroup()
        group.title = title
        saveGroup(group)
        setIsShown(prevIsShown => !prevIsShown)
        setTilte('')
    }

    function handleChange({ target }) {
        setTilte(target.value)
    }

    return (
        <section className='group-preview add-group'>
            {isShown ?
                <>
                    <input type="text"
                        name="title"
                        value={title}
                        onChange={handleChange} />
                    <button onClick={onAddList}>Add list</button>
                    <button onClick={() => setIsShown(prevIsShown => !prevIsShown)}>X</button>
                </>
                :
                <div onClick={() => setIsShown(prevIsShown => !prevIsShown)}>
                    <PlusIcon />
                    <h3>Add a Card</h3>
                </div>}

        </section>
    )
}