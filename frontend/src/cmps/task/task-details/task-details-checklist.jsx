import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

import { ChecklistIcon } from "../../../assets/svg/icon-library";

export function TaskDetailsChecklist({ checklist }) {
    console.log('checklist: ', checklist.todos);
    const todosIsDont = checklist.todos.filter(todo => todo.isDone).length * 100
    const completed = Math.floor((todosIsDont / checklist.todos.length))

    if (!checklist) return
    return (

        <section className='task-details-checklist-container'>
            <h3>{checklist.title}</h3>
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
                    <div className="check-box" key={todo._id}>
                        <input type="checkbox" />
                        <p >{todo.title}</p>
                    </div>
                )}
            </div>
        </section >
    )
}