import { PlusIcon } from "../../assets/svg/icon-library"
import { useState } from "react"
import { saveGroup } from "../../store/board/board.action"

export function AddGroup() {
    const [isShown, setIsShown] = useState(false)
    const [title, setTilte] = useState('')

    function onAddList() {
        if (!title) return
        saveGroup(title)
        setIsShown(prevIsShown => !prevIsShown)
        setTilte('')
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