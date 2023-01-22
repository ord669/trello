import ProgressBar from "@ramonak/react-progress-bar"
import React, { useState } from "react"
import { useForm } from "../../../customHooks/useForm"

import { ChecklistIcon } from "../../../assets/svg/icon-library"
import { saveTask } from "../../../store/board/board.action"
import { taskService } from "../../../services/task.service.local"

export function TaskDetailsChecklist({ checklist, task }) {
    const [isShown, setIsShown] = useState(false)
    const [todo, setTodo, handleChange] = useForm(taskService.getEmptyTodo())

    function onShownAddTodo() {
        setIsShown(prevIsShown => !prevIsShown)
    }

    const doneTodos = checklist.todos.filter(todo => todo.isDone).length * 100

    const completed = Math.floor((doneTodos / checklist.todos.length)) || 0

    async function onClickTodo(todoToChange) {
        todoToChange.isDone = !todoToChange.isDone
        onSaveTodo(todoToChange)
    }

    async function onRemoveChecklist() {
        task.checklists = task.checklists.filter(currChecklist => currChecklist._id !== checklist._id)
        try {
            await saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.target.blur()
            onSaveTodo()
            //Write you validation logic here
        }
    }

    async function onSaveTodo(todoToUpdate) {
        if (todoToUpdate !== undefined) {
            // Put
            checklist.todos = checklist.todos.map(currTodo => currTodo._id !== todoToUpdate._id ? currTodo : todoToUpdate)
        } else {
            // Post
            checklist.todos.push(todo)
            setIsShown((prev) => !prev)
        }
        task.checklists.map(currChecklist => currChecklist._id !== checklist._id ? currChecklist : checklist)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    if (!checklist) return
    return (
        <section className='task-details-checklist-container'>
            <div className="task-details-checklist-header  ">
                <div className="checklist-header-title-container">
                    <ChecklistIcon className="icon-title" />
                    <h3>{checklist.title}</h3>
                </div>
                <div className="checklist-header-btns">
                    <button className="check-list-btn side-menu-item btn-link" onClick={() => { onRemoveChecklist() }}>Delete</button>
                </div>
            </div>
            <div className="progressBar-container ">
                <h3>{`${completed}%`}</h3>
                <div>
                    <ProgressBar
                        completed={completed}
                        bgColor="#5ba4cf"
                        height="8px"
                        labelColor="#5ba4cf"
                        transitionDuration="200ms"
                        completedClassName={completed === 100 ? "barCompleted" : ""}
                    />
                </div>
            </div>
            <div className="check-box-container" >
                {checklist.todos.map(todo =>
                    <div className="check-box" key={todo._id} onClick={(e) => {
                        e.stopPropagation()

                    }}>
                        <input checked={todo.isDone} type="checkbox" onClick={() => { onClickTodo(todo) }} />
                        <p className={`${todo.isDone ? "check-box-is-done" : ''}`} >{todo.title}</p>
                    </div>
                )}
                {!isShown ?
                    <p onClick={onShownAddTodo} className="description-fake-text-area"></p>
                    :
                    <div>
                        <textarea autoFocus type="text"
                            name="title"
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyPress(e)}
                        />
                        <div className="desc-btn flex align-cetner ">
                            <button onClick={() => { onSaveTodo() }} className="btn-add">Add</button>
                            <button onClick={() => setIsShown((prev) => !prev)}
                                className="btn-cancel">Cancel</button>
                        </div>
                    </div>
                }
                {!isShown && <button className="check-list-add-btn side-menu-item btn-link" onClick={() => { setIsShown(true) }}>Add an item</button>}
            </div>
        </section>
    )
}