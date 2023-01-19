import { PlusIcon } from "../../assets/svg/icon-library"
import { useState } from "react"
import { saveGroup } from "../../store/board/board.action"
import { groupService } from "../../services/group.service.local"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"

export function AddGroup() {
    const [isShown, setIsShown] = useState(false)
    const [title, setTilte] = useState('')

    async function onAddList(ev) {
        ev.preventDefault()
        if (!title) return
        try {
            const group = groupService.getEmptyGroup(title)
            await saveGroup(group)
            setIsShown(prevIsShown => !prevIsShown)
            setTilte('')
            showSuccessMsg(`List added successfully `)
        } catch (err) {
            showErrorMsg('Cannot Add list')
        }
    }

    function handleChange({ target }) {
        setTilte(target.value)
    }

    return (
        <section className='add-group'>
            {isShown ?
                <form>
                    <input type="text"
                        name="title"
                        placeholder="Enter list title..."
                        value={title}
                        onChange={handleChange}
                        autoFocus />
                    <section className="form-btns">
                        <button className="btn btn-add-group" onClick={onAddList}>Add list</button>
                        <button className="btn btn-close-form" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>X</button>
                    </section>
                </form>
                :
                <section className="open-form" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>
                    <PlusIcon />Add another list
                    {/* <h3>Add a Card</h3> */}
                </section>}

        </section>
    )
}