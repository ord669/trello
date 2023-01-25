import ProgressBar from "@ramonak/react-progress-bar"
import React, { useState } from "react"
import { useForm } from "../../../customHooks/useForm"

import { ChecklistIcon, CloseIcon } from "../../../assets/svg/icon-library"
import { saveTask } from "../../../store/task/task.action"
import { taskService } from "../../../services/task.service.local"
import { ChecklistItemPreview } from "./checklist-item-preview"

export function TaskDetailsChecklist({ checklist, task }) {
    // const [checklist, setChecklist] = useState(currChecklist)
    const [title, setTitle] = useState(checklist.title)
    const [isShown, setIsShown] = useState(!checklist.todos.length)
    const [isTitleEdit, setIsTitleEdit] = useState(false)
    const [todo, setTodo, handleChange] = useForm(taskService.getEmptyTodo())

    function handleChecklistChange({ target }) {
        setTitle(target.value)
    }

    function saveChecklist() {
        console.log('title:', title)
        if (title === checklist.title) return
        console.log('title:', title)
        const checklistToSave = { ...checklist, title }
        task.checklists.map(currChecklist => currChecklist._id === checklistToSave._id ? checklistToSave : currChecklist)
        setIsTitleEdit(prev => !prev)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    function onRemoveChecklist() {
        task.checklists = task.checklists.filter(currChecklist => currChecklist._id !== checklist._id)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    function handleKeyPress(ev) {
        if (ev.keyCode === 13) {
            ev.target.blur()
            saveTodo()
            //Write you validation logic here
        }
    }

    async function saveTodo(todoToUpdate) {
        if (todoToUpdate !== undefined) {
            // Put
            checklist.todos = checklist.todos.map(currTodo => currTodo._id !== todoToUpdate._id ? currTodo : todoToUpdate)
        } else {
            // Post
            checklist.todos.push(todo)
            setIsShown(prev => !prev)
        }
        task.checklists.map(currChecklist => currChecklist._id !== checklist._id ? currChecklist : checklist)
        try {
            saveTask(task)
        } catch (err) {
            console.log('err', err)
        }
    }

    const doneTodos = checklist.todos.filter(todo => todo.isDone).length * 100
    const completed = Math.floor((doneTodos / checklist.todos.length)) || 0

    if (!checklist) return
    return (
        <section className='task-details-checklist-container'>
            <div className="task-details-checklist-header">
                <div className="checklist-header-title-container">
                    <ChecklistIcon className="icon-title" />
                    {isTitleEdit ?
                        <section className="edit-title">
                            {/* onBlur={() => setIsTitleEdit(prev => !prev)} */}
                            <textarea
                                name="title"
                                autoFocus
                                onFocus={(ev) => ev.target.select()}
                                onChange={handleChecklistChange}
                                value={title}
                            />
                            <section className="edit-btns">
                                <button className="btn-add" onClick={saveChecklist}>Save</button>
                                <button className="close-btn" onClick={() => setIsTitleEdit(prev => !prev)}><CloseIcon /></button>
                            </section>
                        </section>
                        :
                        <>
                            <h3 onClick={() => setIsTitleEdit(prev => !prev)}>{title}</h3>
                            <div className="checklist-header-btns">
                                <button className="check-list-btn side-menu-item btn-link" onClick={() => { onRemoveChecklist() }}>Delete</button>
                            </div>
                        </>
                    }
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
                    <ChecklistItemPreview key={todo._id} currTodo={todo} saveTodo={saveTodo} />
                )}
                <section className="add-new-item">
                    {!isShown ?
                        <button className="check-list-add-btn side-menu-item btn-link" onClick={() => { setIsShown(true) }}>Add an item</button>
                        :
                        <section className="add-item">
                            {/* onBlur={() => setIsShown(prev => !prev)} */}
                            <textarea autoFocus type="text"
                                name="title"
                                placeholder="Add an item"
                                onChange={handleChange}
                                onKeyDown={(ev) => handleKeyPress(ev)}
                            />
                            <div className="desc-btn flex align-cetner ">
                                <button onClick={() => saveTodo()} className="btn-add">Add</button>
                                <button onClick={() => setIsShown(prev => !prev)}
                                    className="btn-cancel">Cancel</button>
                            </div>
                        </section>
                    }
                </section>
            </div>
        </section>
    )
}