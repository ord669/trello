import { useState } from "react"
import { CloseIcon } from "../../../assets/svg/icon-library"

export function ChecklistItemPreview({ currTodo, onSaveTodo }) {
    const [todo, setTodo] = useState(currTodo)
    const [isShown, setIsShown] = useState(false)

    function onClickTodo(todoToChange) {
        todoToChange.isDone = !todoToChange.isDone
        onSaveTodo(todoToChange)
    }

    function handleChange({ target }) {
        setTodo((prev) => ({ ...prev, title: target.value }))
    }

    const style = {
        backgroundColor: isShown ? '#091e420a' : '',
        padding: isShown ? '0 0 6px 4px' : '6px 4px',
        alignItems: isShown ? '' : 'center'
    }

    const checkedStyle = {
        margin: isShown ? '8px 18px 0 4px' : '0 18px 0 4px'
    }

    return (
        <section className='checklist-item-preview' style={style}>
            <input checked={todo.isDone} type="checkbox" onChange={() => onClickTodo(todo)} style={checkedStyle} />
            {isShown ?
                <section className="edit-checklist">
                    <textarea
                        name="title"
                        onFocus={(ev) => ev.target.select()}
                        value={todo.title}
                        onChange={handleChange} />
                    <section className="form-btns">
                        <button className="btn-add">Save</button>
                        <button className="btn-close" onClick={() => setIsShown(preIsShown => !preIsShown)}><CloseIcon /></button>
                    </section>
                </section>
                :
                <span className={`${todo.isDone ? 'done' : ''}`} onClick={() => setIsShown(preIsShown => !preIsShown)}>{todo.title}</span>
            }
        </section>
    )
}