import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useRef } from "react";

import { ChecklistIcon } from "../../../assets/svg/icon-library";
import { saveTask } from "../../../store/board/board.action";

export function TaskDetailsChecklist({ checklist, task }) {
    let elInput = useRef()

    useEffect(() => {

    }, [])

    // console.log('checklist: ', checklist.todo);
    const todosIsDont = checklist.todos.filter(todo => todo.isDone).length * 100
    const completed = Math.floor((todosIsDont / checklist.todos.length))

    function onClickLine(todo) {
        todo.isDone = !todo.isDone
        task.checklists.find(currChecklist => currChecklist._id === checklist._id)
            .todos.map(currTodo => currTodo._id !== todo._id ? currTodo : todo)

        saveTask(task)
    }

    if (!checklist) return
    return (

        <section className='task-details-checklist-container'>
            <div className="task-details-checklist-header flex">
                <ChecklistIcon className="icon-title" />

                <h3>{checklist.title}</h3>
                <button className="side-menu-item btn-link"></button>
            </div>

            <div className="progressBar-container ">
                <h3>{`${completed}%`}</h3>
                <div>
                    <ProgressBar
                        completed={completed}
                        bgColor="#5ba4cf"
                        height="8px"
                        labelColor="#5ba4cf"
                    />
                </div>
            </div>
            <div className="check-box-container" >
                {checklist.todos.map(todo =>
                    <div className="check-box" key={todo._id} onClick={() => { onClickLine(todo) }}>
                        <input type="checkbox" ref={elInput} />
                        <p className={`${todo.isDone ? "check-box-is-done" : ''}`} >{todo.title}</p>
                    </div>
                )}
            </div>
        </section >
    )
}