import { useState } from "react";
import { CloseIcon } from "../../assets/svg/icon-library";
import { boardService } from "../../services/board.service.local";
import { loadBoard } from "../../store/board/board.action";

export function TaskFilter({ setIsOpenFilter, board }) {
    const [filterBy, setFilterBy] = useState({ title: '' })
    console.log('filterBy from task filter: ', filterBy);


    function handleChange({ target }) {
        const { value, name: filed } = target
        setFilterBy((prevFilterBy) => {
            const filter = { ...prevFilterBy, [filed]: value }
            loadBoard(board._id, filter)
            return filter
        })
        // ({ ...prevFilterBy, [filed]: value }))

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