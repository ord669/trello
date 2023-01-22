import { useState } from "react"

export function ChecklistItemPreview({ todo, onSaveTodo }) {
    const [isshown, setIsShown] = useState(false)

    function onClickTodo(todoToChange) {
        todoToChange.isDone = !todoToChange.isDone
        onSaveTodo(todoToChange)
    }

    return (
        <section className='checklist-item-preview'>
            <input checked={todo.isDone} type="checkbox" onChange={() => onClickTodo(todo)} />
            {isshown ?
                <section className="edit-checkilst">

                </section>
                :
                <p className={`${todo.isDone ? 'check-box-is-done' : ''}`} >{todo.title}</p>
            }
        </section>
    )
}