import { useNavigate, useParams } from "react-router-dom"
import { MiniLabelList } from "./task-preview/task-preview-mini-labels-list";

export function QuickTaskEdit({ task, setIsQuickEdit, quickEditModalPos }) {
    console.log('quickEditModalPos: ', quickEditModalPos);
    const { boardId } = useParams()
    console.log('boardId: ', boardId);
    const navigate = useNavigate()

    let background

    if (!task?.style?.background?.includes('https')) {
        background = {
            backgroundColor: `${task.style.background}`,
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "32px",
        }

    } else {
        background = {
            backgroundImage: `url(${task.style.background})`,
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "125px",
            width: "100%",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }

    }

    function renderPos() {
        return {
            top: `${quickEditModalPos.y}px`,
            left: `${quickEditModalPos.x}px`,
            width: `${quickEditModalPos.width}px`,
        }
    }
    function checkPress(ev) {
        const pressedClickPos = ev.target.getBoundingClientRect()
        console.log('pressedClickPos: ', pressedClickPos);

        setIsQuickEdit(false)
    }

    return (
        <section onClick={(ev) => {
            ev.stopPropagation()
            checkPress(ev)
        }} className='quick-task-edit'>

            <div onClick={(ev) => {
                ev.preventDefault()
                ev.stopPropagation()
            }} style={renderPos()} className="quick-task-edit-container">
                {task.style && <div style={background} className="task-preview-comver-img">
                </div>}
                <div className="quick-task-edit-details">
                    {task.labelIds &&
                        <MiniLabelList task={task} />}

                    <textarea type="text" defaultValue={task.title} />
                    <div className="task-icons">
                    </div>
                </div>
                <div className="task-preview-edit-icon">

                </div>

            </div>
        </section>
    )
}