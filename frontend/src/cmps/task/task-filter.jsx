import { useState } from "react"
import { useSelector } from "react-redux"
import { ArrowDownIcon, CloseIcon } from "../../assets/svg/icon-library"
// import { boardService } from "../../services/board.service.local"
import { boardService } from "../../services/board.service"
import { loadBoard } from "../../store/board/board.action"
import { UserAvatarIcon } from "../user-avatar-icon"
// import { TaskFilterMember } from "./task-filter-member"

export function TaskFilter({ setIsOpenFilter, boardId }) {
    const [filterBy, setFilterBy] = useState(boardService.getEmpteyFilter())
    // const { board } = useSelector(storeState => storeState.boardModule)
    const [isOpenFilterMember, setIsOpenFilterMember] = useState(false)

    function handleChange({ target }) {
        const { value, name: filed } = target
        const newFilter = { ...filterBy, [filed]: value }
        setFilterBy(newFilter)
        // loadBoard(boardId, newFilter)
    }

    return (
        <section className='task-filter'>
            {/* <button onClick={() => setIsOpenFilter(prev => !prev)} className="btn-close-modal"><CloseIcon /></button> */}
            <p className="task-filter-title">Filter</p>
            <div className="task-filter-layout">
                <p className="filter-keyword">Keyword</p>
                <input
                    type="text"
                    name="title"
                    value={filterBy.title}
                    onChange={handleChange}
                    placeholder="Enter a keyword..."
                />
            </div>
            <div onClick={() => setIsOpenFilterMember(prev => !prev)} className="filter-members flex align-center space-between" >
                <p>Selecet members</p>
                <span><ArrowDownIcon /></span>
            </div>
            {/* {isOpenFilterMember && <TaskFilterMember />} */}

        </section>
    )
}