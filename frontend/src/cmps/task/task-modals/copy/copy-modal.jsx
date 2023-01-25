import { useEffect } from "react";
import { useState } from "react";
import { saveGroup } from "../../../../store/board/board.action";
import { saveTask } from "../../../../store/task/task.action";
import { showErrorMsg, showSuccessMsg } from "../../../../services/event-bus.service"
import { handleKeyPress } from "../../../../customHooks/enterOutFocues"
// import { handleKeyPress } from "../customHooks/enterOutFocues"



export function CopyModal({ board, currTask }) {
    const [currGroup, setCurrGroup] = useState({})
    const [currTaskIdx, setCurrTaskIdx] = useState('')
    const [task, setTask] = useState(currTask)

    useEffect(() => {
        loadCurrGroup()
    }, [])

    function loadCurrGroup() {
        const group = board.groups.find(group => group._id === currTask.groupId)
        const taskIdx = group.tasks.findIndex(task => task._id === currTask._id)
        setCurrTaskIdx(taskIdx)
        setCurrGroup(group)
    }

    function onSelectGroup({ target }) {
        const { value: groupId } = target
        const group = board.groups.find(group => group._id === groupId)
        setCurrGroup(group)
    }

    function onSelectIdx({ target }) {
        const { value } = target
        setCurrTaskIdx(value)
    }

    function ChackCurrGroup(group) {
        if (group._id === currTask.groupId) return `${group.title}(current)`
        else return group.title
    }
    function ChackCurrIdx(idx) {
        if (currTaskIdx === idx) return `${idx + 1}(current)`
        else return idx + 1
    }
    function handleChange({ target }) {
        const { value, name: filed } = target
        setTask((prevTask) => ({ ...prevTask, [filed]: value }))

    }

    async function onCopyCard() {
        const taskToCopy = { ...task }
        delete taskToCopy._id
        taskToCopy.groupId = currGroup._id
        try {
            await saveTask(taskToCopy)
            showSuccessMsg('Task copied')

        } catch (err) {
            showErrorMsg('cannot copy task')
            console.log(err)
        }



    }


    return (
        <section className='copy-modal'>
            <p>Title</p>
            <textarea autoFocus type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                onKeyDown={(ev) => handleKeyPress(ev)}
            />

            <p>Copy to..</p>
            <div className="selects-container">

                <select className="copy-card-select" defaultValue={currTask.groupId}
                    onChange={onSelectGroup} name="test" >
                    {board.groups?.map(group =>
                        <option key={group._id} value={group._id}>{ChackCurrGroup(group)}</option>
                    )}
                </select>
                <select onChange={onSelectIdx} className="copy-card-select" name="" id="">
                    {currGroup?.tasks?.map((task, idx) =>
                        <option key={task._id} value={idx}>{ChackCurrIdx(idx)}</option>

                    )}
                    {currGroup?.tasks && <option value={currGroup?.tasks?.length}>{currGroup?.tasks?.length + 1}</option>}
                </select>
            </div>
            <button onClick={onCopyCard} onChange={onCopyCard} className="btn-add">Create card</button>
        </section >
    )
}