import { CloseIcon, PlusIcon } from "../../assets/svg/icon-library"
import { useState } from "react"
import { saveActivity, saveGroup } from "../../store/board/board.action"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { boardService } from "../../services/board.service"
import { useSelector } from "react-redux"

export function AddGroup() {
    const [isShown, setIsShown] = useState(false)
    const [title, setTilte] = useState('')
    const { board } = useSelector(storeState => storeState.boardModule)

    async function onAddList(ev) {
        ev.preventDefault()
        if (!title) return
        const group = boardService.getEmptyGroup(title)
        try {
            await saveActivity({ board, type: 'group', txt: group.title, diff: 'added', })
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
                        <button className="btn-add" onClick={onAddList}>Add list</button>
                        <button className="btn-close" onClick={() => setIsShown(prevIsShown => !prevIsShown)}><CloseIcon /></button>
                    </section>
                </form>
                :
                <section className="open-form" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>
                    <PlusIcon />Add another list
                </section>}
        </section>
    )
}