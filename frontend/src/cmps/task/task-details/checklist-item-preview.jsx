import { useState } from "react"
import { CloseIcon, ThreeDotsIcon } from "../../../assets/svg/icon-library"
import { saveActivity } from "../../../store/board/board.action";
import { useSelector } from "react-redux"

export function ChecklistItemPreview({ currTodo, saveTodo, task }) {
    const [todo, setTodo] = useState(currTodo)
    const [isShown, setIsShown] = useState(false)
    const { board } = useSelector(storeState => storeState.boardModule)

    function onClickTodo(todoToChange) {
        todoToChange.isDone = !todoToChange.isDone
        saveTodo(todoToChange)
        saveActivity({ board, type: 'todo', diff: 'completed', task: { _id: task._id, groupId: task.groupId, title: task.title, todo: todo.title } })
    }

    async function onSaveTodo() {
        try {
            await saveTodo(todo)
            setIsShown(prevIsShown => !prevIsShown)
        } catch (err) {
            console.log('Cannot save todo:', err)
        }
    }

    function handleChange({ target }) {
        setTodo((prev) => ({ ...prev, title: target.value }))
    }

    const style = {
        backgroundColor: isShown ? '#091e420a' : '',
        padding: isShown ? '0 0 6px 4px' : '4px 0px 4px 4px',
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
                        <button className="btn-add" onClick={onSaveTodo}>Save</button>
                        <button className="btn-close" onClick={() => setIsShown(preIsShown => !preIsShown)}><CloseIcon /></button>
                    </section>
                </section>
                :
                <>
                    <span className={`${todo.isDone ? 'done' : ''}`} onClick={() => setIsShown(preIsShown => !preIsShown)}>{todo.title}</span>
                    <button className="options-btn"><ThreeDotsIcon /></button>
                </>
            }
        </section>
    )
}