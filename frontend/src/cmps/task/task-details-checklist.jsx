import { ChecklistIcon } from "../../assets/svg/icon-library";


export function TaskDetailsChecklist({ checklists }) {
    console.log('checklists: ', checklists);

    if (!checklists) return
    return (
        <section className='task-details-checklist'>
            <div className="task-checklists">
                {checklists.map(checklist =>
                    <div key={checklist._id}>
                        <div className="flex align-center gap-10">
                            <div className=" icon-title">
                                <ChecklistIcon />
                            </div>
                            <h1>{checklist.title}</h1>
                        </div>
                        <div className="task-todos">
                            {checklist.todos.map(todo =>
                                <div key={todo._id}>
                                    <input className="icon-title"
                                        type="checkbox"
                                        defaultChecked={todo.isDone}
                                    />
                                    <div className={todo.isDone ? 'line-through ' : ''}>
                                        {todo.title}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
                }
            </div>
        </section >
    )
}