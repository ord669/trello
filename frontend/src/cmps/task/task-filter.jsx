import { useState } from "react"
import { CloseIcon } from "../../assets/svg/icon-library"
import { boardService } from "../../services/board.service.local"
import { loadBoard } from "../../store/board/board.action"

export function TaskFilter({ setIsOpenFilter, boardId }) {
    const [filterBy, setFilterBy] = useState({ title: '' })
    console.log('filterBy from task filter: ', filterBy)


    function handleChange({ target }) {
        const { value, name: filed } = target
        setFilterBy(prevFilter => ({ ...prevFilter, [filed]: value }))
        loadBoard(boardId, filterBy)
    }

    console.log('filterBy.title:', filterBy.title)
    return (
        <section className='task-filter'>
            <button onClick={() => setIsOpenFilter(prev => !prev)} className="btn-close-filter"><CloseIcon /></button>
            <h1 className="task-filter-title">Filter</h1>
            <div className="task-filter-layout">
                <h1 className="filter-keyword">Keyword</h1>
                {console.log('filterBy.title:', filterBy.title)}
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