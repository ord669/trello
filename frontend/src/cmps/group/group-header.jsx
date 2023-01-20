import { useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { saveGroup } from "../../store/board/board.action"

export function GroupHeader({ onRemoveGroup, group }) {
    const [title, setTitle] = useState(group.title)

    function handleChange({ target }) {
        setTitle(target.value)
    }

    async function onSaveTitle() {
        const newTitle = title.trimEnd()
        if (newTitle === group.title) return
        try {
            const groupToSave = { ...group, title: newTitle }
            await saveGroup(groupToSave)
            showSuccessMsg('Changes saved')
        } catch (err) {
            showErrorMsg('Cannot update title, try later')
        }
    }

    return (
        <section className='group-header'>
            <textarea
                className="group-title edit-title-input"
                onFocus={(ev) => ev.target.select()}
                onBlur={onSaveTitle}
                onChange={handleChange}
                value={title} />
            <button className="btn-remove-group" onClick={onRemoveGroup}>X</button>
        </section>
    )
}