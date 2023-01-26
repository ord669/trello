import { useRef, useState } from "react"
import { handleKeyPress } from "../../customHooks/enterOutFocues"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { saveGroup } from "../../store/board/board.action"
import { ThreeDotsIcon } from "../../assets/svg/icon-library"
import { openDynamicModal } from "../../store/modal/modal.action"

export function GroupHeader({ onRemoveGroup, group }) {
    const [title, setTitle] = useState(group.title)
    const [inputIn, setInputIn] = useState(false)
    const elInput = useRef()

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
            {!inputIn ? <div onMouseUp={() => {
                setInputIn(true)
                setTimeout(() => {
                    elInput.current.focus()
                }, 50)
            }} className="group-title edit-title-input">
                {title}
            </div>
                :
                <textarea
                    ref={elInput}
                    className="group-title edit-title-input"
                    onFocus={(ev) => ev.target.select()}
                    onBlur={() => {
                        onSaveTitle()
                        setInputIn(false)
                    }}
                    onChange={handleChange}
                    onKeyDown={(ev) => handleKeyPress(ev)}
                    value={title} />
            }
            <button onClick={(ev) => openDynamicModal({ ev, name: 'List actions', func: { onRemoveGroup } })} className="options-btn"><ThreeDotsIcon /></button>
        </section>
    )
}