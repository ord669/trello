import { useState } from "react"
import { CloseIcon } from "../../assets/svg/icon-library"
import { boardService } from "../../services/board.service.local"
// import { boardService } from "../../services/board.service"
import { loadBoard } from "../../store/board/board.action"

export function TaskFilter({ setIsOpenFilter, boardId }) {
    const [filterBy, setFilterBy] = useState(boardService.getEmpteyFilter())

    function handleChange({ target }) {
        const { value, name: filed } = target
        const newFilter = { ...filterBy, [filed]: value }
        setFilterBy(newFilter)
        loadBoard(boardId, newFilter)
    }

    return (
        <section className='task-filter'>
            <button onClick={() => setIsOpenFilter(prev => !prev)} className="btn-close-modal"><CloseIcon /></button>
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
        </section>
    )
}