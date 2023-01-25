import { useEffect } from "react";
import { useState } from "react";
import { taskReducer } from "../../../../store/task/task.reducer";

export function CopyModal({ board, currTask }) {
    const [currGroup, setCurrGroup] = useState({})
    const [currTaskIdx, setCurrTaskIdx] = useState('')

    useEffect(() => {
        loadCurrGroup()
    }, [])

    function loadCurrGroup() {
        const group = board.groups.find(group => group._id === currTask.groupId)
        const taskIdx = group.tasks.findIndex(task => task._id === currTask._id)
        console.log('taskIdx: ', taskIdx);
        setCurrTaskIdx(taskIdx)
        setCurrGroup(group)
    }

    function onSelectOption({ target }) {
        const { value: groupId } = target
        const group = board.groups.find(group => group._id === groupId)
        setCurrGroup(group)
    }

    function ChackCurrGroup(group) {
        if (group._id === currTask.groupId) return `${group.title}(current)`
        else return group.title
    }

    function onCopyCard() {

    }


    return (
        <section className='copy-modal'>
            <p>Title</p>
            <textarea autoFocus type="text"
                name="title"
                defaultValue={currTask.title}
            // placeholder={description || 'add a more detailed description…'}
            // onChange={handleChange}
            // onKeyDown={(ev) => handleKeyPress(ev)}
            // onBlur={() => setIsShown((prev) => !prev)}
            />

            <p>Copy to..</p>
            <select defaultValue={currTask.groupId} onChange={onSelectOption} name="test" >
                {board.groups?.map(group =>
                    <option key={group._id} value={group._id}>{ChackCurrGroup(group)}</option>
                )}
            </select>
            <select name="" id="">
                {currGroup?.tasks?.map((task, idx) =>
                    <option selected={currTaskIdx} key={task._id} value="">{idx + 1}</option>
                )}
            </select>
            <button onClick={onCopyCard} className="btn-add">Create card</button>
        </section >
    )
}